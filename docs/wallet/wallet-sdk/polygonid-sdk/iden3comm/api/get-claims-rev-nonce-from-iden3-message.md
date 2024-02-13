---
id: get-claims-rev-nonce-from-iden3-message
title: Get Claims Revocation Nonce from Iden3 Message
sidebar_label: Get Claims Revocation Nonce from Iden3 Message
description: " Get a list of revocation nonces of claims stored in Polygon ID Sdk that fulfill
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

Get a list of revocation nonces of credentials stored in Polygon ID SDK that fulfill the request from the iden3comm message.

```dart
Future<List<int>> getClaimsRevNonceFromIden3Message({
  required Iden3MessageEntity message,
  required String genesisDid,
  BigInt? profileNonce,
  required String privateKey,
});
```

The `message` is the iden3comm message entity.

The `genesisDid` is the unique ID of the identity.

The `profileNonce` is the nonce of the profile used from the identity to obtain the DID identifier.

The `privateKey` is the key used to access all the sensitive information from the identity and also to realize operations like generating proofs.
