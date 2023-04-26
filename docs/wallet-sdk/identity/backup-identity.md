---
id: backup-identity
title: Backup Identity
sidebar_label: Backup Identity
description: Backup Identity method backs up the identity stored on SDK.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---
 
A previously stored `IdentityEntity` on SDK is backed up using `backupIdentity()` method. The `IdentityEntity` is backed up from a `privateKey` associated with the Identity. 
 
```
Future<Map<int, String>?>backupIdentity({
  required String privateKey, 
  required blockchain, 
  required network
});
``` 

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity. 

`blockchain` is the name of the blockchain associated with the identity. In our case, it is **Polygon**. 

`network` is the type of network (Mainnet or Testnet) associated with the identity. 

The method returns a `map` of profile nonces and encrypted databases associated with the identity. 

If an error occurs, the method throws an `IdentityException`.
