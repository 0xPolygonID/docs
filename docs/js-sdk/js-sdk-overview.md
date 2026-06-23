---
id: js-sdk-overview
title: JS SDK Overview
sidebar_label: Overview
description: An overview of the JS SDK components and capabilities.
keywords:
  - docs
  - privado id
  - holder
  - issuer
  - verifier
  - wallet
  - js sdk
---

## Overview
The PrivadoID JS SDK is built upon the foundational Iden3 core protocol libraries, providing developers with comprehensive tools for creating browser-based applications and interacting with REST APIs in the decentralized identity ecosystem.


## Introducation
The Privado ID JS SDK allows developers to create applications like mobile or web wallets, browser extensions, and issuer nodes. Using this SDK, developers can start creating and issuing verifiable credentials, and generating zero knowledge proofs based on our [Iden3 protocol](https://docs.iden3.io/). Individuals and organizations can use this SDK for their existing applications.

:::note **Extensibility and Customization**

With JS SDK, you can build custom applications/modules by providing your own implementation of our core interfaces. The functionalities that we provide in these tutorials can be extended as per your requirements. For example, JS SDK does not provide a codebase for database storage but you can implement that by extending the SDK's functionalities.

:::

## Why JS SDK?

The Privado ID JS SDK has been developed to provide the following functionalities for a user's browser-based wallet:

### Core Capabilities
- **Identity Management**: Create and manage decentralized identity wallets
- **Credential Operations**: Issue, store, and manage verifiable credentials
- **Zero-Knowledge Proofs**: Generate privacy-preserving proofs following credential issuance
- **State Management**: Publish updated issuer states when credentials are added to claims Merkle trees
- **Protocol Communication**: Handle authorization requests and protocol messages

## Components of JS SDK

The following components form the inherent part of the JS SDK. In the upcoming tutorials, we shall read more about the implementation of these components in JS SDK. To know what each of these components stands for, please visit:

- **[Identity Wallet](/docs/js-sdk/js-sdk-components/identity-wallet.md)**: Manages decentralized identities and cryptographic key operations
- **[Credential Wallet](/docs/js-sdk/js-sdk-components/credential-wallet.md)**: Handles verifiable credential storage, management, and operations
- **[Iden3comm](/docs/js-sdk/js-sdk-components/iden3comm.md)**: Implements protocol message handling and communication
- **[Proof](/docs/js-sdk/js-sdk-components/proof.md)**: Manages zero-knowledge proof generation and verification

Each component is designed with specific responsibilities while maintaining seamless integration with other SDK components.

## System Requirements

### Prerequisites

- Node.js must be installed on your system. Version 16.14 or above is required for Privado ID JS SDK.

:::note

While installing Node.js, make sure that you select all the checkboxes related to the dependencies.

:::

- A browser where you can install and manage your browser wallet.

### Dependencies

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
    CredentialStatusType,
  } = PolygonIdSdk;
</script>
```

## Core Libraries

JS SDK is a fully-functional wrapper on top of our Iden3 core libraries. The following set of core Iden3 libraries has been used to implement Privado ID JS SDK:

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

On the Privado ID JS SDK, you can build the following functionalities:

- An Issuer on a Merkle Tree
- A Verifier that can verify zero-knowledge proofs generated by a user's identity wallet
- An Identity Wallet based on the Iden3 core protocol
- The JS SDK also provides a revocation feature for credentials and proof generation

### Use Cases
- Digital identity wallets for individuals
- Enterprise credential management systems
- Educational credential verification platforms
- Healthcare record management applications
- Supply chain verification systems

The SDK's modular architecture and extensive API surface enable developers to create both simple proof-of-concept applications and production-ready identity management systems.