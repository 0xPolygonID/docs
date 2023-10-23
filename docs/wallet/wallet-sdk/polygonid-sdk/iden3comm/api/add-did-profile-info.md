---
id: add-did-profile-info
title: Add DID Profile Info
sidebar_label: Add DID Profile Info
description: Add info about a DID we interacted with.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
  - DID
  - profile
---

Add info about a DID we interacted with.
   
```dart
Future<void> addDidProfileInfo({
  required String did,
  required String privateKey,
  required String interactedWithDid,
  required Map<String, dynamic> info,
});
```

`did` is the DID we interactedd with.

The `privateKey` is the key used to access all the sensitive information from the identity and also to realize operations like generating proofs.

  