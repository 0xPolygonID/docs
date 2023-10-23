---
id: get-did-profile-info
title: Get DID Profile Info
sidebar_label: Get DID Profile Info
description: Get info about a DID we interacted with.
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

Get information about a DID we interacted with.

```dart
Future<Map<String, dynamic>> getDidProfileInfo({
  required String did,
  required String privateKey,
  required String interactedWithDid,
});
```

`did` is the DID we interactedd with.

The `privateKey` is the key used to access all the sensitive information from the identity and also to realize operations like generating proofs.