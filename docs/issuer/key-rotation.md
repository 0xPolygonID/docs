---
id: key-rotation
title: Key Rotation
sidebar_label: Key Rotation
description: Learn how you can rotate keys in the issuer node
keywords:
  - docs
  - privado id
  - issuer node
  - key rotation
  - key
  - auth core claim

---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When an identity is created on the issuer node, a credential (also referred to as [authCoreClaim](https://docs.iden3.io/getting-started/claim/auth-claim/)) is generated to sign issued credentials. This authCoreClaim is tied to a babyjubjub-type private key, which is securely stored based on the issuer node's configuration. Supported storage options include local storage, vault, or AWS Secret Manager – [see Key Management Configuration](./issuer-configuration.md/#kms-configuration).

## Features

### Security
- The issuer node supports key rotation, allowing you to replace an old key (authCoreClaim) with a new one without disrupting operations.
- Key rotation minimizes the risk of compromised keys being misused, ensuring that the system remains secure over time.

### Credential Invalidation
- Revoking an authCoreClaim (via its revocation nonce) automatically invalidates all credentials associated with it
- This eliminates the need to revoke each credential individually, saving time and effort while ensuring quick and effective security enforcement.

:::note
The first `authCoreClaim` assosiated with an identity has a revocation nonce set to `0`. If this nonce is revoked, all previously issued credentials will become invalid for verification through ZKProofs. Additionally, new credentials cannot be issued with the identity linked to the revoked authCoreClaim. 
:::

In the sections below, we’ll walk through the process of creating new credentials (authCoreClaims) for an identity on the issuer node.

## Creating a New Key

The first step in creating a new authCoreClaim is to generate a babyjubjub-type private key. The issuer node provides an endpoint for this purpose:

`/v2/identities/{identifier}/keys` [API Reference](https://issuer-node-core-api-demo.privado.id/#post-/v2/identities/-identifier-/keys)

In the request body, specify that you want to create a babyjubjub-type key and provide a unique name for the key:

```json
{
  "keyType": "babyjubJub",
  "name": "my-new-key"
}
```
The response will include a JSON payload similar to this:

```json
{
    "id": "ZGlkOmlkZW4zOnBv..."
}
```
The returned `id` represents the newly created babyjubjub key, which you’ll need to reference when creating the new `authCoreClaim`.

## Creating the Auth Core Claim

To create a new authCoreClaim, call the following endpoint:

`/v2/identities/-identifier-/create-auth-credential` [API Reference](https://issuer-node-core-api-demo.privado.id/#post-/v2/identities/-identifier-/create-auth-credential)

Include a request body like the example below:

```json
{
    "KeyID" : "{{id of the previously generated key}}",
    "expiration": 1829174400, 							// Expiration date (optional)
    "version": 1, 										// Version (optional)
    "revNonce": 100, 									// Revocation nonce (optional)
    "credentialStatusType": "Iden3commRevocationStatusV1.0" // Must be supported by the issuer node (optional, default: Iden3commRevocationStatusV1.0)
}
```
The response will return the ID of the newly created credential. This `id` can be used to retrieve and inspect the credential using the endpoint:

`/v2/identities/-identifier-/credentials/-id-` [API Reference](https://issuer-node-core-api-demo.privado.id/#post-/v2/identities/-identifier-/credentials/-id-)

The returned credential JSON will include a `vc` field containing a `credentialStatus` object as shown below:

```json
[...]
"credentialStatus": {
    "id": "<https://issuer-node/v2/agent>",
    "revocationNonce": 100,
    "type": "Iden3commRevocationStatusV1.0"
},
[...]
```
:::note
The revocation nonce must be a unique value (not 0 or any value already assigned to other authCoreClaims). Revoking a nonce will invalidate all credentials associated with it. If no revocation nonce is provided, the issuer node will automatically assign one for you.
:::

## Activating the New Auth Core Claim

Once the new babyjubjub key and authCoreClaim are created, the issuer node’s state must be published on-chain for the authCoreClaim to become active. Use the following endpoint to publish the state:

`/v2/identities/-identifier-/state/publish` [API Reference](https://issuer-node-core-api-demo.privado.id/#post-/v2/identities/-identifier-/state/publish)

After the transaction is confirmed, the new authCoreClaim will be ready for use in issuing credentials.

## How Does the Issuer Node Choose Which Auth Core Claim to Use?

When issuing a new credential, the issuer node sequentially selects an `authCoreClaim` based on the order in which they were created. A claim is considered valid if it has been published on-chain and is not revoked.

If you want to prevent the issuer node from using a specific authCoreClaim:

1. Revoke the nonce associated with that authCoreClaim.
2. Publish the updated state on-chain to ensure the changes take effect.

This process ensures that only the desired authCoreClaims are available for signing new credentials while maintaining security and flexibility in credential issuance.