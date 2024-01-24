---
id: remove-claims
title: Remove Claims
sidebar_label: Remove Claims
description: The removeClaims() method removes credentials from the storage based on a list of claimIds.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---

The credentials stored on the SDK storage can be removed locally by the Integrator. They remain on the Issuer unless it removes them.

The `removeClaims()` method removes credentials from the storage based on a list of `claimIds`:

```dart
Future<void> removeClaims({
  required List<String> claimIds,
  required String genesisDid,
  required String privateKey
});
```

`claimids` are the IDs of the credentials.

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity.

`genesisDid` is the unique ID of the identity.

#### Remove a Single Credential

A single credential can also be removed from the storage based on its credential ID.

The `removeClaim()` method, just like `removeClaims()` method, removes a single credential based on credential's ID.

```dart
Future<void> removeClaim({
  required String claimId,
  required String genesisDid,
  required String privateKey
});
```
