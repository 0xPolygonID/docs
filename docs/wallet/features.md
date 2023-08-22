---
id: features
title: Features
sidebar_label: Features
description: Polygon ID Wallet app main features.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet
  - features
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Profile Selection

Whenever an ID Holder creates a connection with an Issuer, the Holder can select what kind of profile is more appropriate for that interaction. In this way, aside from the **public profile** (the original DID), they can also have a different identifier, a **private profile**, for each connection they might have with an Issuer.

<div align="center">
<img src={useBaseUrl("/img/profiles-1.png")} width="1000"/>
</div>
<br/>

You can always switch profiles:  

<div align="center">
<img src={useBaseUrl("/img/profiles-2.png")} width="300"/>
</div>
<br/>

:::info

Your **private profile** generates a unique identifier for the organization you created it with, ensuring that your connections and interactions with them cannot be linked to any other organizations.

:::

## Switch Network

Switching networks is also available on Polygon ID. You just need to reach the Settings menu and tap the network you would like to change to:

<div align="center">
<img src={useBaseUrl("/img/network-select.png")} width="500"/>
</div>
<br/>