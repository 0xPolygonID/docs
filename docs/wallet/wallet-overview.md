---
id: wallet-overview
title: Wallet Overview
sidebar_label: Overview
description: Wallet features.
keywords:
  - docs
  - privado id
  - wallet
---

import useBaseUrl from '@docusaurus/useBaseUrl';

A digital wallet is an application that can hold and manage users' `Credentials`. Based on the principles of Self-Sovereign Identity (SSI) and cryptography, a wallet helps its Holder share data with others without exposing any other sensitive private information. Only the wallet holder has the right to decide which information to share and what needs to remain private.

Privado ID offers some interesting ways to get started with leveraging a credential-focused wallet: [**the Wallet SDK**](#wallet-sdk), [**the Web Wallet**](#web-wallet) and the [**the Privado ID Wallet app**](#privado-id-wallet-app).

:::info
When the Web Wallet and the Privado ID Wallet app are signed in with the same crypto wallet, the credentials are synced, enabling effortless access across multiple devices.
:::

## Wallet SDK

The Wallet SDK is a Flutter-based SDK that can be used by developers to build applications or integrate the wallet functionalities seamlessly with their existing apps. [Get started with the Wallet SDK here](./wallet-sdk/polygonid-sdk/polygonid-sdk-overview.md).

These are the modules (SDKs) we provide:

- [polygonid-flutter-sdk](https://github.com/0xPolygonID/polygonid-flutter-sdk) \[Dart plugin\]
- polygonid-ios-wrapper-sdk \[Swift lib (Framework)\] (_work in progress_)
- [polygonid-android-wrapper-sdk](https://github.com/0xPolygonID/polygonid-android-sdk) \[Kotlin lib (.aar)\]
- Polygonid-react-native-wrapper-sdk \[RN lib\] (_work in progress_)

Depending on which type of developer (integrator) you are, you can use different modules (SDK):

- Flutter developers should use "polygonid-flutter-sdk"
- IOS developers should use "polygonid-ios-wrapper-sdk"
- Android developers should use "polygonid-android-wrapper-sdk"
- React native developers can use several modules (SDKs):
  - "polygonid-ios-wrapper-sdk" AND "polygonid-android-wrapper-sdk" (together for supporting both platforms)
    OR
  - "polygonid-react-native-wrapper-sdk" (_work in progress_)


## Web Wallet

The Web Wallet is a web based identity wallet developed to streamline the issuance and verification of credentials. It is a reference implementation built using our [JS SDK](/docs/js-sdk/js-sdk-overview.md). Learn more about the Web Wallet [here](./web-wallet.md).

The Web Wallet is available on the browser [here](https://wallet.privado.id/). 

<div align="center">
    <img src={useBaseUrl("../img/web-wallet-1.png")}></img>
</div>

## Privado ID Wallet app

The Privado ID Wallet app is a reference implementation built using our Wallet SDK. It has a simple user interface and seamless UX to facilitate its main uses: managing credentials and generating proofs for verifiers. [Learn more about the wallet here](./wallet-sdk/polygonid-app.md).

The app is available for Android and IOS:

- For Android: <a href="https://play.google.com/store/apps/details?id=id.privado.wallet" target="_blank">Privado ID Wallet on Google Play</a>
- For iOS: <a href="https://apps.apple.com/us/app/privadoid/id6566184703" target="_blank">Privado ID Wallet on the App Store</a>


<div align="center">
<img src={useBaseUrl("img/wallet/wallet-main-page.jpeg")} alt="Polygon ID app as a reference implementation" width="250" align="center" />
</div>
<br></br>
