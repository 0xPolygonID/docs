---
id: update-interaction
title: Update Interaction
sidebar_label: Update Interaction
description: "Update the states of an InteractionBaseEntity in the Polygon ID SDK."
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
  - DID
  - Interaction Base Entity
---

Update the states of an `InteractionBaseEntity` in the Polygon ID SDK.

```dart
Future<InteractionBaseEntity> updateInteraction({
  required String id,
  String? genesisDid,
  BigInt? profileNonce,
  String? privateKey,
  InteractionState? state,
});
```

The `id` is the ID of the notification to be updated.

The `genesisDid` is the unique ID of the identity.

The `profileNonce` is the nonce of the profile used from identity
to obtain the DID identifier.

The `privateKey` is the key used to access all the sensitive information from the identity.

The `state` is the new state of the interaction.
