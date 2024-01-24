---
id: get-claims-from-iden3-message
title: Get Claims from Iden3 Message
sidebar_label: Get Claims from Iden3 Message
description: "Get a list of ClaimEntity stored in Polygon ID Sdk that fulfills
the request from iden3comm message."
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
  - DID
  - iden3 message
  - iden3comm
---

Get a list of `ClaimEntity` stored in Polygon Id Sdk that fulfills the request from iden3comm message.

```dart
Future<List<ClaimEntity?>> getClaimsFromIden3Message(
  {required Iden3MessageEntity message,
  required String genesisDid,
  BigInt? profileNonce,
  required String privateKey,
  Map<int, Map<String, dynamic>>? nonRevocationProofs});
```

The `message` is the iden3comm message entity.

The `genesisDid` is the unique ID of the identity.

The `profileNonce` is the nonce of the profile used from the identity to obtain the DID identifier.

The `privateKey` is the key used to access all the sensitive information from the identity and also to realize operations like generating proofs.
