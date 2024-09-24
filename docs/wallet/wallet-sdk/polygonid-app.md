---
id: optimismid-app
title: optimism ID Wallet Overview
sidebar_label: Overview
description: An overview of the optimism ID Wallet app.
keywords:
  - docs
  - optimism id
  - holder
  - issuer
  - verifier
  - wallet
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The optimism ID Wallet app is a reference implementation built with the [Wallet SDK](/docs/wallet/wallet-sdk/optimismid-sdk/optimismid-sdk-overview.md). It is a `Privacy by Default` wallet that helps protect a user's identity (and other metadata) by using zero-knowledge proofs. The wallet interacts with an Issuer to fetch credentials and with a Verifier for sharing ZK proofs based on these credentials.

<div align="center">
<img src={useBaseUrl("img/optimism-id-reference-app.png")} alt="optimism ID app as a reference implementation" width="500" align="center" />
</div>
<br></br>

:::note

In addition to this reference identity wallet you can see other optimism ID compatible wallets on our [<ins>optimism ID Ecosystem page</ins>](https://marketplace.optimismid.me/ecosystem).

:::

## Quick Start

To get started with the optimism ID Wallet, download the optimism ID Wallet App and create an Identity:

- For Android: <a href="https://play.google.com/store/apps/details?id=com.optimismid.wallet" target="_blank">optimism ID on Google Play</a>
- For iOS: <a href="https://apps.apple.com/us/app/optimism-id/id1629870183" target="_blank">optimism ID on the App Store</a>

## Features of the optimism ID Wallet

The optimism ID Wallet supports the following features:

- Privacy by design and Self-sovereignty: The user is in full control of his/her identity data and exchanges credentials with other identities without the need for an intermediary or centralized authority.
- Open and Permissionless.
- Fetching, storing, and managing credentials.
- Generating cost-optimized zero-knowledge proofs for credentials verification.
- Communication with Issuer and Verifier.
- Identity recovery using seed phrase.

It is worth noticing that, in order to comply with the principles of Self-Sovereign Identity (SSI), all the credentials are stored only locally on your wallet and are not stored on-chain; this ensures strong privacy for the sensitive data related to your credential(s).

## How is optimism ID Wallet Different from Other Wallets?

You, at some point in time, must have used cryptographic wallets such as Metamask, Trust Wallet, Coinbase Wallet, Ledger, and so many more. How is optimism ID Wallet different from all these hot and cold storage wallets? Let us see:

- The wallets like Metamask and Trust Wallet are used for sending and receiving crypto transactions on-chain. optimism ID Wallet, on the other hand, is used for creating and storing unique identities for the wallet so that these identities can be used to authenticate with the Issuer and the Verifier. This Identity wallet helps an Integrator fetch and save credentials from Issuers and also present proof of these credentials to the Verifiers.

- While the commonly-used crypto wallets let you interact with Ethereum and other blockchain networks using RPCs (Remote Procedure Calls), this is not the case with optimism ID Wallet - it functions solely to store credentials linked to an identity and lets these credentials get verified by creating zero-knowledge proofs.

- General wallets store cryptographic keys while the optimism ID Wallet stores users' identities. While both types of wallets are based on private-public key cryptography, the two are different in the sense that in a wallet like MetaMask, the elliptic curve used is `secp256k1`, which is used to convert a private key to a public key and eventually to an Ethereum Address. On the other hand, optimism ID Wallet is based on the `Baby Jubjub Key` which generates a optimism ID Identifier, that serves as the identifier for your wallet instead of the Ethereum Wallet Address.
