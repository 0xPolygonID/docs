---
id: web-wallet
title: Web Wallet
sidebar_label: Web Wallet
description: Links to Polygon ID product releases.
keywords:
  - docs
  - polygon id
  - ID holder
  - web wallet
  - verifier
  - wallet
  - identity
  - embedded issuance
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Web Wallet is a web based identity wallet developed to streamline the issuance and verification of credentials. Built for users, it gives a great user experience by facilitating the request and verification of credentials within a unified and simplified workflow.

## Quick Start
The Web Wallet is available on the browser [here](https://wallet.privado.id/). To get started, sign in with your crypto wallet and create an identity.

## Features

- **Seamless Authentication and Credential Management**: This tool enables users to authenticate via their Ethereum wallets, and automatically creates a derived identity wallet. Credentials undergo encryption using keys and are securely stored in end-to-end encrypted cloud storage\*, facilitating effortless access across multiple devices while streamlining processes.

:::note
\*The Cloud Storage serves as a secure repository for encrypted credentials, offering users the convenience of multi-device access to credentials and serving as a reliable backup solution. When a user signs the message using their Ethereum private key, an identity is derived and storage keys are generated. The digital signature scheme employed is ed25519. All the documents stored in the storage are end-to-end encrypted using AES256-GCM, guaranteeing that only the user with the storage keys can access his credentials, reinforcing the security of the stored information.
:::

- **Enhanced User Experience**: Prioritizing simplicity, the Web Wallet presents a user-friendly interface. From identity creation to credential claiming and verification, all steps seamlessly integrate, minimizing complexity.
- **Dashboard**: Users can conveniently view and manage their credentials stored in their Identity Wallet from the Dashboard.

<div align="center">
    <img src={useBaseUrl("../img/web-wallet-1.png")}></img>
</div>

- **Query Verification**: Users can quickly approve verification requests by validating them against the credentials stored in their wallet. 
- **Credential Issuance**: Users can easily claim the credentials and store them in their wallet issued by an Issuer.

- **Embedded Issuance**: The Web Wallet provides embedded issuance, allowing users to claim their credentials within the verification flow if they haven't done so before.

<div align="center">
    <img src={useBaseUrl("../img/web-wallet-2.png")}></img>
</div>

:::note

Currently, the tool supports embedded issuance for a limited number of credentials only:

- Proof of Identity (refer to the schema <ins>[here](https://github.com/anima-protocol/claims-polygonid/blob/main/schemas/json-ld/poi-v1.json-ld)</ins>)
- Proof of Life (refer to the schema <ins>[here](https://github.com/anima-protocol/claims-polygonid/blob/main/schemas/json-ld/pol-v1.json-ld)</ins>)
- Proof of Uniqueness refer to the schema <ins>[here](https://github.com/anima-protocol/claims-polygonid/blob/main/schemas/json-ld/pou-v1.json-ld)</ins>)
:::

- **Simplified Integration**: Integration into your application is effortless, reducing the development workload and ensuring swift implementation.
- **On-Chain and Off-Chain Query Verification**: Supporting both on-chain and off-chain query verification, the Web Wallet offers flexibility to meet diverse verification needs.
- **Consistency and Accuracy**: With a standardized interface, the tool promotes uniformity across users and organizations, minimizing errors.

:::note
Currently, only Polygon and Linea chains are supported for on-chain verification.
:::


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





