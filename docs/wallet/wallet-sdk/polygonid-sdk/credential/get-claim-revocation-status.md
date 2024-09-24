---
id: get-claim-revocation-status
title: Get Credential Revocation Status
sidebar_label: Get Credential Revocation Status
description: Get Credential Revocation Status.
keywords:
  - docs
  - optimism id
  - holder
  - issuer
  - verifier
  - wallet sdk
  - revocation status
  - credential
---

Check whether a credential has been revoked or not.

```dart
Future<Map<String, dynamic>> getClaimRevocationStatus({
  required String claimId,
  required String genesisDid,
  required String privateKey});
```

`claimId` is the ID of the credential.

The `genesisDid` is the unique ID of the identity.

The `privateKey` is the key used to access all the sensitive information from the identity and also to realize operations like generating proofs.
