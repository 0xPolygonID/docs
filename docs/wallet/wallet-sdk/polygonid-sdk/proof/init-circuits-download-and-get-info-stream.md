---
id: init-circuits-download-and-get-info-stream
title: Initialize Circuits Download and Get Info Stream
sidebar_label: Initialize Circuits Download and Get Info Stream
description: The method to initialize the download of circuits and get the information stream.
keywords:
  - docs
  - polygon id
  - proof
  - sdk
  - circuits
  - download
---

The method `initCircuitsDownloadAndGetInfoStream()` is used to initialize the download of circuits
and get the information stream.

```dart
Stream<DownloadInfo> initCircuitsDownloadAndGetInfoStream({
  required List<CircuitsToDownloadParam> circuitsToDownload,
});
```

where:

- `circuitsToDownload` is a list of `CircuitsToDownloadParam` objects. Each object contains
  the `circuitsName` and the `bucketUrl` from where the circuits will be downloaded.

This function returns a `Stream` of `DownloadInfo` objects. Each `DownloadInfo` object contains
information about the download progress, such as the total content length and the amount downloaded
so far.

:::note

This method is used to download the necessary circuits for proof generation. The download progress
can be monitored by listening to the returned stream.

:::