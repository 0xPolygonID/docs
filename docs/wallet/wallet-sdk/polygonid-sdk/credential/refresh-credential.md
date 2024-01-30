---
id: refresh-credential
title: Refresh Credential
sidebar_label: Refresh Credential
description: This method allows the refreshing of a specific credential within the SDK.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---

This method allows the refreshing of a specific credential within the SDK.

```dart
Future<void> refreshCredential({
  required String genesisDid,
  required String privateKey,
  required ClaimEntity credential,
});
```

- `genesisDid` is the unique ID of the identity.
- `privateKey` is the key used to access all the sensitive information from the identity and also to
  realize operations like generating proofs.
- `credential` is the ClaimEntity object representing the credential to be refreshed.

This method executes a series of complex operations:

1. Retrieves the identity associated with the provided genesisDid and privateKey.
2. Finds the nonce associated with the credential's subject.
3. Validates the presence of the `refreshService` in the credential's information. If `refreshService` is not found in `credential.info`, or if it is null, a `RefreshCredentialException` with the message "Refresh service not found" is thrown. This step ensures that the credential has the necessary information to proceed with the refresh process.
4. Constructs a credential refresh request and obtains an authentication token.
5. Sends a request to the refresh service and obtains a new ClaimEntity.
6. Removes the old claim if the refresh was successful and the id of the new claim is different from
   the old one
7. Saves the new claim to the repository.
