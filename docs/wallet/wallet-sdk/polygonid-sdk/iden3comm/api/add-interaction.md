---
id: add-interaction
title: Add Interaction
sidebar_label: Add Interaction
description: "Save an InteractionBaseEntity in the Polygon ID Sdk."
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

 Save an `InteractionBaseEntity` in the Polygon ID SDK.  

```dart
Future<InteractionBaseEntity> addInteraction({
  required InteractionBaseEntity interaction,
  String? genesisDid,
  String? privateKey,
});
```

The `interaction` is the interaction to be saved.

The `genesisDid` is the unique ID of the identity.

The `privateKey` is the key used to access all the sensitive information from the identity and also to realize operations like generating proofs.