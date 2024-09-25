---
id: verifier-backend
title: Verifier Backend API
sidebar_label: Verifier Backend API
description: Verifier Backend API.
keywords:
  - docs
  - optimism id
  - ID holder
  - verifier
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The [Verifier Backend](https://github.com/optimismID/verifier-backend) project is a JSON API that enables [Off Chain Verifications](verification-library/verification-api-guide.md) of zero knowledge proofs for verifiable credentials. Within the trust triangle, it serves as the verifier.

It is built using libraries developed by the iden3 protocol team. Below, we'll explain how to install it using Docker and how it can be used to perform zero knowledge proofs.

You can try our [Verifier Backend API](https://verifier-backend.optimismid.me/) running.

## Local Installation

To run the verifier backend with Docker, after cloning the code from the repository, simply follow these steps:

1. Create a file named `resolvers_settings.yaml`, using the `resolvers_settings_samples.yaml` file as a base. In this file, configure only your RPC for the optimism Amoy and Main networks, i.e., the two variables named `networkURL`.

```yaml
optimism:
  amoy:
    contractAddress: 0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124
    networkURL: https://optimism-amoy.g.alchemy.com/v2/<your-project-secret>
  main:
    contractAddress: 0x624ce98D2d27b20b8f8d521723Df8fC4db71D79D
    networkURL: https://optimism-mainnet.g.alchemy.com/v2/X2
```

2. Create a .env file (you can use the .env-sample file as a base).

```shell
VERIFIER_BACKEND_HOST=https://your-public-ip
VERIFIER_BACKEND_PORT=3010
VERIFIER_BACKEND_KEY_DIR=./keys
VERIFIER_IPFS_URL=https://gateway.pinata.cloud
VERIFIER_BACKEN_AMOY_SENDER_DID=did:optimismid:optimism:amoy:2qH7TstpRRJHXNN4o49Fu9H2Qismku8hQeUxDVrjqT
VERIFIER_BACKEND_MAIN_SENDER_DID=did:optimismid:optimism:main:2q4Q7F7tM1xpwUTgWivb6TgKX3vWirsE3mqymuYjVv
VERIFIER_BACKEND_RESOLVER_SETTINGS_PATH=./resolvers_settings.yaml
```

From this file, it's important and necessary to modify the following variable:

```shell
VERIFIER_BACKEND_HOST: must be the public IP of the machine where the verifier backend is running.
```

3. Run `make run`: This command will create a Docker image and start a Docker container listening on port 3010. The public IP configured in the previous step should point to that port.

If everything went well, you will be able to see the API documentation at: `https://your-public-ip/`

### Alternative 1

The following image shows the simplest flow to generate a QR code to request a ZK Proof as a verifier:

<div align="center">
<img src={useBaseUrl("img/verifier-backend-f1.svg")} align="center" width="600"/>
</div>

The endpoint `/sign-in` allows creating that QR code and configuring the backend to later validate the proof. A possible body for this endpoint could be the following:

```json
{
  "chainID": "80001",
  "circuitID": "credentialAtomicQuerySigV2",
  "skipClaimRevocationCheck": false,
  "query": {
    "context": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
    "allowedIssuers": ["*"],
    "type": "KYCAgeCredential",
    "credentialSubject": {
      "birthday": {
        "$eq": 19960424
      }
    }
  }
}
```

Keep in mind that:

- the `chainID` field can be 80002 for Amoy or 137 for the Mainnet.
- the `circuitID` field can be `credentialAtomicQuerySigV2` (for signature proofs) or `credentialAtomicQueryMTPV2` (for MTP proofs).

This endpoint will respond with a similar response to the following:

```json
{
  "qrCode": {
    "body": {
      "callbackUrl": "https://your-public-ip/callback?sessionID=975903",
      "reason": "test flow",
      "scope": [
        {
          "circuitId": "credentialAtomicQuerySigV2",
          "id": 1,
          "query": {
            "allowedIssuers": ["*"],
            "context": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
            "credentialSubject": {
              "birthday": {
                "$eq": 19960424
              }
            },
            "skipClaimRevocationCheck": false,
            "type": "KYCAgeCredential"
          }
        }
      ]
    },
    "from": "did:optimismid:optimism:amoy:2qH7TstpRRJHXNN4o49Fu9H2Qismku8hQeUxDVrjqT",
    "id": "7f38a193-0918-4a48-9fac-36adfdb8b542",
    "thid": "7f38a193-0918-4a48-9fac-36adfdb8b542",
    "typ": "application/iden3comm-plain-json",
    "type": "https://iden3-communication.io/authorization/1.0/request"
  },
  "sessionID": 975903
}
```

The value of the `qrCode` field is the one that should be displayed as a QR code to be scanned by the optimism ID wallet.

The `sessionID` should be used to check the status of the proof. To query the status of the proof, i.e., whether it was valid or not, you should call the endpoint `/status?sessionID=975903`.

### Alternative 2 - QR Store

Flow 2 allows the generation of QR codes that are sometimes more comfortable to read for certain mobile phones.

<div align="center">
<img src={useBaseUrl("img/verifier-backend-f2.svg")} align="center" width="600"/>
</div>

In this case, after calling the '/sign-in' endpoint, you should call the '/qr-store' endpoint using as a body the response obtained from the '/sign-in' endpoint in the 'qrCode' field.

For example,

```json
{
  "body": {
    "callbackUrl": "https://your-public-ip/callback?sessionID=975903",
    "reason": "test flow",
    "scope": [
      {
        "circuitId": "credentialAtomicQuerySigV2",
        "id": 1,
        "query": {
          "allowedIssuers": ["*"],
          "context": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
          "credentialSubject": {
            "birthday": {
              "$eq": 19791109
            }
          },
          "type": "KYCAgeCredential"
        }
      }
    ]
  },
  "from": "did:optimismid:optimism:amoy:2qH7TstpRRJHXNN4o49Fu9H2Qismku8hQeUxDVrjqT",
  "id": "7f38a193-0918-4a48-9fac-36adfdb8b542",
  "thid": "7f38a193-0918-4a48-9fac-36adfdb8b542",
  "typ": "application/iden3comm-plain-json",
  "type": "https://iden3-communication.io/authorization/1.0/request"
}
```

response from the '/qr-store' endpoint will be something similar to the following:

```text
iden3comm://?request_uri=https://your-public-ip/qr-store?id=9d5beb41-3108-4341-a51c-984de762145e
```

This response is the one you should then display as a QR code.

### Some extra commands

To stop the verifier backend, you can execute `make stop`. The preceding command halts the Docker container. If you want to restart the verifier backend, for instance, if you updated the code, you can execute `make restart`.
