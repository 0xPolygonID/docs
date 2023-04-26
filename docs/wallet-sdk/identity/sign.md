---
id: sign
title: Sign Message
sidebar_label: Sign Message
description: In the Polygon ID SDK, a message can be signed using the sign() function.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---

In the SDK, a message can be signed using the `sign()` function. 

```
Future<String> sign({
  required String privateKey, required String message
});
```

The `sign()` function signs a message using the identity's private key.

The `privateKey` and the `message` are passed as the input parameters to the function and a signature string is returned. 

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity. 

`message` is the actual message sent by the Integrator and it needs to be signed. 

Thus the role of `sign()` is to sign a message string for an Integrator using the identity's `privateKey`.

![](/img/identity-wallet.png)

**Note**: When an Integrator scans a QR code, an iden3 message is created. This message has a `challenge` field from which the String `message` (used as input parameter) is generated. The `message` is then used to sign with the identity to generate a signature string.

>The Baby Jubjub private key is used to sign the message mentioned above. Read more about Baby Jubjub Elliptic Curve [here](https://eips.ethereum.org/EIPS/eip-2494).

