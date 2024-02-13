---
id: get-filters
title: Get Filters
sidebar_label: Get Filters
description: Returns a list of FilterEntity from an Iden3comm message.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
  - DID
  - Filter entity
  - iden3comm
---

Returns a list of `FilterEntity` from an iden3comm message to apply to `Credential.getClaims`.

```dart
Future<List<FilterEntity>> getFilters({required Iden3MessageEntity message});`
```

The `message` is the iden3comm message entity.
