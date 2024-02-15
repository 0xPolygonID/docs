---
id: remove-identity
title: Remove Identity
sidebar_label: Remove Identity
description: In the Polygon ID SDK, an identity is removed using removeIdentity() method.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---

In the SDK, an identity is removed using the `removeIdentity()` method.

```dart
Future<void> removeIdentity({
  required String genesisDid, required String privateKey
});
```

The `removeIdentity()` function removes a previously created and stored Identity from the SDK. The `genesisDiD` string and the `privateKey` are passed as parameters to the function.

`genesisDiD` is the unique ID of the identity for which the profile nonce is zero.

`privateKey` is the key that is used to access sensitive information related to an identity. This key is also used to generate proofs using the credentials associated with that identity.

If an error occurs, the function throws an `IdentityException`.
