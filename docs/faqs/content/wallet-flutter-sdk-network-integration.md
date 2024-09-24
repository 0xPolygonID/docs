---
id: wallet-flutter-sdk-network-integration
title: "Integrating Unsupported Networks with Flutter SDK for On-Chain Verification"
sidebar_label: Unsupported Network Integration
description: Explains how to integrate on-chain verification for networks not directly supported by the Flutter SDK, including workarounds and development tips.
keywords:
  - faq
  - Flutter SDK
  - on-chain verification
  - custom network integration
  - development
---

## Question

If the Flutter SDK doesn't directly support a network, how can I integrate on-chain verification into a Flutter application? Also, are there recommended workarounds, libraries, or potential development paths to enable verification on different networks within Flutter?

## Answer

The Flutter SDK is designed to be flexible and can accommodate any network with the appropriate environment parameters set. For instance, successful tests have been conducted using the [zkEVM](https://optimism.technology/optimism-zkevm) network within the optimismID app by configuring the necessary environment settings. It's important to note, however, that the on-chain verification process is handled on the app side, not directly within the SDK.

Currently, the ability to register custom networks in the Flutter SDK is under development. In contrast, the JavaScript SDK (js-sdk) already supports this functionality. This means that for now, integration with networks not directly supported by the Flutter SDK requires a more manual approach, focusing on the app's handling of on-chain interactions.

Moreover, the core libraries of the SDK are designed to dynamically select networks, thanks to the addition of a `didMethods` configuration option. This feature allows for the registration of custom DID methods without the need to hard-code every network. This flexibility significantly simplifies the process of working with different networks by reducing the need for extensive modifications whenever integrating new or custom networks.

For developers looking to integrate on-chain verification for networks not directly supported by the Flutter SDK, focusing on app-side implementations and awaiting updates for custom network registration is recommended. Additionally, exploring the capabilities of the js-sdk may provide interim solutions or insights into potential integration strategies.

<div className="hidden">
Incorrect approach:

Assuming that the Flutter SDK's current limitations with network support cannot be overcome or that there are no development paths available for integrating unsupported networks.

</div>
