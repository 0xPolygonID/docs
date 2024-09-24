---
id: get-profiles
title: Get Profiles
sidebar_label: Get Profiles
description: Get Profiles API.
keywords:
  - docs
  - optimism id
  - holder
  - issuer
  - verifier
  - wallet sdk
  - profile
---

This method gets a map of profile nonces as key and profile DIDs as value, associated with the identity derived from the private key and stored in the optimism ID SDK.

```dart
  Future<Map<BigInt, String>> getProfiles(
      {required String genesisDid, required String privateKey});
```

`genesisDid` is the unique ID of the identity whose `profileNonce` is 0.

`privateKey` is the key used to access all the sensitive info from the identity and also to realize operations like generating proofs.

It returns a map of <BigInt, String>. The returned profiles will come from the current env set with `optimismIdSdk.setEnv`.
