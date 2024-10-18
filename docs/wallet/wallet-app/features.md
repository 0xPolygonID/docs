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


The Privado ID Wallet App supports the following features:

- Privacy by design and Self-sovereignty: The user is in full control of his/her identity data and exchanges credentials with other identities without the need for an intermediary or centralized authority.
- Seamless Authentication and Credential Management: This App enables users to authenticate via their Ethereum wallets, and automatically creates a derived identity wallet. Users can easily fetch, store, and manage their credentials. Credentials undergo encryption using keys and are securely stored in end-to-end encrypted cloud storage*, facilitating effortless access across multiple devices while streamlining processes.

  Additionally, users can also create local accounts. In this case, the app generates an Ethereum wallet in the background and creates a derived identity wallet. This option is ideal for users who prefer to store credentials locally without using cloud storage or for those who do not have a wallets such as Metamask on their phone.


:::info
\*The Cloud Storage serves as a secure repository for encrypted credentials, offering users the convenience of multi-device access to credentials and serving as a reliable backup solution. When a user signs the message using their Ethereum private key, an identity is derived and storage keys are generated. The digital signature scheme employed is ed25519. All the documents stored in the storage are end-to-end encrypted using AES256-GCM, guaranteeing that only the user with the storage keys can access his credentials, reinforcing the security of the stored information.
:::

<div align="center">
<img src={useBaseUrl("img/wallet-login.png")}  width="300" align="center" />
</div>
<br></br>

:::note
To sync the identity and its associated credentials between the Privado ID Web Wallet and the Privado ID Wallet App, the user must log in with the same crypto wallet account in both platforms.
:::

- Zero-Knowledge Proofs Generation: The app enables users to generate cost-optimized zero-knowledge proofs (ZKPs) for the purpose of credential verification, ensuring privacy-preserving authentication.

- Communication with Issuer and Verifier: The app facilitates seamless communication between users, credential issuers, and verifiers, allowing for secure and smooth credential exchanges.

- Identity recovery using private key: In case of local accounts, the App includes an identity recovery feature using private key. Users can securely recover their identity and credentials even if they lose access to their original device.

- Credential Marketplace: The app provides a credential marketplace, allowing users to proactively claim certain credentials in advance of verification. While users can still receive credential offers directly from issuers during the normal flow, the marketplace provides a convenient way to obtain select credentials beforehand, making future verifications quicker and smoother.
<div align="center">
<img src={useBaseUrl("img/credential-marketplace.png")}  width="300" align="center" />
</div>

- Embedded Issuance: The App provides embedded issuance, allowing users to claim their credentials within the verification flow if they haven't done so before.

:::note
Currently, the tool provides Credential Marketplace and Embedded Issuance with limited number of credentials only:

- Proof of Identity (refer to the schema <ins>[here](https://github.com/anima-protocol/claims-polygonid/blob/main/schemas/json-ld/poi-v1.json-ld)</ins>)
- Proof of Life (refer to the schema <ins>[here](https://github.com/anima-protocol/claims-polygonid/blob/main/schemas/json-ld/pol-v1.json-ld)</ins>)
- Proof of Uniqueness refer to the schema <ins>[here](https://github.com/anima-protocol/claims-polygonid/blob/main/schemas/json-ld/pou-v1.json-ld)</ins>)
:::



## How is Privado ID Wallet Different from Other Wallets?

You, at some point in time, must have used crypto wallets such as Metamask, Trust Wallet, Coinbase Wallet, Ledger, and so many more. How is Privado ID Wallet different from all these hot and cold storage wallets? Let us see:

- The wallets like Metamask and Trust Wallet are used for sending and receiving crypto transactions on-chain. Privado ID Wallet, on the other hand, is used for creating and storing unique identities for the wallet so that these identities can be used to authenticate with the Issuer and the Verifier. This Identity wallet helps an Integrator fetch and save credentials from Issuers and also present proof of these credentials to the Verifiers.

- While the commonly-used crypto wallets let you interact with Ethereum and other blockchain networks using RPCs (Remote Procedure Calls), this is not the case with Privado ID Wallet - it functions solely to store credentials linked to an identity and lets these credentials get verified by creating zero-knowledge proofs.

- General wallets store cryptographic keys while the Privado ID Wallet stores users' identities. While both types of wallets are based on private-public key cryptography, the two are different in the sense that in a wallet like MetaMask, the elliptic curve used is `secp256k1`, which is used to convert a private key to a public key and eventually to an Ethereum Address. On the other hand, Privado ID Wallet is based on the `Baby Jubjub Key` which generates a Privado ID Identifier, that serves as the identifier for your wallet instead of the Ethereum Wallet Address.

