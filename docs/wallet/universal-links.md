---
id: universal-links
title: Universal Links
sidebar_label: Universal Links
description: Comprehensive guide for implementing universal links with Privado ID wallets across web and mobile platforms.
keywords:
  - docs
  - privado id
  - ID holder
  - issuer
  - verifier
  - auth
  - verification
  - credentials
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Universal Links Implementation Guide

[Universal Links](https://developer.apple.com/ios/universal-links/) provide a seamless way to create cross-platform URLs that intelligently route users to the appropriate application or web interface. In the Privado ID ecosystem, universal links enable a single URL to open the Web Wallet in browsers and the Privado ID mobile app on mobile devices, ensuring optimal user experience across all platforms.

## Overview

Universal links in Privado ID create a unified entry point for credential and verification operations. When a user clicks a universal link:

- **On Desktop/Web**: Opens the Privado ID Web Wallet in the browser
- **On Mobile**: Opens the Privado ID mobile app (if installed) or falls back to the web wallet
- **Cross-Platform**: Maintains consistent functionality regardless of the platform

<Tabs>
<TabItem value="Universal Link Domain">

```bash
https://wallet.privado.id/
```

</TabItem>
</Tabs>

## Advantages 

- **Supports Any Protocol Message**: Enables communication between the web wallet or mobile app, regardless of the type of protocol message being sent. The protocol message for instance can be a [Verification Request](https://iden3-communication.io/authorization/1.0/request/) or a [Credential Offer](https://iden3-communication.io/credentials/1.0/offer/)
- **More Flexible than Deep Links**: Universal Links offer greater flexibility in their usage and compatibility across platforms.
- **Single Format for Multiple Platforms**: Provides a single URL format that works both on mobile apps and web wallets.

## URL Structure and Configuration

### Basic URL Format

The fragment of the URL (specs after `#`) should consist of a protocol message (i_m or request_uri) and in case of Web Wallet some optional parameters like back_url and finish_url.

### Core Parameters

#### Protocol Message Parameters

<Tabs>
<TabItem value="Short Messages (i_m)">

**Parameter**: `i_m`
**Format**: Base64-encoded protocol message
**Use Case**: Direct message embedding for smaller payloads

```
i_m={base64_encoded_message}
```

</TabItem>
<TabItem value="Long Messages (request_uri)">

**Parameter**: `request_uri`
**Format**: URI-encoded URL pointing to the message
**Use Case**: Reference to externally hosted messages for larger payloads

```
request_uri={uri_encoded_url}
```

</TabItem>
</Tabs>

#### Web Wallet Navigation Parameters

<Tabs>
<TabItem value="Back URL">

**Parameter**: `back_url`
**Format**: URI-encoded URL
**Purpose**: Defines where users are redirected when clicking the 'Back' button

```
back_url={uri_encoded_return_url}
```

</TabItem>
<TabItem value="Finish URL">

**Parameter**: `finish_url`
**Format**: URI-encoded URL
**Purpose**: Defines where users are redirected after successful completion

```
finish_url={uri_encoded_completion_url}
```

</TabItem>
</Tabs>

### Parameter Priority and Validation

:::note Message Parameter Priority
When both `i_m` and `request_uri` are present, `i_m` takes priority and `request_uri` is ignored. This ensures predictable behavior and prevents conflicts.
:::

:::caution Encoding Requirements
- **`i_m`**: Must be Base64 encoded to handle binary data and special characters
- **`request_uri`**, **`back_url`**, **`finish_url`**: Must be URI encoded to prevent URL parsing conflicts
- **Query String Format**: Use standard delimiters (`=`, `&`) for parameter separation
:::

:::note
URI encoding ensures that special characters such as ?, =, /, and & are converted to their percent-encoded equivalents, preventing conflicts with the URL's query parameters. URLs should always use percent-encoded rather than unicode escape sequences for special characters.
:::

**Shortened URL algorithm:**

While it's not strictly restricted how you can perform URL shortage algorithm, it is recommended to follow these instructions:

1. Generate a UUID for a particular request (or use ID of the message itself)
2. Implement an endpoint to fetch messages by UUID.
3. Encode URL to fetch messages to `the request_uri`.

Example of URL shortage logic:

<Tabs>
<TabItem value= "Golang">

```go
package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
	"github.com/gofrs/uuid"
	"github.com/patrickmn/go-cache"
)

var cacheStorage = cache.New(60*time.Minute, 60*time.Minute)

func HandleData(w http.ResponseWriter, r *http.Request) {
	switch r.Method {

	// create url for the message
	case http.MethodPost:

		// get json data from request body
		var data interface{}
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Failed to read request body", http.StatusInternalServerError)
			return
		}
		defer r.Body.Close()

		err = json.Unmarshal(body, &data)
		if err != nil {
			http.Error(w, "Failed to unmarshal body data", http.StatusInternalServerError)
			return
		}

		// generate random key
		uv, err := uuid.NewV4()

		if err != nil {
			http.Error(w, "Failed to generate uuid", http.StatusInternalServerError)
			return
		}

		// store data in map
		cacheStorage.Set(uv.String(), data, 1*time.Hour)

		hostURL := os.Getenv("HOST_URL") // e.g. https://verifier.com
		// write key to response
		fmt.Fprintf(w, "%s%s?id=%s", hostURL, "api/link-store", uv.String())
		return

	// get message by identifier
	case http.MethodGet:

		// get path param
		id := r.URL.Query().Get("id")
		if id == "" {
			http.Error(w, "Failed to get id", http.StatusNotFound)
			return
		}
		// get data from map
		data, ok := cacheStorage.Get(id)

		if !ok {
			http.Error(w, fmt.Sprintf("Failed to retrieve link data by %s", id), http.StatusNotFound)
			return
		}

		jsonData, err := json.Marshal(data)
		if err != nil {
			http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
			return
		}

		// write data to response
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonData)
		return
	}
}

```

</TabItem>
<TabItem value= "Javascript">

```js
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Cache = require("cache-manager");
const HttpStatus = require("http-status-codes");

const app = express();
app.use(express.json());

const cPromise = Cache.caching("memory", {
  max: 100,
  ttl: 10 * 1000 /*milliseconds*/,
});
app.get("/api/link-store", async (req, res) => {
  const id = req.query.id;
  const cacheManager = await cPromise;
  const data = await cacheManager.get(id);

  if (!data) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: `item not found ${id}` });
  }

  return res.status(HttpStatus.OK).json(data);
});

app.post("/api/link-store", async (req, res) => {
  const body = req.body;
  const uuid = uuidv4();
  const cacheManager = await cPromise;

  console.log(cacheManager);

  await cacheManager.set(uuid, body, { ttl: 3600 });

  const hostUrl = process.env.HOST_URL;
  const url = `${hostUrl}/api/link-store?id=${uuid}`;

  return res.status(HttpStatus.OK).json({ url });
});

app.listen(3000, () => {
  console.log("Express server is running on port 3000");
});
```

</TabItem>
</Tabs>


#### Optional  parameters for Web Wallet:

`back_url` represents the URL of your application where the user will be redirected when they click the ‘Back’ button

`finish_url` represents the URL of your application where the user will be redirected once the proof has been successfully generated and, they click the ‘Continue’ button

#### Valid Links Formats:
```
https://wallet.privado.id#i_m={base64_encoded_message}=&back_url={url}&finish_url={url}` // mobile and web wallet friendly for short messages 
```
```
https://wallet.privado.id#request_uri={shortenedUrl_to_message}=&back_url={url}&finish_url={url}` //  mobile and web wallet friendly for big messages
```

:::caution Privacy Protection
All parameters must be placed in the URL fragment (after `#`) to ensure they remain client-side and are not transmitted to servers during navigation. This prevents sensitive protocol data from being logged or intercepted by intermediate services.
:::

:::caution IFrame Restrictions
For security reasons, integration via IFrame is not supported. Direct navigation or new window opening is the recommended method for accessing the Web Wallet to ensure secure interaction and prevent clickjacking attacks.
:::

## Example
Let's consider an example where a verifier needs to verify the humanity of its users. To achieve this, the verifier must share the verification request with the user's wallet. The protocol message in this case is a [Request](https://docs.privado.id/docs/verifier/verification-library/request-api).

Below is a JavaScript code example to configure the Universal Link for this scenario:

```js
 // Define the request
const request = {
    "from": "did:iden3:privado:main:2SdUfDwHK3koyaH5WzhvPhpcjFfdem2xD625aymTNh",
    "id": "0d02b9e1-0113-422f-b91b-02618a178bfc",
    "thid": "0d02b9e1-0113-422f-b91b-02618a178bfc",
    "typ": "application/iden3comm-plain-json",
    "type": "https://iden3-communication.io/authorization/1.0/request",
    "body": {
        "callbackUrl": "https://my-app.org/api/callback",
        "reason": "demo flow",
        "scope": [
            {
                "circuitId": "credentialAtomicQuerySigV2",
                "id": 1,
                "query": {
                    "allowedIssuers": ["did:iden3:privado:main:2SdUfDwHK3koyaH5WzhvPhpcjFfdem2xD625aymTNc"],
                    "context": "https://raw.githubusercontent.com/anima-protocol/claims-polygonid/main/schemas/json-ld/pol-v1.json-ld",
                    "type": "AnimaProofOfLife",
                    "credentialSubject": {
                        "human": {
                            "$eq": true
                        }
                    }
                }
            }
        ]
    }
};

// Define the URLs for redirection
const backUrl = encodeURIComponent("https://my-app.org/back");
const finishUrl = encodeURIComponent("https://my-app.org/finish");

// Base64 encode the verification request
const base64EncodedRequest = btoa(JSON.stringify(request));


// Configure the Wallet URL (universal link)
const walletUrlWithMessage = `https://wallet.privado.id/#i_m=${base64EncodedRequest}&back_url=${backUrl}&finish_url=${finishUrl}`;

// Open the Wallet URL to start the verification process
window.open(walletUrlWithMessage);


/*
Note
=================================================

// You can also use the `request_uri` parameter instead of `i_m`. 
// For that, first define the URL containing the request, and URI encode it.

const requestUrl = encodeURIComponent("https://raw.githubusercontent.com/0xpulkit/Examples_Privado-ID/main/KYCV3.json");

// Configure the Wallet URL (universal link) using `request_uri` instead of `i_m`
const walletUrlWithRequestUri = `https://wallet.privado.id/#request_uri=${requestUrl}&back_url=${backUrl}&finish_url=${finishUrl}`);

// Open the Wallet URL with the `request_uri`
window.open(walletUrlWithRequestUri);

==================================================
*/

```

The Verifier can present this Universal Link as a button within the application, allowing the user to open the Web Wallet in a browser or the Privado ID App on a mobile device, where the wallet will retrieve the verification request and user can take further action.

## Conclusion

Universal links provide a powerful and flexible way to integrate Privado ID wallet functionality across platforms. By following the patterns outlined in this guide, you can create seamless user experiences that work reliably across web and mobile environments while maintaining the highest standards of security and privacy.