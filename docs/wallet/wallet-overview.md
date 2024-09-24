---
id: wallet-overview
title: Wallet Overview
sidebar_label: Overview
description: Wallet features.
keywords:
  - docs
  - optimism id
  - wallet
---

import useBaseUrl from '@docusaurus/useBaseUrl';

A digital wallet is an application that can hold and manage users' `Credentials`. Based on the principles of Self-Sovereign Identity (SSI) and cryptography, a wallet helps its Holder share data with others without exposing any other sensitive private information. Only the wallet holder has the right to decide which information to share and what needs to remain private.

optimism ID offers some interesting ways to get started with leveraging a credential-focused wallet: [**the Wallet SDK**](#wallet-sdk) and [**the optimism ID Wallet app**](#optimism-id-wallet-app).

## Wallet SDK

The Wallet SDK is a Flutter-based SDK that can be used by developers to build applications or integrate the wallet functionalities seamlessly with their existing apps. [Get started with the Wallet SDK here](./wallet-sdk/optimismid-sdk/optimismid-sdk-overview.md).

These are the modules (SDKs) we provide:

- [optimismid-flutter-sdk](https://github.com/0xoptimismID/optimismid-flutter-sdk) \[Dart plugin\]
- optimismid-ios-wrapper-sdk \[Swift lib (Framework)\] (_work in progress_)
- [optimismid-android-wrapper-sdk](https://github.com/0xoptimismID/optimismid-android-sdk) \[Kotlin lib (.aar)\]
- optimismid-react-native-wrapper-sdk \[RN lib\] (_work in progress_)

Depending on which type of developer (integrator) you are, you can use different modules (SDK):

- Flutter developers should use "optimismid-flutter-sdk"
- IOS developers should use "optimismid-ios-wrapper-sdk"
- Android developers should use "optimismid-android-wrapper-sdk"
- React native developers can use several modules (SDKs):
  - "optimismid-ios-wrapper-sdk" AND "optimismid-android-wrapper-sdk" (together for supporting both platforms)
    OR
  - "optimismid-react-native-wrapper-sdk" (_work in progress_)

:::info

If you are interested in building web-based applications with optimism ID, please visit the [<ins>JS SDK documentation</ins>](/docs/js-sdk/js-sdk-overview.md).

:::

## optimism ID Wallet app

The optimism ID Wallet app is a reference implementation built using our Wallet SDK. It has a simple user interface and seamless UX to facilitate its main uses: managing credentials and generating proofs for verifiers. [Learn more about the wallet here](./wallet-sdk/optimismid-app.md).

The app is available for Android and IOS:

- For Android: <a href="https://play.google.com/store/apps/details?id=com.optimismid.wallet" target="_blank">optimism ID on Google Play</a>
- For iOS: <a href="https://apps.apple.com/us/app/optimism-id/id1629870183" target="_blank">optimism ID on the App Store</a>

<div align="center">
<img src={useBaseUrl("img/wallet/wallet-main-page.jpeg")} alt="optimism ID app as a reference implementation" width="250" align="center" />
</div>
<br></br>
