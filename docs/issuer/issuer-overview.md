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
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

An Issuer is any subject that issues Verifiable Credentials. You can think of a credential as a statement: something an Issuer says about another subject. For example, when a university (Issuer) claims that a student (subject) has a degree, this is a credential.

An issuer might be:

- A DAO that issues “membership claims" to its members.
- A Government institution that issues Identity documents to its citizens.
- A Face detection Machine Learning application that issues "proof of personhood" claims.
- An employer that endorses its employees.

:::info

[<ins>Verifiable Credentials</ins>](https://www.w3.org/TR/vc-data-model/) are a flexible data format able to express any type of information so that developers can unleash their creativity.

:::

# Operating an issuer

There are some different ways one can perform issuer-related actions, that is, manage and issue credentials, establish connections with holders etc. These are the currently available options:

- Running an [Issuer Node](/docs/issuer/issuer-core) directly in your infrastructure.


- Adapting the [JS SDK](/docs/js-sdk/js-sdk-overview.md) to your application that issues credentials.

- Using [SaaS vendors](https://marketplace.polygonid.me/ecosystem) that leverage Polygon ID solutions.

- Making use of Polygon ID smart contracts for [on-chain issuance](/docs/issuer/on-chain-issuer/on-chain-overview.md/).

## Issuer Nodes

To operate, an Issuer must run an Issuer Node, which is a self-hosted Node that exposes all the functionalities necessary to run an issuer.

<div align="center">
<img src= {useBaseUrl("img/issuer-intro.png")} align="center" />
</div>
<br></br>

There are basically two ways the Issuer Node can be operated:

- Issuer Node API
- Issuer Node UI

<div align="center">
<img src= {useBaseUrl("img/whole-infra.png")} align="center" />
</div>

### Issuer Node API

The [Issuer Node API](issuer-core.md) is designed for developers and integrators looking to build custom solutions leveraging Privado ID's functionalities. It is ideal for those who might be interested in having access to low-level information** such as Merkle Trees.

<div align="center">
<img src= {useBaseUrl("img/3001.png")} align="center" />
</div>

### Issuer Node UI

The [Issuer Node UI](issuer-node-ui.md) provides the full experience of having an Issuer Node with all its capabilities in a easy-to-use interface for handling essential functions such as issuing and revoking credentials, publishing states, managing schemas, connections and identities. Powered by the Issuer Node API, it offers full control of these features without requiring direct API use.

<div align="center">
<img src= {useBaseUrl("img/8088.png")} align="center" />
</div>

### Privado Identity Chain

The Privado Identity Chain, currently in beta with limited functionality, is a blockchain network designed to serve as the primary chain for user identities. It will act as the authoritative source of truth, enabling other chains to synchronize their state with it. This chain is essential for preventing the fragmentation of identities and credentials across the various chains we will be working with, ensuring that identities and credentials remain consistent and reusable across all chains.

DIDs associated with the Privado Identity Chain will follow a prefix format:
<Tabs>
<TabItem value="Mainnet">

```main
did:iden3:privado:main:
```
</TabItem>
<TabItem value="Testnet">

```test
did:iden3:privado:test:
```
</TabItem>
</Tabs>
For example, a DID would look like this:

did:iden3:privado:main:2Se4SGXrGrsfrCY8KPRT8R4ZbP91f6sAuBTt8xgA1W

:::note
State transitions and MTP issuance are not currently supported.
:::

:::caution
Currently, a few issuers, such as Synaps, are deployed on the Privado Identity Chain. During the beta phase, where the chain has limited functionality, issuers can continue to use other supported chains, such as Polygon POS.

Once the full version of the Privado Identity Chain is released, issuers on both the Privado chain and other supported chains will remain supported, ensuring seamless operation and interoperability across multiple chains.
:::
