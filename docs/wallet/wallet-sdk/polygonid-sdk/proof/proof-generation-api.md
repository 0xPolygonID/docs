---
id: proof-generation-api
title: Proof Generation API
sidebar_label: Proof Generation API
description: Proof Generation API.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---

## Prove

The `prove()` function generates zero-knowledge proof using the valid credentials requested from the
Identity.

It
passes `identifier`, `profileNonce`, `claimSubjectProfileNonce`, `credential`, `circuitData`, `proofScopeRequest`, `authClaim`, `incProof`, `nonRevProof`, `gistProof`, `treeState`, `challenge`, `signature`, `config`, `verifierId`, `linkNonce`,
and `transactionData` as input parameters and generates a `ZKProofEntity` proof.

```dart
Future<ZKProofEntity> prove({
  required String identifier,
  required BigInt profileNonce,
  required BigInt claimSubjectProfileNonce,
  required ClaimEntity credential,
  required CircuitDataEntity circuitData,
  required Map<String, dynamic> proofScopeRequest,
  List<String>? authClaim,
  MTProofEntity? incProof,
  MTProofEntity? nonRevProof,
  GistMTProofEntity? gistProof,
  Map<String, dynamic>? treeState,
  String? challenge,
  String? signature,
  Map<String, dynamic>? config,
  String? verifierId,
  String? linkNonce,
  Map<String, dynamic>? transactionData,
});
```

- `identifier` is the unique ID of the identity
- `profileNonce` is the nonce of the profile of the identity
- `credential` is the Verifiable Credential
- `circuitData` are the circuits used for generating a proof
- `proofScopeRequest` is the proof request information that comes from the Verifier
- `challenge` is a message the Verifier requires an Integrator to sign with its identity so that an
  Integrator can verify its identity
- `claimSubjectProfileNonce` is the nonce of the profile of the identity that is the subject of the
  credential
- `verifierId` is the ID of the verifier requesting the proof
- `linkNonce` is the nonce of the link between the different proofs using the same credential
- `transactionData` is the transaction data of an on-chain credential proof request

The `prove()` function generates a `ZKProofEntity` that fulfills the proof query parameters with
valid identity and credentials. This proof is shared by an Integrator with a Verifier. The `prove()`
returns a `ZKProofEntity` object so that the Integrator is able to verify the requested
information (requested from Identity) with the Verifier.
