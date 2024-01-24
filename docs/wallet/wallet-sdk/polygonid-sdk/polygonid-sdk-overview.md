---
id: polygonid-sdk-overview
title: Wallet Overview
sidebar_label: Overview
description: Wallet features.
keywords:
  - docs
  - polygon id
  - wallet
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Polygon ID SDK (also **Wallet SDK**) is a Flutter-based set of tools that consists of libraries, code samples, APIs, and documentation that have been used to create the Polygon ID Wallet App. An Integrator can use this PolygonID SDK to either create their own apps (that provide similar functionality as that of the Polygon ID Wallet App) or integrate the functionalities seamlessly with their existing apps.

### Why Polygon ID Wallet SDK?

Integrating your app with the Polygon ID Wallet SDK can provide you with the major features of an SSI system. As it is built leveraging a zero-knowledge identity protocol, it can let you create an identity application that is not only robust but also maintains high standards of privacy for your users, since it lets them protect their sensitive data from third-party entities. The Polygon ID Wallet SDK lets you:

- Create an Identity for a wallet
- Remove and restore identities from a wallet.
- Authenticate your wallet with an Issuer/Verifier.
- Receive credentials from an Issuer and store them in the wallet.
- Update credentials and remove them from the wallet when required.
- Generate zero-knowledge proof that can be sent to a Verifier for verification.

In the sections to come, you will read more about the Polygon ID Wallet SDK plugin and also an example app that will guide you to the initial setup required for using this plugin. In the later part of this example app, you will get to know the overall flow of the functionality that this plugin provides.

## Flutter SDK

[Flutter SDK](https://docs.flutter.dev/) is a set of tools that are built in Dart programming language and lets the developers create and test apps. It is an open-source, platform-agnostic framework that supports building mobile apps. The Flutter SDK provides a developer with CLI(Command Line Interface) tools and APIs that help built cross-platform apps.

The Flutter plugin package helps in implementing code for a specific platform: Android/iOS/web. To know more about different types of packages and the plugins provided by Flutter, visit [the Flutter docs packages page](https://docs.flutter.dev/development/packages-and-plugins/developing-packages).

:::info Polygon ID Wallet SDK and Polygon ID Wallet App

The Polygon ID SDK is the software development kit that acts as a core functionality, the Wallet App is an application that has been built over this SDK. This Identity Wallet helps Integrators create identities for their wallets and authenticate these identities while interacting with Issuers and Verifiers. They can also use the Polygon ID Wallet SDK to build an Identity Wallet of their own or customize any pre-existing identity wallets using the features provided by the SDK.

:::

:::note

Please note that the iOS Simulator for testing the Polygon ID Wallet SDK application is still under maintenance and would be available to use soon.

:::
