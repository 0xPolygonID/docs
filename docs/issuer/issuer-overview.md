---
id: issuer-overview
title: Issuer Overview
sidebar_label: Overview
description: Definition of an Issuer.
keywords: 
  - docs
  - polygon id
  - issuer
  - claim
  - verifiable credentials
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Issuer Overview

An Issuer is any subject that issues Verifiable Credentials. You can think of a credential as a statement: something an Issuer says about another subject. For example, when a university (Issuer) claims that a student (subject) has a degree, this is a credential.

An issuer might be: 

- A DAO that issues “membership claims" to its members.
- A Government institution that issues Identity documents to its citizens.
- A Face detection Machine Learning application that issues "proof of personhood" claims. 
- An employer that endorses its employees.

:::info

[Verifiable Credentials](https://www.w3.org/TR/vc-data-model/) are a flexible data format able to express any type of information so that developers can unleash their creativity.

:::

To operate, an Issuer must run an [Issuer Node](/docs/issuer-node/issuer-node-overview.md), which is a self-hosted Node that exposes all the functionalities necessary to run an issuer.

<div align="center">
<img src= {useBaseUrl("img/issuer-intro.png")} align="center" />
</div>

Using Polygon ID, an Issuer can issue Credentials to their users.

## Issuer Node Types
There are basically two ways the Issuer Node can be implemented:

- Issuer Node Core API
- Issuer Node UI

<div align="center">
<img src= {useBaseUrl("img/whole-infra.png")} align="center" />
</div>

### Issuer Node Core API
The [Issuer Node Core API](issuer-core.md) is ideal for users who need multiple identities and for **integrator profiles, who want to create solutions based on Polygon ID functionalities and might be interested in having access to low-level information** such as Merkle Trees. 

<div align="center">
<img src= {useBaseUrl("img/3001.png")} align="center" />
</div>

### Issuer Node UI
The [Issuer Node UI](issuer-node-ui.md) provides the full experience of having an Issuer Node with all its capabilities. Although it offers only a single identity, it also presents a few extra features, such as establishing connections and importing schemas. It comes in an API format but there is also the possibility of generating a full-fledged user interface. 

Issuer Node User Interface with a more visual experience:

<div align="center">
<img src= {useBaseUrl("img/8088.png")} align="center" />
</div>

Issuer Node API UI with Managing Schemas, Credentials and other functionalities:

<div align="center">
<img src= {useBaseUrl("img/3002.png")} align="center" />
</div>
