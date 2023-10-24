---
id: remove-interactions
title: Remove Interaction
sidebar_label: Remove Interaction
description: "Remove a list of InteractionEntity from the Polygon ID SDK by their IDs."
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
  - DID
  - Interaction Entity
---

Remove a list of `InteractionEntity` from the Polygon ID SDK by their IDs.

```dart
Future<void> removeInteractions({
  String? genesisDid,
  String? privateKey,
  required List<String> ids,
});
```

The `genesisDid` is the unique ID of the identity.

The `privateKey` is the key used to access all the sensitive information from the identity and also to realize operations like generating proofs.

The `ids` is the list of IDs of the interactions to be removed.
