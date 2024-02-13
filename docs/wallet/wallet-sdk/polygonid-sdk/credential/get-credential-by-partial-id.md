---
id: get-credential-by-partial-id
title: Get Credential by Partial ID
sidebar_label: Get Credential by Partial ID
description: Retrieve credentials from the SDK database using a partial ID.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---

The SDK allows for the retrieval of credentials from the database using only a portion of the
credential's ID, through the `getCredentialByPartialId()` method.

```dart
Future<ClaimEntity> getCredentialByPartialId({
  required String partialCredentialId,
  required String genesisDid,
  required String privateKey,
});
```

where:

- `partialCredentialId` is a portion of the credential's ID used for searching.
- `genesisDid` is the unique ID of the identity.
- `privateKey` is the key used to access all the sensitive information from the identity and also to
  realize operations like generating proofs.

This method returns a `ClaimEntity` object representing the credential that was found.

Internally, the method accesses the SDK's database, performing a search based on the provided
partialCredentialId. It then retrieves a list of ClaimDTO objects that match the partial ID.

:::note

This method is particularly useful when the full credential ID is not available. It allows for
efficient searching and retrieval of credentials based on partial ID information.

:::
