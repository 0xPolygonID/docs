---
id: backup-identity
title: Backup Identity
sidebar_label: Backup Identity
description: Backup Identity method backs up the identity stored on SDK.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---

A previously stored `IdentityEntity` on SDK is backed up using `backupIdentity()` method. The `IdentityEntity` is backed up from a `privateKey` associated with the Identity.

```dart
Future<String?>backupIdentity({
  required String genesisDid,
  required String privateKey,
});
```

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity.

`genesisDid` is the unique ID of the identity.

The method returns a `String` representing the encrypted databases associated with the identity.

If an error occurs, the method throws an `IdentityException`.
