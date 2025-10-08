---
id: login-with-privado
title: Login Using Privado ID Guide
sidebar_label: Login Using Privado ID
description: Tutorial on how to use Privado ID for login.
keywords:
  - docs
  - privado id
  - login
  - issuer
  - verifier
  - authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

A hands-on developer guide to integrate Login with Privado ID — a simple, decentralized authentication method using Decentralised Identifiers (DIDs), without any zero-knowledge proofs required.

## Overview

Implement **Login with Privado ID** to add a secure, decentralized authentication experience to your application — similar to “Login with Google,” but powered by Decentralized Identifiers (DIDs).

This guide walks you through setting up **basic authentication** using Privado ID. It verifies user identity through DID ownership

### Key Capabilities
- **Authenticates DID Ownership**: Authenticates users by cryptographically proving ownership of their DID

- **Enables Trustless Authentication**: Removes reliance on centralized identity providers.

- **Delivers a Familiar Web2 Experience**

## How Basic Authentication Works

The Login with Privado ID flow authenticates users by verifying control over their DID.
Below is a high-level breakdown of how the flow works end-to-end:

1. The user clicks “Login with Privado ID” on the app, which triggers a request to the backend(`/api/sign-in` endpoint) to generate a new authentication request for the user

:::info

You may also display a QR code that users can scan with the Privado ID Wallet app to start the same flow

:::

2. The frontend takes the authentication request from the backend, encodes it in Base64, and configures it into a [Universal Link](./universal-links.md). This link opens the Privado ID Web Wallet, prompting the user to sign-in with their crypto wallet

3. Once sign-in with crypto wallet is approved by user, the Privado wallet generates a `signed JWZ` (JSON Web Zero-knowledge) token — a verifiable proof of DID ownership.

4. The wallet then automatically sends a POST request to the backend’s `/api/callback` endpoint containing the `sessionId` and the `signed JWZ` token for verification

5. The backend verifies the signed JWZ token against the stored authentication request using the Privado Verifier

6. Once the JWZ is validated, you can consider the user’s DID as verified and proceed to create or update their record in your database.

7. From here, your application can decide what to do with this verified DID — such as enabling login, granting access, or allowing participation in specific flows like airdrops or allowlists

## Setup

```bash 
npm install @iden3/js-iden3-auth express cors raw-body
```

To get started with Login with Privado ID, ensure the following environment requirements are met:

-  **Keys Directory**: Contains circuit and verification key files for validation. A sample structure is available in the [verifier-integration](https://github.com/0xPolygonID/tutorial-examples/tree/main/verifier-integration) repository under the `keys/` folder
-  **Public URL**: For receiving authentication callbacks (use ngrok for development)

### 1. Server Configuration
Sets up Express server with required middleware and routes for handling authentication requests and callbacks.

```javascript
// index.js
const path = require("path");
const express = require("express");
const { auth, resolver } = require("@iden3/js-iden3-auth");
const getRawBody = require("raw-body");
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.static("./static"));
app.use(cors());

// Session storage for auth requests
const requestMap = new Map();

// Routes
app.get("/api/sign-in", getAuthRequest);
app.post("/api/callback", callback);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

:::info

**Testing Frontend**: The `./static` directory includes a simple frontend to test the full authentication flow — QR code generation, Universal Link handling, and callback processing.
Once the flow works locally, integrate the same endpoints into your production frontend, update the callback to your live URL, and secure configurations with environment variables and HTTPS.

:::

### 2. Authentication Request Handler
Generates basic authentication requests with empty scope and stores them with unique session IDs for later verification.

```javascript
async function getAuthRequest(req, res) {
  try {
    // Configuration - Update these for your setup
    const hostUrl = " Your public URL";
    const callbackURL = "/api/callback";
    const audience = "did:polygonid:polygon:amoy:2qQ68JkRcf3xrHPQPWZei3YeVzHPP58wYNxx2mEouR"; // Your verifier DID

    // Generate unique session
    const sessionId = Date.now();
    const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

    // Create basic auth request (no proofs required)
    const request = auth.createAuthorizationRequest(
      "Basic Sign In", // Reason for authentication
      audience,        // Your verifier DID
      uri             // Callback URL
    );

    request.body.scope = [];

    // Store for later verification
    requestMap.set(`${sessionId}`, request);

    console.log(`Created basic auth request for session: ${sessionId}`);
    return res.status(200).json(request);

  } catch (error) {
    console.error("Error creating auth request:", error);
    return res.status(500).json({ error: "Failed to create auth request" });
  }
}
```

:::info

**Getting Your Verifier DID**: Sign in to your [Privado ID Wallet](https://wallet.privado.id/) and use the DID displayed there as your verifier DID for simplicity during development.

:::

## How Does `getAuthRequest` Connect to Privado ID Wallet?

This is where [**Universal Links**](./universal-links.md) come into play! Your frontend takes the auth request returned by `getAuthRequest()`, encodes it in Base64, and embeds it into a Universal Link which in turn redirects the user to  Privado ID wallet. The wallet processes the request, prompts the user to sign, and then posts a signed JWZ (JSON Web Zero-knowledge) token to your callback endpoint. That JWZ is what your backend verifies to confirm DID ownership, and thus delivers a seamless login flow across web and mobile.

### Universal Link Structure

```javascript
https://wallet.privado.id/#i_m=<base64_encoded_auth_request>
```

**Components:**
- **Base URL**: `https://wallet.privado.id/` - Privado ID wallet endpoint
- **Fragment**: `#i_m=` - Parameter for auth request

### 3. Verification Callback Handler
Receives JWZ token as a callback, validates them against stored authentication requests, and confirms user DID ownership.

```javascript
async function callback(req, res) {
  try {
    // 1. Extract session and token
    const sessionId = req.query.sessionId;
    if (!sessionId) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    const raw = await getRawBody(req);
    const tokenStr = raw.toString().trim();
    if (!tokenStr) {
      return res.status(400).json({ error: "Token is required" });
    }

    // 2. Setup blockchain resolvers
    const resolvers = {
      ["polygon:amoy"]: new resolver.EthStateResolver(
        "<POLYGON_AMOY_RPC_URL>",
        "0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124"
      ),
      ["privado:main"]: new resolver.EthStateResolver(
        "https://rpc-mainnet.privado.id",
        "0x3C9acB2205Aa72A05F6D77d708b5Cf85FCa3a896"
      )
    };

    // 3. Retrieve stored auth request
    const authRequest = requestMap.get(`${sessionId}`);
    if (!authRequest) {
      return res.status(400).json({
        error: "Invalid session ID or session expired"
      });
    }

    // 4. Initialize verifier
    const keyDIR = "./keys";
    const verifier = await auth.Verifier.newVerifier({
      stateResolver: resolvers,
      circuitsDir: path.join(__dirname, keyDIR),
      ipfsGatewayURL: "https://ipfs.io",
    });

    // 5. Verify authentication
    const opts = {
      AcceptedStateTransitionDelay: 5 * 60 * 1000, // 5 minutes
    };

    const authResponse = await verifier.fullVerify(tokenStr, authRequest, opts);

    // 6. Clean up and respond
    requestMap.delete(`${sessionId}`);

    console.log(`Authentication successful for session: ${sessionId}`);
    console.log("User DID:", authResponse.from);

    return res.status(200).set("Content-Type", "application/json").send(authResponse);

  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      error: "Authentication failed",
      details: error.message
    });
  }
}
```

You’ve successfully verified DID ownership.

To turn this into a complete login, store user session details by their DID in your database. The DID acts as a persistent identity, allowing your app to recognize returning users.

When a user logs in again with the same Privado ID Wallet, they’ll present the same DID, letting your application instantly identify them and deliver the right personalized experience — decentralized, secure, and private.

### Testing Steps

1. **Visit your app:** `http://localhost:8080`
2. **Test universal link:** Click "Login" button

You can test the full authentication loop — from generating the auth request to verifying the DID — ensuring your app correctly recognizes verified users

---

## Going Further: Beyond Basic Login

With **Login with Privado ID**, you’re not just authenticating users — you’re building the foundation for a unified Web3 identity layer.
Once DID-based login is in place, it can power any authentication experience — from crypto wallet sign-ins to Privado credentials, or even Google 2FA — all anchored to a single decentralized identity.

## Resources

### Example Repository
- [Repo](https://github.com/0xPolygonID/tutorial-examples/tree/main/verifier-integration/login-privado)

---

This implementation provides a solid foundation for Privado ID basic authentication. For advanced use cases involving credential verification and zero-knowledge proofs, refer to the [query-based authentication](../verifier/verification-library/verifier-set-up.md) example.