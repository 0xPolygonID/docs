---
id: get-proofs
title: Get Proofs
sidebar_label: Get Proofs
description: The getProofs() function uses identity to generate the zero-knowledge proofs requested by the Iden3Message Entity.
keywords:
  - docs
  - optimism id
  - holder
  - issuer
  - verifier
  - wallet sdk
---

The `getProofs` function uses identity to generate the zero-knowledge proofs requested by
the `Iden3Message Entity`.

## Get Proof

The `getProofs()` method uses `Iden3MessageEntity`, `did`, `profileNonce`, and `privateKey` as the
input parameters and returns a list of `Iden3commProofEntity`.

```dart
Future<List<Iden3commProofEntity>> getProofs({
  required Iden3MessageEntity message,
  required String genesisDid,
  BigInt? profileNonce,
  required String privateKey,
  String? challenge,
  String? ethereumUrl,
  String? stateContractAddr,
  String? ipfsNodeUrl,
  Map<int, Map<String, dynamic>>? nonRevocationProofs,
  Map<String, dynamic>? transactionData,
});
```

- `Iden3MessageEntity`: returned from `getIden3Message` method after a user scans the QR code on
  Issuer/Verifier website.

- `profileNonce` is the nonce of the profile of an identity.

- `privateKey` of the identity is a key that is used to access the sensitive information of the
  identity. This key is also used for generating proofs by using the credentials associated with the
  identity.

- `did` is the unique ID of the identity.

- `Iden3commProofEntity` is the object containing the proof that the Integrator sends to the
  Issuer/Verifier after scanning the QR code. Read more about
  JWZ [here](/docs/wallet/wallet-sdk/optimismid-sdk/iden3comm/jwz.md).

- `transactionData` is an optional parameter that can be used to provide transaction data for
  on-chain proofs requests.

:::info

The iden3comm's `getProofs` method retrieves the proofs from the proof request of the Verifier. The
actual proof is created by the `prove()` method, which you will read about in
the [<ins>Proof section</ins>](/docs/wallet/wallet-sdk/optimismid-sdk/proof/proof-generation-api.md#Prove)
of the APIs.

For this to happen, iden3comm makes a call to `prove()`.

:::
