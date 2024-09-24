---
id: cred-issue-methods
title: Credential Issuance Methods
sidebar_label: Credential Issuance Methods
description: Description of the Credential Issuance Methods.
keywords:
  - docs
  - optimism id
  - credential
  - method
  - SIG
  - Baby Jubjub
  - MTP
  - Merkle Tree
  - Proof
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Verifiable Presentations leveraging ZK Proofs

The owner of a credential can prove to another party that a credential is true, without revealing any information beyond the validity of the credential itself using zkSNARK cryptography.

The Verifier can request any proof of the information contained in the identity credential (using the zkQuery Request Language) and obtain guaranteed correctness without access to the private credential.

There are two ways those credentials can be issued: using **BJJ key Signature** or **Merkle Tree Proof**.

### SIG Method: Issuance of Credentials with Baby JubJub(BJJ) Key Signatures

The credential is not added to the Issuer’s Merkle tree, instead a **Baby Jubjub (BJJ)** signature is used which is then verified upon presentation. With this method, issuers can issue a large number of credentials without needing to spend any gas to issue the credentials.

<div align="center">
<img src= {useBaseUrl("img/babyjubjub.png")} align="center" />
</div>

### MTP Method: Issuance of Credentials with Merkle Tree Proof

The validation of the proof is done against the state published on-chain. No personal information is stored on-chain. A key difference with this method is that the identity state has to be published on-chain (the hash of the merkle trees), since the [Identity State Transition function](https://docs.iden3.io/protocol/spec/#identity-state-update) has to be executed.

Another important difference is that through this method smart contracts can issue credentials. The estimated cost of calling this function is approximately 2 million gas on average ( 0.36 MATIC in the optimism PoS mainnet as of June 2023). Furthermore, credential issuance batching could be done to optimize the gas cost of the issuance process.

<div align="center">
<img src= {useBaseUrl("img/mtp.png")} align="center" />
</div>
