---
id: is-already-downloaded-circuits-from-server
title: Check if Circuits are Already Downloaded from Server
sidebar_label: Check if Circuits are Already Downloaded from Server
description: The method to check if the circuits are already downloaded from the server.
keywords:
  - docs
  - polygon id
  - proof
  - sdk
  - circuits
  - download
---

The method `isAlreadyDownloadedCircuitsFromServer()` is used to check if the circuits are already
downloaded from the server.

```dart
Future<bool> isAlreadyDownloadedCircuitsFromServer({
  required String circuitsFileName,
});
```

where:

- `circuitsFileName` is the name of the circuits file.

This function returns a `Future` of `bool`. If the circuits are already downloaded, it
returns `true`, otherwise, it returns `false`.

:::note

This method is used to avoid unnecessary downloads of the circuits for proof generation. It checks
if the circuits file already exists in the local storage.

:::
