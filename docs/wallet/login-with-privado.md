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

A comprehensive developer guide for implementing basic authentication using Privado ID without zero-knowledge proof requirements.


## Overview

This implementation demonstrates **basic authentication** with Privado ID - verifying user identity through DID (Decentralized Identifier) ownership without requiring additional proofs or credentials. Think of it as "Login with DID" similar to "Login with Google" but decentralized.

### What This Does ✅
- Verifies user ownership over a DID
- Provides cryptographic authentication
- Enables web2-like login experience

### What This Doesn't Do ❌
- a hassle of collecting your personal data ;)

## How Basic Authentication Works

When a user wants to authenticate with Privado ID, here's the complete flow:

### **1. User Clicks Login**
- User clicks "Login" button
- This triggers a request to your server's `/api/sign-in` endpoint

### **2. User Forwarded to PrivadoID Wallet**
- User is redirected to their Privado ID web wallet
- Privado ID web wallet prompts to sign in using your crypto wallet

### **3. Signature Request in Wallet**
- Crypto wallet prompts user to perform a signature request
- User approves the authentication 
- Wallet generates a signed JWZ (JSON Web Zero-knowledge) token

### **4. Callback URL Response**
- After successful signature, the wallet automatically sends a POST request to your callback URL
- Request includes the sessionId and the signed JWZ token in the body

### **5. Verifier Validation & Successful Login**
- Your server receives the JWZ token in the callback
- Verifier takes the token and validates it against the original auth request:
  - Checks JWZ signature matches the user's DID
- Thus, proving his ownership on the DID.


## Prerequisites

### Dependencies

```bash
npm install @iden3/js-iden3-auth express cors raw-body
```

### Required Setup

1. **Verifier DID**: Your application's decentralized identifier
2. **Keys Directory**: Circuit files for cryptographic verification
3. **Public URL**: For receiving authentication callbacks (use ngrok for development)
4. **State Resolvers**: Blockchain connection for DID validation


### 🔑 Keys Directory Setup

You can find the complete key directory setup [here](https://github.com/0xPolygonID/tutorial-examples/tree/main/verifier-integration) in `keys` folder.


## Step-by-Step Implementation

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

// Middleware
app.use(express.static("../static"));
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

💡 **Testing Frontend**: The `../static` directory contains a lightweight frontend for testing the authentication flow. This minimal implementation demonstrates QR code generation, universal link handling, and callback processing - perfect for understanding the complete user journey before building your production frontend.

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

    // KEY: Remove scope to disable proof requirements
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

💡 **Getting Your Verifier DID**: Sign in to your [Privado ID Wallet](https://wallet.privado.id/) and use the DID displayed there as your verifier DID for simplicity during development.

## How Does `getAuthRequest` Connect to My Wallet?

This is where [**Universal Links**](./universal-links.md) come into play! Your frontend takes the auth request returned by `getAuthRequest()` and converts it into a Universal Link that directly opens the user's Privado ID wallet. The wallet automatically processes this request, prompts the user for signature approval, and sends the signed response back to your callback endpoint - creating a seamless authentication experience across mobile and web platforms.

### Universal Link Structure

```
https://wallet.privado.id/#i_m=<base64_encoded_auth_request>
```

**Components:**
- **Base URL**: `https://wallet.privado.id/` - Privado ID wallet endpoint
- **Fragment**: `#i_m=` - Parameter for auth request
- **Payload**: Base64 encoded JSON auth request

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
    const keyDIR = "../keys";
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

    return res.status(200).json({
      success: true,
      message: "Basic authentication successful",
      userDID: authResponse.from,
      timestamp: new Date().toISOString(),
      sessionId: sessionId
    });

  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      error: "Authentication failed",
      details: error.message
    });
  }
}
```

Congrats!!! You already verify DID ownership. Now to turn this into a full login, on successful callback save a sessionId ↔ DID record in your database, create a session for the browser, and use it to identify the user on later requests!!

### Testing Steps

1. **Visit your app:** `http://localhost:8080`
2. **Test universal link:** Click "Login" button
3. **Check console logs:** Monitor authentication flow
4. **Verify response:** Should receive success JSON with userDID


### Common Issues

1. **Invalid DID Format**: Ensure your verifier DID follows the correct format
2. **Network Configuration**: Verify RPC URLs and contract addresses
3. **Circuit Files**: Ensure all required circuit files are present in the circuits directory
4. **CORS Issues**: Configure CORS properly for cross-origin requests

---

## Going Further: 2FA via Google Sign‑In

With basic DID login in place, you can add two-factor authentication with Google Sign-In without changing the core flow: after verifying the DID, prompt a Google Sign-In and bind the user’s Gmail to their DID (store did ↔ gmail); on future logins, require both the DID check and a fresh Google assertion for that Gmail. This keeps DID as the primary identity, uses Google as the second factor, and lets you leverage Google’s recovery and device safeguards while staying decentralized.


## Resources

### Documentation
- [Privado ID Documentation](https://docs.privado.id/)
- [Verification Library API](https://docs.privado.id/docs/verifier/verification-library/verification-api/)
- [Verifier Integration Examples](https://github.com/0xPolygonID/tutorial-examples)

---

This implementation provides a solid foundation for Privado ID basic authentication. For advanced use cases involving credential verification and zero-knowledge proofs, refer to the official Privado ID documentation and explore the query-based authentication examples.