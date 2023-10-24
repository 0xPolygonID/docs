---
id: get-claims
title: Get Credentials
sidebar_label: Get Credentials
description: After a credential is fetched from an Issuer and stored on the wallet SDK, an Integrator can retrieve this credential from the storage using getClaims() function.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---

:::note

An Issuer assigns IDs to the credentials. The wallet, after fetching these credentials, stores them on the SDK.

:::

After a credential is fetched from an Issuer and stored on the wallet SDK, an Integrator can retrieve this credential from the storage. This is done using `getClaims()` function.

```dart
Future<List<ClaimEntity>> getClaims({
  List<FilterEntity>? filters,
  required String genesisDid,
  required String privateKey
});
```

This function returns a list of `ClaimEntity` based on some pre-defined criteria or filters. The function uses `privateKey` and `genesisDid` as input parameters.

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity. 

`genesisDid` is the unique ID of the identity. 
 
#### Get Credentials by Ids
 
The `getClaimsByIds()` function retrieves a list of credentials stored on the SDK using a list of credential IDs.
 
```dart
Future<List<ClaimEntity>> getClaimsByIds({
  required List<String> claimIds,
  required String genesisDid,
  required String privateKey
});
```

The method, based on the credential IDs, retrieves a list of `ClaimEntity` from the storage. 
