---
id: fetch-and-save
title: Fetch and Save Credentials
sidebar_label: Fetch and Save
description: An Integrator can fetch credentials stored on an Issuer and then save them in his/her wallet.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---

An Integrator can fetch credentials stored on an Issuer and then save them in his/her wallet. The `fetchAndSaveClaims()` function is called to fetch and save a list of credentials from an Issuer.

## Fetch and Save Credentials

```dart
Future<List<ClaimEntity>> fetchAndSaveClaims({
  required Iden3MessageEntity message,
  required String genesisDid,
  BigInt? profileNonce,
  required String privateKey,
});
```

The `fetchAndSaveClaims()` function uses `Iden3MessageEntity`, `privateKey`, `genesisDid` and `profileNonce` as the input parameters. and returns a list of `ClaimEntity`.

`OfferIden3MessageEntity` is a type of `Iden3MessageEntity` and is needed as `message` input, otherwise an exception of type InvalidIden3MsgTypeException will be thrown. As you can see in the [iden3 Message API](/docs/wallet/wallet-sdk/polygonid-sdk/iden3comm/api/get-iden3-msg.md) tutorial, we get `Iden3MessageEntity` when we call the `getIden3Message()`method.

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity.

`genesisDid` is the unique ID of the identity.

`profileNonce` is the nonce of the profile used from the identity to obtain the DID identifier.

## Wallet-Issuer Interaction for Fetching Credentials

1. The Integrator scans the QR code displayed on the Issuer site to get the Iden3 message.

2. The Integrator uses the `OfferIden3MessageEntity` obtained from the Iden3 message to authenticate and fetch the credentials from the Issuer.

3. The Issuer validates the identity and returns a list of `ClaimEntities` back to the Integrator.

4. The credentials are stored on the SDK associated with the identity.

![](/img/credential-wallet.png)
