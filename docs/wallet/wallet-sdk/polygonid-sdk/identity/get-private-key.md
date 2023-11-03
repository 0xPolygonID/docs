---
id: get-private-key
title: Get Private Key
sidebar_label: Get Private Key
description: Get the identity private key from a secret.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
  - secret
  - private key
---

Get the identity private key from a secret.

```dart
Future<String> getPrivateKey({
  required String secret,
});
```

A `secret` is a random 32-bytes length array. An Integrator can create this secret in the way he finds it better suited for his/her application. It could be an encrypted mnemonic seed phrase generated with BIP39 (a way of creating mnemonic codes) or an Ethereum private key.