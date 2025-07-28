---
id: features
title: Features
sidebar_label: Features
description: Privado ID Wallet app main features.
keywords:
  - docs
  - privado id
  - holder
  - issuer
  - verifier
  - wallet
  - features
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Privado ID Wallet Features

The Privado ID Wallet App provides comprehensive identity management capabilities with the following core features:

## Core Features

### Privacy-First Design and Self-Sovereignty
Users maintain complete control over their identity data and credential exchanges. The system operates without intermediaries or centralized authorities, ensuring true self-sovereign identity management.

### Seamless Authentication and Credential Management
The application offers two authentication methods: 

**Ethereum Wallet Integration**: This App enables users to authenticate via their Ethereum wallets, and automatically creates a derived identity wallet. Users can easily fetch, store, and manage their credentials. Credentials undergo encryption using keys and are securely stored in end-to-end encrypted cloud storage*, facilitating effortless access across multiple devices while streamlining processes.

**Local Account Creation**: Additionally, users can also create local accounts. In this case, the app generates an Ethereum wallet in the background and creates a derived identity wallet. This option is ideal for users who prefer to store credentials locally without using cloud storage or for those who do not have a wallets such as Metamask on their phone.


:::info Cloud Storage Security
The cloud storage system serves as a secure repository for encrypted credentials, providing multi-device access and reliable backup capabilities. When users sign messages using their Ethereum private key, the system derives an identity and generates storage keys using the ed25519 digital signature scheme. All the documents stored in the storage are end-to-end encrypted using AES256-GCM, guaranteeing that only the user with the storage keys can access his credentials, reinforcing the security of the stored information.
:::

<div align="center">
<img src={useBaseUrl("img/wallet-login.png")}  width="300" align="center" />
</div>
<br></br>

:::note Synchronization Requirements
To synchronize identity and associated credentials between the Privado ID Web Wallet and the Privado ID Wallet App, users must authenticate with the same crypto wallet account on both platforms.
:::

### Zero-Knowledge Proof Generation
The application enables users to generate cost-optimized zero-knowledge proofs (ZKPs) for credential verification, ensuring privacy-preserving authentication while maintaining cryptographic integrity.

### Multi-Party Communication
The app facilitates secure communication between three key parties:
- **Users**: Identity holders managing their credentials
- **Issuers**: Entities that create and distribute credentials
- **Verifiers**: Organizations that validate presented credentials

This tri-party communication ensures secure and efficient credential exchange workflows.

### Identity Recovery System
For local accounts, the application includes a robust identity recovery mechanism using private keys. Users can securely restore their identity and credentials even after losing access to their original device, ensuring continuity of their digital identity.

### Credential Marketplace
The integrated marketplace allows users to proactively claim credentials before verification requests occur. While users can still receive credential offers directly from issuers during standard workflows, the marketplace provides:
- Convenient advance credential acquisition
- Faster verification processes
- Reduced friction during authentication scenarios

<div align="center">
<img src={useBaseUrl("img/credential-marketplace.png")}  width="300" align="center" />
</div>

- Embedded Issuance: The App provides embedded issuance, allowing users to claim their credentials within the verification flow if they haven't done so before.

:::note Current Credential Limitations
Currently, the tool provides Credential Marketplace and Embedded Issuance with limited number of credentials only:

- Proof of Identity (refer to the schema <ins>[here](https://github.com/anima-protocol/claims-polygonid/blob/main/schemas/json-ld/poi-v1.json-ld)</ins>)
- Proof of Life (refer to the schema <ins>[here](https://github.com/anima-protocol/claims-polygonid/blob/main/schemas/json-ld/pol-v1.json-ld)</ins>)
- Proof of Uniqueness refer to the schema <ins>[here](https://github.com/anima-protocol/claims-polygonid/blob/main/schemas/json-ld/pou-v1.json-ld)</ins>)
:::



## How Privado ID Wallet Differs from Traditional Crypto Wallets

While you may be familiar with cryptocurrency wallets such as MetaMask, Trust Wallet, Coinbase Wallet, and Ledger, the Privado ID Wallet serves a fundamentally different purpose. How is Privado ID Wallet different from all these hot and cold storage wallets? Let us see:

### Functional Differences

**Traditional Crypto Wallets** (MetaMask, Trust Wallet):
- Primary function: Execute cryptocurrency transactions on-chain
- Interaction method: Communicate with blockchain networks via RPCs (Remote Procedure Calls)
- Storage focus: Cryptographic keys for asset management

**Privado ID Wallet**:
- Primary function: Create and manage unique digital identities
- Interaction method: Generate zero-knowledge proofs for credential verification
- Storage focus: Identity-linked credentials and verification capabilities

### Technical Architecture Differences

**Cryptographic Implementation**:
- **Traditional wallets**: Utilize the `secp256k1` elliptic curve to derive public keys from private keys, ultimately generating Ethereum addresses
- **Privado ID Wallet**: Employs the `Baby Jubjub Elliptic Curve` to generate Privado ID Identifiers, which serve as unique identity markers rather than transaction addresses

**Key Management**:
- **Traditional wallets**: Store cryptographic keys for asset control
- **Privado ID Wallet**: Manages identity-specific keys for credential encryption and zero-knowledge proof generation

### Use Case Distinctions

The Privado ID Wallet enables integrators to:
- Fetch and securely store credentials from authorized issuers
- Generate privacy-preserving proofs for credential verification
- Maintain sovereign control over identity data
- Facilitate trustless interactions between identity holders, issuers, and verifiers

This contrasts with traditional crypto wallets, which focus primarily on asset custody and blockchain transaction execution.

