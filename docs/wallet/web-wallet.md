---
id: web-wallet
title: Privado ID Web Wallet
sidebar_label: Privado ID Web Wallet
description: The Privado ID Web Wallet is a secure, web-based identity wallet designed for streamlined credential issuance and verification.
keywords:
  - privado id
  - web wallet
  - identity
  - embedded issuance
  - zero-knowledge proofs
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Privado ID Web Wallet is a secure, browser-based identity management solution designed to streamline credential issuance and verification processes. It empowers users to manage their digital identity credentials efficiently while providing seamless integration with Ethereum wallets for authentication and encryption. The wallet offers comprehensive features including multi-device synchronization, embedded credential issuance, and support for both on-chain and off-chain verification workflows, making it an essential tool for managing and verifying digital credentials across platforms.


## Quick Start

The Web Wallet is accessible through any modern browser at [https://wallet.privado.id](https://wallet.privado.id). To begin using the wallet:

1. Navigate to the Web Wallet URL
2. Connect your Ethereum-compatible crypto wallet
3. Create your derived identity wallet

**Try the Demo**: Experience the Web Wallet's capabilities using our interactive demo at [https://web-wallet-demo.privado.id](https://web-wallet-demo.privado.id). The demo allows you to:
- Receive Proof of Liveness and Proof of Uniqueness credentials
- Experience embedded issuance workflows
- Complete verification requests end-to-end

## Features

### Seamless Authentication and Credential Management

The Web Wallet leverages Ethereum wallet integration to provide secure authentication and automated identity wallet derivation. Key security features include:

- **Derived Identity Creation**: Automatically generates a derived identity wallet upon Ethereum wallet authentication
- **End-to-End Encryption**: Credentials are encrypted using AES256-GCM encryption with user-controlled storage keys
- **Secure Cloud Storage**: Encrypted credentials are stored in cloud infrastructure, enabling cross-device access and serving as a reliable backup solution
- **Ed25519 Digital Signatures**: Employs industry-standard ed25519 cryptographic signatures for enhanced security

:::info Security Architecture
The cloud storage infrastructure serves as a secure repository for encrypted credentials. When users sign a message using their Ethereum private key, the system derives an identity and generates storage keys. All stored documents undergo end-to-end encryption using AES256-GCM, ensuring that only users with valid storage keys can access their credentials.
:::

:::note Wallet Synchronization
To synchronize identity and credentials between the Privado ID Web Wallet and the Privado ID mobile application, users must authenticate using the same crypto wallet account on both platforms.
:::

### Enhanced User Experience

The Web Wallet prioritizes usability through:

- **Intuitive Interface**: Streamlined user interface that simplifies complex identity operations
- **Seamless Integration**: All processes—from identity creation to credential verification—are integrated into unified workflows
- **Minimal Complexity**: Reduces technical barriers for end users while maintaining security standards

### Comprehensive Dashboard

The dashboard provides centralized credential management capabilities:

- **Credential Overview**: View all stored credentials in a unified interface
- **Credential Status**: Monitor the validity and expiration of stored credentials
- **Access Control**: Manage credential sharing permissions and access controls

<div align="center">
    <img src={useBaseUrl("../img/web-wallet-1.png")} alt="Web Wallet Dashboard Interface"></img>
</div>

### Query Verification System

The verification system enables rapid credential validation:

- **Real-time Verification**: Instantly validate verification requests against stored credentials
- **Zero-Knowledge Proofs**: Generate privacy-preserving proofs without revealing underlying credential data

### Credential Issuance

Streamlined credential acquisition process:

- **Direct Issuance**: Claim credentials directly from authorized issuers
- **Secure Storage**: Automatically store issued credentials in encrypted wallet storage
- **Batch Processing**: Support for multiple credential issuance in single transactions

### Embedded Issuance

The Web Wallet's embedded issuance feature enables in-flow credential acquisition:

- **Contextual Issuance**: Claim required credentials within verification workflows
- **Seamless Experience**: Eliminates the need for separate credential acquisition processes
- **Real-time Processing**: Immediate credential availability upon successful issuance

<div align="center">
    <img src={useBaseUrl("../img/web-wallet-2.png")}></img>
</div>

:::note Supported Embedded Credentials

Currently, the tool supports embedded issuance for a limited number of credentials only:

- Proof of Identity (refer to the schema <ins>[here](https://github.com/anima-protocol/claims-polygonid/blob/main/schemas/json-ld/poi-v1.json-ld)</ins>)
- Proof of Life (refer to the schema <ins>[here](https://github.com/anima-protocol/claims-polygonid/blob/main/schemas/json-ld/pol-v1.json-ld)</ins>)
- Proof of Uniqueness refer to the schema <ins>[here](https://github.com/anima-protocol/claims-polygonid/blob/main/schemas/json-ld/pou-v1.json-ld)</ins>)
:::

### Developer-Friendly Integration

Technical integration features:

- **Simplified APIs**: Reduced development overhead through streamlined integration APIs
- **Universal Links**: Support for universal link-based integration patterns
- **Flexible Verification**: Compatible with both on-chain and off-chain verification architectures
- **Cross-Platform Support**: Works across different web browsers and devices

## User Interface and Experience

### Embedded Issuance and Verification Journey for End Users

Let's walk through an example scenario: Suppose a user needs to validate their humanity to perform specific actions (e.g. registration or posting a review) within an application.

1. **Initiating the Process**: The user clicks the designated button on the application, triggering redirection to the Web Wallet.
2. **Connecting the Wallet**: Upon arrival, the user selects 'Sign In' and connects their Ethereum wallet with the tool.
3. **Creating Identity and Accessing Credentials**: Next, the user selects 'Sign Message' on MetaMask to create a derived identity wallet and retrieve the encrypted credentials associated with their Ethereum wallet via the cloud storage.
4. **Claiming the Credential**: If the user hasn't previously claimed the credential required by the verifier’s request, they proceed by clicking 'Claim Credential' and complete the issuance process (a face scan in this scenario) to claim the credential via the embedded issuance.
5. **Proof Generation**: Once the user owns the credential, they can select 'Verify,' triggering the generation of the zk-proof. This proof is then shared with the verifier application for off-chain verification or submitted to the smart contract for on-chain verification.
6. **Verification Completion**: The user is finally either automatically redirected or asked to click the ‘Continue’ button, upon which they are redirected to the application where the verification can be completed and the application flow can continue.

:::note

When a user creates a local account on the Privado ID Wallet app, their credentials will not be synced with the web wallet. In cases where the user is accessing a browser and has previously issued credentials on their mobile device, they can choose the 'Verify on App' option instead of 'Sign In' within the Web Wallet. This action will display a QR code that the user scans using the Privado ID wallet App. Scanning the QR code initiates proof generation and starts the verification process, allowing the user to seamlessly continue verification with the credentials stored on their mobile device.
:::

## Integration 

The Web Wallet can be seamlessly integrated into the credential issuance flow by the Issuers and into the verification flow by the Verifiers using [Universal Links](./universal-links.md).

You can experience a demo of the Web Wallet integration [here](https://web-wallet-demo.privado.id/).

:::caution Deprecation Notice
The prior method of integrating the Web Wallet using `https://wallet.privado.id/#base64EncodedData` is now deprecated and will no longer be supported after Release 9.
:::
