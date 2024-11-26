---
id: overview
title: On-chain verification
sidebar_label: Overview
description: On-chain verification overview.
keywords:
  - docs
  - privado id
  - ID holder
  - issuer
  - verifier
  - on-chain
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The on-chain verification workflow allows dApps to verify users' credentials inside a Smart Contract. Zero-Knowledge Proof cryptography enables this verification to happen privately, that means, without revealing any personal information of the user (prover).

This flow is especially needed in cases where further on-chain logic needs to be implemented on successful verification such as:

- Distributing a token airdrop only to human-verified accounts
- Allowing voting only to account members of your DAO
- Blocking airdrops to users that belong to a specific country
- Allowing trading only to accounts that passed the KYC verification

## Two ways of verification

Before describing on-chain verification details, it's important to emphasize that there are two ways to add a ZK-proof verification logic to your contracts.

You can inherit `EmbeddedZKPVerifier` smart contract or link to pre-deployed `UniversalVerifier` contract. Both of the contracts share the same parent class and implement the same `IZKPVerifier` interface, which defines methods to set, get, and submit responses for Proof Requests.

However, as `EmbeddedZKPVerifier` is added to client custom contract that means that all verification result are stored in the state of a client contract. Whenever you need to use on-chain verification for a new contract, you need to re-submit all the proof responses to it.

On the other hand, `UniversalVerifier` is deployed as a standalone contract and acts as a central register of proof verifications. Once a proof is submitted for specific proof request, is can be used in many different client contracts.


## On-chain verification flow

### Embedded ZKP Verifier

<div align="center">
<img src={useBaseUrl("img/embedded-zkp-verifier-flow.png")} align="center" width="600"/>
</div>

1. After having deployed a client custom contract with inherited `Embedded ZKP Verifier`, the Verifier designs and sets a [Proof Request](#set-the-zkp-request) with `setRequest` contract method.
1. The Request is generated at verifier backend and delivered to a user within a QR code (or via deep-linking, depending on the implementation).
1. The user scans the QR code using his/her mobile ID wallet and parses the request.
1. A ZK proof is generated on mobile or web wallet according to the request of the website and based on the credentials held in his/her wallet.
1. The user sends the ZK proof to the Verifier Smart Contract via `submitZKPResponse` or `submitZKPResponseV2` method.
1. The Verifier Smart Contract verifies the ZK Proof.
1. The Verifier Smart Contract checks that the State of the Issuer of the credential and the State of the user are still valid and have not been revoked.
1. If the verification is successful, the proof status is recorded on-chain. 
1. Now the Verifier Contract may execute a custom business logic (e.g. minting tokens), which may check the proof status and occurs in the same transaction.

Note that the Verifier only sets the Request at step 1. All the rest of the interaction is between a User and the Smart Contract. All the verification logic is executed programmatically inside the Smart Contract.

### Universal ZKP Verifier

The beginning of the flow up to submitting Proof Response is similar to that of Embedded ZKP Verifier. The difference is that you should call `setZKPRequest` and `submitZKPResponse` or `submitZKPResponseV2` in `UniversalVerifier` but not in client custom contract.

Once proof response is submitted, any client custom logic should be executed via a separate transaction invoked on client contract directly. The custom logic may refer to `UniversalVerifier` contract to check for user verification.

<div align="center">
<img src={useBaseUrl("img/universal-zkp-verifier-flow.png")} align="center" width="800"/>
</div>

