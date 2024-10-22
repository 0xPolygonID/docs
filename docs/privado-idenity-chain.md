---
id: privado-idenity-chain
title: Privado Identity Chain
sidebar_label: Privado Identity Chain
keywords:
  - privado id
  - chain
  - idenity
  - privado identity chain
  - network
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Privado Identity Chain, currently in beta with limited functionality, is a blockchain network designed to serve as the primary chain for user identities. It will act as the authoritative source of truth, enabling other chains to synchronize their state with it. This chain is essential for preventing the fragmentation of identities and credentials across the various chains we will be working with, ensuring that identities and credentials remain consistent and reusable across all chains.

### Configuration:

- **RPC**: `https://rpc-mainnet.privado.id`
- **Chain ID**: `21000` 

Details regarding the smart contracts and their deployment addresses can be found [here.](./smart-contracts.md)

### DIDs:
DIDs associated with the Privado Identity Chain will follow a prefix format:

```main
did:iden3:privado:main:
```

For example, a DID would look like this:

`did:iden3:privado:main:2Se4SGXrGrsfrCY8KPRT8R4ZbP91f6sAuBTt8xgA1W`

:::note
The Privado Identity Chain is currently accessible in a read-only mode.
<!-- State transitions and MTP issuance are not currently supported. -->
:::

:::caution
Currently, a few issuers, such as Synaps, are deployed on the Privado Identity Chain. During the beta phase, where the chain has limited functionality, issuers can continue to use other supported chains, such as Polygon POS.

Once the full version of the Privado Identity Chain is released, issuers on both the Privado Identity Chain and other supported chains will remain supported, ensuring seamless operation and interoperability across multiple chains.
:::