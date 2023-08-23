---
id: js-sdk-overview
title: JS SDK Overview
sidebar_label: Overview
description: An overview of the JS SDK components and capabilities.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet
  - js sdk
---

Based on the Iden3 core protocol libraries, the Polygon ID JS SDK is used for interacting with REST APIs and developing browser-based applications.

The Polygon ID JS SDK allows developers to create applications like mobile or web wallets, browser extensions, and issuer nodes. Using this SDK, developers can start creating and issuing verifiable credentials, and generating zero knowledge proofs based on our [Iden3 protocol](https://docs.iden3.io/). Individuals and organizations can use this SDK for their existing applications.

:::note

With JS SDK, you can build custom applications/modules by providing your own implementation of our core interfaces. The functionalities that we provide in these tutorials can be extended as per your requirements. For example, JS SDK does not provide a codebase for database storage but you can implement that by extending the SDK's functionalities.

:::
## Why JS SDK?

The Polygon ID JS SDK has been developed to provide the following functionalities for a user's browser-based wallet:

- Create and manage Identity wallet
- Issue and manage credentials
- Generate zero-knowledge proofs after credential issuance
- Publish the updated state of the Issuer once a credential is added to the claims Merkle tree
- Handle authorization requests

## Components of JS SDK

The following components form the inherent part of the JS SDK:

- Identity Wallet
- Credential Wallet
- Iden3comm (Authentication Handler/Fetch Handler)
- Proof Generation

In the upcoming tutorials, we shall read more about the implementation of these components in JS SDK. To know what each of these components stands for, go through the following links:

- [Identity Wallet](http://localhost:3000/docs/category/identity)

- [Credential Wallet](/docs/category/credential)

- [Iden3comm](/docs/wallet/wallet-sdk/polygonid-sdk/iden3comm/overview.md)

- [Proof](/docs/wallet/wallet-sdk/polygonid-sdk/proof/overview.md)

## Prerequisites

- Node.js must be installed on your system. Version 16.14 or above is required for Polygon ID JS SDK.

:::note

While installing Node.js, make sure that you select all the checkboxes related to the dependencies.

:::

- A browser where you can install and manage your browser wallet.

## Dependencies

You can install project dependencies using either one of the following ways:

- Using **npm**:

```bash
npm install @0xpolygonid/js-sdk
```

- For browser-based applications, you can use the following script tag, adding import to your **index.html** file after `npm run build`:

```html
<script src="./dist/umd/index.js"></script>
<script>
    const {
    LocalStoragePrivateKeyStore,
    IdentityStorage,
    MerkleTreeLocalStorage,
    CredentialStorage,
    W3CCredential,
    BrowserDataSource,
    BjjProvider,
    KmsKeyType,
    IdentityWallet,
    CredentialWallet,
    KMS,
    core,
    CredentialStatusType
} = PolygonIdSdk;
</script>
```

## Core Libraries

JS SDK is a fully-functional wrapper on top of our Iden3 core libraries. The following set of core Iden3 libraries has been used to implement Polygon ID JS SDK:

- <a href="https://github.com/iden3/js-crypto" target="_blank">Iden3 JS Crypto</a>: Implementation of the Elliptic Curve for Baby Jubjub Key, Poseidon hash and other cryptographic elements.

- <a href="https://github.com/iden3/js-iden3-core" target="_blank">JS Iden3 Core</a>: JavaScript implementation of the Iden3 core functionalities including Identity creation.

- <a href="https://github.com/iden3/js-jsonld-merklization" target="_blank">JS JSON-LD Merklization</a>: A library that merkelizes JSON-LD documents in JavaScript. Merklization is a process that creates a Merkle tree of a JSON-LD document so that it can be verified for its data integrity and authenticity. It is a library that lets you work with Verifiable Credentials. A JSON-LD is a schema document that represents data fields related to a Verifiable Credential in a pre-determined format.

- <a href="https://github.com/iden3/js-jwz" target="_blank">JS JWZ</a>: JavaScript implementation of JSON Web Zero Knowledge and lets you create JWZ tokens.

- <a href="https://github.com/iden3/js-merkletree" target="_blank">JS Merkle Tree</a> JavaScript implementation for creating a Sparse Merkle Tree (SMT). It carries code implementation for the browser, local storage, and memory.

:::info

Follow the links below to learn more about W3C standards for DID (Decentralised Identifier) and Verifiable Credentials:

- <ins><a href="https://www.w3.org/TR/did-core/" target="_blank">DID</a></ins>
- <ins><a href="https://www.w3.org/TR/vc-data-model/" target="_blank">Verifiable Credentials</a></ins>

:::
## What Can Be Built Upon JS SDK?

On the Polygon ID JS SDK, you can build the following functionalities:

- An Issuer on a Merkle Tree
- A Verifier that can verify zero-knowledge proofs generated by a user's identity wallet
- An Identity Wallet based on the Iden3 core protocol
- The JS SDK also provides a revocation feature for credentials and proof generation

<br/>

:::note

As our JS SDK is still in the public beta stage, you might find a few functionalities missing or not fully updated.

:::