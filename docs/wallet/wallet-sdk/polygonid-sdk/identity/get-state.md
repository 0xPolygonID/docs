---
id: get-state
title: Get Identity State
sidebar_label: Get Identity State
description: The getState() function returns the present state of an identity.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---

The `getState()` function returns the present state of an identity.

```
Future<String> getState(String did)
```

`getState()` returns the identity state from the `did`, which is the unique ID of the identity.
