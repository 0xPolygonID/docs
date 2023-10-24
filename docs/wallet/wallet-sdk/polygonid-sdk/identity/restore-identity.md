---
id: restore-identity
title: Restore Identity
sidebar_label: Restore Identity
description: Restoring an Identity can be done using an identity backup and the secret used to create the identity.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---
 
In the SDK, an identity is restored using `restoreIdentity()` function. It restores the `IdentityEntity` from a `privateKey`and `encryptedIdentityDb` (Encrypted Identity Database) associated with the identity. 
 
```dart
Future<PrivateIdentityEntity> restoreIdentity({
  required String privateKey,
  required String genesisDid,
  String? encryptedIdentityDb
})
{
  return _restoreIdentityUseCase.execute(
        param: RestoreIdentityParam(
      genesisDid: genesisDid,
      privateKey: privateKey,
      encryptedDb: encryptedDb,
    ));
}
```
It returns an identity as a `PrivateIdentityEntity`and throws `IdentityException` if an error occurs.

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity. 

`genesisDid` is the unique ID of the identity whose `profileNonce` is 0.

The `encryptedIdentityDb` stores all the sensitive information related to the identity. It is a database where all the information associated with an identity is stored and secured by the identity (credentials, state, etc.). This information is stored in the SDK database and is accessible only by an Identity. The `encryptedIdentityDb` is passed as a String.


In short, the role of `restoreIdentity()` is to restore an `IdentityEntity` for an Integrator and then store it on the SDK. It returns the `PrivateIdentityEntity` object to the integrator to be able to operate with the identity. 
