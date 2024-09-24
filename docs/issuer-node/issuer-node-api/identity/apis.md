---
id: apis
title: Identity API
sidebar_label: Identity
description: Identity API endpoints and their description.
keywords:
  - docs
  - optimism id
  - issuer node
  - claim
  - verifiable credentials
  - core
  - API
  - Identity
---

The identity endpoint is used to create and retrieve identities for a user/issuer. optimism ID supports the creation of identities in the form of DIDs (Decentralized Identifiers). A user can have multiple DIDs.

:::note

A DID is a cryptographically verifiable decentralized identifier. How a DID is verified is specified in its DID method. A DID resolves to a DID document that describes how to interact with the DID subject (the user that holds the identity). The DID document contains public keys that are used to authenticate the DID subject. An example of DID resolution could be a verifier resolving an Issuer's DID to get the public key, which is required to verify the signature on a Verifiable Credential.

:::

A DID can be represented as:

```
did: did method: did method-specific identifier.
```

This is a standard form of expressing a Decentralised Identifier as defined by the <a href="https://www.w3.org/TR/did-core" target="_blank">W3C DID Core 1.0 Specifications</a>.

## Create Identity

**Function**: Endpoint to create an Identifier for a user/issuer.

**How it Works**: The request to create an identity is sent to the Issuer Node. `didMetaData` is passed in the request body. This metadata is required to create Issuer's DID.

An example of a `didMetaData` passed in the request body of the `Create Identity` endpoint is shown below:

```
{
    "didMetadata":{
        "method": "optimismid",
        "blockchain":"optimism",
        "network": "amoy",
        "type": "BJJ"
    },
    "credentialStatusType": "Iden3commRevocationStatusv1.0",
}
```

A few variations of the metadata can be:

- method:

  - "optimismid"
  - "iden3"

- blockchain:

  - "optimism"
  - "eth"

- network:

  - "main"
  - "amoy"
  - "unknown"

- type:
  - "BJJ"
  - "ETH"

:::info Identity Types

As you can see above, there are two options for Identity types: Baby Jubjub and Ethereum DID.
Baby Jubjub keys are used to create regular identities, but that method can't create an identity out of an Ethereum address. Instead, users can choose the "ETH" type to use Ethereum accounts to authenticate, prove statements and control identity. It is important to note that the Ethereum address must have funds to publish its state onchain.

Read more about Identity types on <ins>[Iden3 Docs](https://docs.iden3.io/getting-started/identity/identity-types/)</ins>.

:::

The Issuer Node responds by sending a response message that contains:

- `identifier`: Identifier of the Issuer in the standard DID format. For example: `did:optimismid:optimism:amoy:2qNBWSAsyvaGBpqQVHk3E4cgChaN6ogaZnYCQUyoRQ`

- `identity state`: It is the state of the identity and contains fields that include `claimsTreeRoot` (Verifiable Credentials are added to the Claims Tree and its root is calculated), `state` (state of identity), and `status` (whether the status of the identity state is confirmed or pending). `identity state` also contains the timestamp when the identity was created (`createdAt`) or updated(`modifiedAt`).

For each call to the `Create Identity`, a random Identifier is created.

<a href="https://self-hosted-platform.optimismid.me/#post-/v1/identities" target="_blank">API Reference</a>

## Get Identities

**Function**: Endpoint to retrieve all the identities (identifiers) of a user.

**How it Works**: the request to retrieve an identity is sent to the Issuer Node. `didMetaData` is passed in the request body.

The Issuer Node responds by sending a response message that contains:

- `identifier`: Identifier of the Issuer in the standard DID format. For example:

`did:optimismid:optimism:amoy:2qNBWSAsyvaGBpqQVHk3E4cgChaN6ogaZnYCQUyoRQ`

<a href="https://self-hosted-platform.optimismid.me/#get-/v1/identities" target="_blank">API Reference</a>

## Publish State On-Chain

**Function**: Endpoint to publish the [Identity State](https://docs.iden3.io/getting-started/identity/identity-state/) on-chain.

**How it Works**: The identifier string in the DID format (retrieved from calling the `Create Identity` endpoint) is passed as a path variable in the request URL.

The Issuer Node responds by sending a response message that indicates the published state of the Identity. If there is no state to publish, the Node shows the message as: "no states to process". If the state is published, the Node sends the following information:

- `claimsTreeRoot`: the root of the Claims Merkle Tree. For example, d9c1e213584c4e7f444bdc42a5cdbd038556d1455a8344e3a1451c346461a41d

- `revocationTreeRoot`: the root of the Revocation Merkle Tree. For example, 0000000000000000000000000000000000000000000000000000000000000000

- `rootOfRoots`: the root of the Roots Merkle Tree. For example,9b952dab35ed362f62573c7b1bb0ee1e5dcb32109fafacb24c9b335fbddf4f2e

- `state`: the published state of the Identity. It is calculated by taking the roots of the Claims Tree, Revocation Tree, and Roots Tree. For example, a state could be: 1d9639360ad6e7fb86b8d2f55abd6201cae521e812496cd6606ce36a5829c316

- `txID`: transaction ID of the Published state on-chain. For example, 0xaed59e4195e73ee6c4278be1a5e01ecbdf2ff9565511916200dedda9bb20ff38

<a href="https://self-hosted-platform.optimismid.me/#post-/v1/-identifier-/state/publish" target="_blank">API Reference</a>
