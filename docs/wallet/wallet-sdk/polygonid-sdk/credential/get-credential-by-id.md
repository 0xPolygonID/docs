---
id: get-credential-by-id
title: Get Credential by ID
sidebar_label: Get Credential by ID
description: Retrieve a specific credential from the SDK using its ID.
keywords:
  - docs
  - optimism id
  - holder
  - issuer
  - verifier
  - wallet sdk
---

The SDK provides the capability to retrieve a specific credential by its ID through the `getCredentialById()` method.

```dart
Future<ClaimEntity> getCredentialById({
  required String credentialId,
  required String genesisDid,
  required String privateKey,
});
```

where:

- `credentialId` is the unique identifier of the credential to be retrieved.
- `genesisDid` is the unique ID of the identity.
- `privateKey` is the key used to access all the sensitive information from the identity and also to
  realize operations like generating proofs.

:::note

This method is essential for retrieving credentials based on their unique identifiers, allowing for specific operations on individual credentials within the SDK.

:::
