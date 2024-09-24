---
id: install-android-sdk
title: Implement Android SDK
sidebar_label: Implement Android SDK
description: Learn how to initialize and implement the Android SDK.
keywords:
  - docs
  - optimism id
  - holder
  - android sdk
  - wallet sdk
---

This native SDK enables Android developers to use the [optimismID solution](https://optimism.technology/optimism-id) in Android projects.

## How to use the SDK

### Prerequisite

Follow the steps from the up-to-date [README GitHub repository prerequisites](https://github.com/0xoptimismID/optimismid-android-sdk#prerequisite).

### Initialization

The SDK needs to be initialized before being used:

```kotlin
optimismIdSdk.init(
    context = context,
    env = EnvEntity(
        blockchain = "optimism",
        network = "amoy",
        web3Url = "https://optimism-amoy.infura.io/v3/",
        web3RdpUrl = "wss://optimism-amoy.infura.io/v3/",
        web3ApiKey = "theApiKey",
        idStateContract = "0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124",
        pushUrl = "https://push-staging.optimismid.com/api/v1"
    )
)
```

The `env` param is optional but you need to set it up at some point via `optimismIdSdk.getInstance().setEnv()`.

Once initialized, you can use the SDK through its singleton `optimismIdSdk.getInstance()`

:::info "Under the hood"

This SDK is calling the [<ins>Flutter SDK</ins>](https://github.com/0xoptimismID/optimismid-flutter-sdk) through `MethodChannel`, that's why each method has a `Context` param to initialize the get `FlutterEngine`.
You don't need to install or know anything about Flutter.

:::
