---
id: install-android-sdk
title: Implement Android SDK
sidebar_label: Implement Android SDK
description: Learn how to initialize and implement the Android SDK.
keywords:
  - docs
  - polygon id
  - holder
  - android sdk
  - wallet sdk
---

This native SDK enables Android developers to use the [PolygonID solution](https://polygon.technology/polygon-id) in Android projects.

## How to use the SDK

### Prerequisite

Follow the steps from the up-to-date [README GitHub repository prerequisites](https://github.com/0xPolygonID/polygonid-android-sdk#prerequisite).

### Initialization

The SDK needs to be initialized before being used:

```kotlin
PolygonIdSdk.init(
    context = context,
    env = EnvEntity(
        blockchain = "polygon",
        network = "amoy",
        web3Url = "https://polygon-amoy.infura.io/v3/",
        web3RdpUrl = "wss://polygon-amoy.infura.io/v3/",
        web3ApiKey = "theApiKey",
        idStateContract = "0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124",
        pushUrl = "https://push-staging.polygonid.com/api/v1"
    )
)
```

The `env` param is optional but you need to set it up at some point via `PolygonIdSdk.getInstance().setEnv()`.

Once initialized, you can use the SDK through its singleton `PolygonIdSdk.getInstance()`

:::info "Under the hood"

This SDK is calling the [<ins>Flutter SDK</ins>](https://github.com/0xPolygonID/polygonid-flutter-sdk) through `MethodChannel`, that's why each method has a `Context` param to initialize the get `FlutterEngine`.
You don't need to install or know anything about Flutter.

:::
