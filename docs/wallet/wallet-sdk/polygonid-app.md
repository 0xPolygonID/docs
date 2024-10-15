---
id: polygonid-app
title: Privado ID Wallet Overview
sidebar_label: Overview
description: An overview of the Privado ID Wallet app.
keywords:
  - docs
  - privado id
  - holder
  - issuer
  - verifier
  - wallet
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Privado ID Wallet app is a reference implementation built with the [Wallet SDK](/docs/wallet/wallet-sdk/polygonid-sdk/polygonid-sdk-overview.md). It is a `Privacy by Default` wallet that helps protect a user's identity (and other metadata) by using zero-knowledge proofs. The wallet interacts with an Issuer to fetch credentials and with a Verifier for sharing ZK proofs based on these credentials.

<!-- <div align="center">
<img src={useBaseUrl("img/polygon-id-reference-app.png")} alt="Polygon ID app as a reference implementation" width="500" align="center" />
</div>
<br></br> -->

:::note

In addition to this reference identity wallet you can see other Privado ID compatible wallets on our [<ins>Privado ID Ecosystem page</ins>](https://marketplace.privado.id/ecosystem).

:::

## Quick Start

To get started with the Privado ID Wallet, download the Privado ID Wallet App and create an Identity:

- For Android: <a href="https://play.google.com/store/apps/details?id=com.polygonid.wallet" target="_blank">Polygon ID on Google Play</a>
- For iOS: <a href="https://apps.apple.com/us/app/polygon-id/id1629870183" target="_blank">Polygon ID on the App Store</a>

## Features of the Polygon ID Wallet

The Privado ID Wallet supports the following features:

- Privacy by design and Self-sovereignty: The user is in full control of his/her identity data and exchanges credentials with other identities without the need for an intermediary or centralized authority.
- Seamless Authentication and Credential Management: This App enables users to authenticate via their Ethereum wallets, and automatically creates a derived identity wallet. Users can easily fetch, store, and manage their credentials. Credentials undergo encryption using keys and are securely stored in end-to-end encrypted cloud storage*, facilitating effortless access across multiple devices while streamlining processes.

  Additionally, users can also create local accounts. In this case, the app generates an Ethereum wallet in the background and creates a derived identity wallet. This option is ideal for users who prefer to store credentials locally without using cloud storage or for those who do not have a wallets such as Metamask on their phone.

- Zero-Knowledge Proofs Generation: The app enables users to generate cost-optimized zero-knowledge proofs (ZKPs) for the purpose of credential verification, ensuring privacy-preserving authentication.

- Communication with Issuer and Verifier: The app facilitates seamless communication between users, credential issuers, and verifiers, allowing for secure and smooth credential exchanges.

- Identity recovery using private key: In case of local accounts, the App includes an identity recovery feature using private key. Users can securely recover their identity and credentials even if they lose access to their original device.

- Credential Marketplace: The app provides a credential marketplace, allowing users to proactively claim certain credentials in advance of verification. While users can still receive credential offers directly from issuers during the normal flow, the marketplace provides a convenient way to obtain select credentials beforehand, making future verifications quicker and smoother.

- Embedded Issuance: The App provides embedded issuance, allowing users to claim their credentials within the verification flow if they haven't done so before.



## How is Polygon ID Wallet Different from Other Wallets?

You, at some point in time, must have used crypto wallets such as Metamask, Trust Wallet, Coinbase Wallet, Ledger, and so many more. How is Polygon ID Wallet different from all these hot and cold storage wallets? Let us see:

- The wallets like Metamask and Trust Wallet are used for sending and receiving crypto transactions on-chain. Polygon ID Wallet, on the other hand, is used for creating and storing unique identities for the wallet so that these identities can be used to authenticate with the Issuer and the Verifier. This Identity wallet helps an Integrator fetch and save credentials from Issuers and also present proof of these credentials to the Verifiers.

- While the commonly-used crypto wallets let you interact with Ethereum and other blockchain networks using RPCs (Remote Procedure Calls), this is not the case with Polygon ID Wallet - it functions solely to store credentials linked to an identity and lets these credentials get verified by creating zero-knowledge proofs.

- General wallets store cryptographic keys while the Polygon ID Wallet stores users' identities. While both types of wallets are based on private-public key cryptography, the two are different in the sense that in a wallet like MetaMask, the elliptic curve used is `secp256k1`, which is used to convert a private key to a public key and eventually to an Ethereum Address. On the other hand, Polygon ID Wallet is based on the `Baby Jubjub Key` which generates a Polygon ID Identifier, that serves as the identifier for your wallet instead of the Ethereum Wallet Address.

