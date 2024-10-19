---
id: universal-links
title: Universal Links
sidebar_label: Universal Links
description: Tutorial on how to configure universal links.
keywords:
  - docs
  - polygon id
  - ID holder
  - issuer
  - verifier
  - auth
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

[Universal Links](https://developer.apple.com/ios/universal-links/) are a convenient way to create a single URL that works across all platforms. This URL can open content within an app on a mobile device or within a web browser, ensuring a seamless user experience. 

In context with our protocol, a single URL can be configured to work with Web Wallet in case of a browser and Privado ID mobile app in case of a mobile phone.

## Advantages 
- **Supports Any Protocol Message**: Enables communication between the web wallet or mobile app, regardless of the type of protocol message being sent. The protocol message for instance can be a [Verification Request](https://iden3-communication.io/authorization/1.0/request/) or a [Credential Offer](https://iden3-communication.io/credentials/1.0/offer/)
- **More Flexible than Deep Links**: Universal Links offer greater flexibility in their usage and compatibility across platforms.
- **Single Format for Multiple Platforms**: Provides a single URL format that works both on mobile apps and web wallets.

<Tabs>
<TabItem value="Universal Link Domain">

```bash
https://wallet.privado.id/
```

</TabItem>
</Tabs>

## Configuration

The fragment of the URL (specs after `#`) should consist of a protocol message (i_m or request_uri) and in case of Web Wallet some optional parameters like back_url and finish_url.

:::note
The `i_m` request must be Base64 encoded while `request_uri`, `back_url` and `finish_url` must be URI encoded before adding them to the fragment of the URL. 
URI encoding the params will translate characters like ?, =, /, and & into their encoded equivalents so that they don’t interfere with the outer URL's query parameters.
:::

Standard query string delimiters (=, &, )should be used for the params.

`i_m`: Base64-encoded protocol message (used for **short messages**)

`request_uri`: A URI-encoded shortened URL to the message. (used for **long messages**)

:::note
If both params are present `i_m` is prioritized and `request_uri` is ignored.
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
https://wallet.privado.id#i_m={base64 encoded message}=&back_url={url}&finish_url={url}` // mobile and web wallet friendly for short messages 
```
```
https://wallet.privado.id#request_uri={shortenedUrl to message}=&back_url={url}&finish_url={url}` //  mobile and web wallet friendly for big messages
```

:::caution

For privacy reasons, all the parameters must be placed in the fragment part of the URL, i.e after the initial #. This ensures that all parameters stay on the client and are not sent to the server.

For security reasons, integration of this tool via IFrame is not supported. Redirecting users is the recommended method for accessing our Web Wallet to ensure secure interaction.

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

// URL encode the verification request with the parameters
const encodedRequestWithParams =(`i_m=${base64EncodedRequest}&back_url=${backUrl}&finish_url=${finishUrl}`);

// Open the Web Wallet URL with the encoded request
window.open(`https://wallet-dev.privado.id/#${encodedRequestWithParams}`);

//Note:

// You can also use the `request_uri` param instead of `i_m`, For that first define the Url containing the request.
const requestUrl = encodeURIComponent("https://raw.githubusercontent.com/0xpulkit/Examples_Privado-ID/main/KYCV3.json");

// Configure the Web Wallet URL
walletUrlWithRequestUri = `https://wallet-dev.privado.id/#request_uri=${requestUrl}&back_url=${backUrl}&finish_url=${finishUrl}`);
```


The Verifier can present this Universal Link as a button within the application, allowing the user to open the Web Wallet in a browser or the Privado ID App on a mobile device, where the wallet will retrieve the verification request and user can take further action.

