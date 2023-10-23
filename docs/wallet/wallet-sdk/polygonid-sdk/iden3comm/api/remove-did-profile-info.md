---
id: remove-did-profile-info
title: Remove DID Profile Info
sidebar_label: Remove DID Profile Info
description: Remove info about a did we interacted with.
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

Remove information about a DID we interacted with. 

```dart
Future<void> removeDidProfileInfo({
  required String did,
  required String privateKey,
  required String interactedWithDid,
});
```

`did` is the DID we interactedd with.

The `privateKey` is the key used to access all the sensitive information from the identity and also to realize operations like generating proofs.