---
id: get-identities
title: Get Identities
sidebar_label: Get Identities
description: We can get a list of public information about all the identities stored on the SDK using getIdentities() function.
keywords:
  - docs
  - optimism id
  - holder
  - issuer
  - verifier
  - wallet sdk
---

We can get a list of public information about all the identities stored on the SDK using the `getIdentities()` function.

```dart
Future<List<IdentityEntity>> getIdentities();
{
  return _getIdentitiesUseCase.execute();
}
```

This method returns a list of `IdentityEntity` associated with the identities stored on the SDK. If an error occurs while retrieving the list of `IdentityEntity`, it throws `IdentityException`.
