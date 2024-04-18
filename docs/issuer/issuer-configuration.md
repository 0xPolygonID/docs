---
id: issuer-configuration
title: Configuration
sidebar_label: Configuration
description: Issuer custom configuration.
keywords:
  - docs
  - polygon id
  - issuer node
  - configuration
  - verifiable credentials
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Advanced Issuer Node configuration

This guide will show you how to configure your Issuer Node.

:::caution
*Polygon Mumbai testnet has been deprecated 
:::

## Revocation Status

The revocation status is a core part of the credential, as it is the verifier's way of checking whether or not a credential has been revoked by the issuer. The Issuer Node offers three different ways to check the revocation status of a credential:

- `Centralized`: The verifier or user will check the credential revocation status through the Issuer Node itself, which is why we consider it to be a centralized method. If the node is not available, the verification will fail, resulting in possible errors when trying to generate ZK Proofs.

- `RHS Off Chain`: In this case, the credential revocation will be checked in a server independent from the Issuer Node (managed by the Issuer or an independent agent), so that we no longer depend on the Issuer Node as the only point of failure. This service will be a fallback in case the RHS is not available.

- `RHS On Chain`: This method can be considered as completely decentralized since the RHS is on chain, therefore the user or verifier will check the status of a credential via this decentralized on chain service without depending on a centralized server. This is the **desirable option**.

### Centralized (default)

In this case we will have to make sure that the Issuer Node is publicly accessible.

**Core API**:

.env-issuer

```
ISSUER_CREDENTIAL_STATUS_RHS_MODE=None
ISSUER_SERVER_URL={Set a publicly accessible URL for the same $ISSUER_SERVER_PORT}

```

**UI**:

.env-api

```
ISSUER_API_UI_SERVER_URL={Set a publicly accessible URL for the same $ISSUER_API_UI_SERVER_PORT}

```

### RHS Off Chain

For the RHS Off Chain, there are two options:

1. Use an RHS from a reliable entity.
2. Install your own RHS; you can do it with the following guide: [Configure your own RHS](reverse-hash-service.md)

Once you have your publicly accessible RHS URL:

.env-issuer

```
ISSUER_CREDENTIAL_STATUS_RHS_MODE=OffChain
ISSUER_CREDENTIAL_STATUS_RHS_URL={RHS publicly accessible URL}
```

### RHS On Chain

.env-issuer

```
ISSUER_CREDENTIAL_STATUS_RHS_MODE=OnChain
```

<Tabs>
<TabItem value="Polygon Amoy">

```bash
ISSUER_CREDENTIAL_STATUS_ONCHAIN_TREE_STORE_SUPPORTED_CONTRACT=0x3d3763eC0a50CE1AdF83d0b5D99FBE0e3fEB43fb
ISSUER_CREDENTIAL_STATUS_RHS_CHAIN_ID=80002
```

</TabItem>


<TabItem value="Polygon Main">

```bash
ISSUER_CREDENTIAL_STATUS_ONCHAIN_TREE_STORE_SUPPORTED_CONTRACT=0xbEeB6bB53504E8C872023451fd0D23BeF01d320B
ISSUER_CREDENTIAL_STATUS_RHS_CHAIN_ID=137
```

</TabItem>

<TabItem value="Polygon Mumbai*">

```bash
ISSUER_CREDENTIAL_STATUS_ONCHAIN_TREE_STORE_SUPPORTED_CONTRACT=0x16A1ae4c460C0a42f0a87e69c526c61599B28BC9
ISSUER_CREDENTIAL_STATUS_RHS_CHAIN_ID=80001
```

</TabItem>
</Tabs>

## State Contract

The State Contract stores the Global Identity State Tree. The GIST State represents a snapshot of the states of all the identities operating in the system. The design of the State Contract allows identities to authenticate themselves using Identity Profiles.

Every time that an identity is updated, for example when a credential is issued using SMT Proof or revoked, it needs to perform a State Transition. This process consists of generating a ZK-proof or a digitally-signed message that proves that the identity is authorized to perform the state transition. Then the State contract verifies the proof on-chain via its transitState (for ZK-proofs) or transitStateGeneric (generic, as the name suggests) function.

:::info

Learn more about state contract [here](https://docs.iden3.io/contracts/state/).

:::

<Tabs>
<TabItem value="Polygon Amoy">

```bash
ISSUER_ETHEREUM_CONTRACT_ADDRESS=0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124
ISSUER_ETHEREUM_RESOLVER_PREFIX=polygon:amoy
ISSUER_ETHEREUM_URL={Replace with a Polygon Amoy RPC}
```

</TabItem>

<TabItem value="Polygon Main">

```bash
ISSUER_ETHEREUM_CONTRACT_ADDRESS=0x624ce98D2d27b20b8f8d521723Df8fC4db71D79D
ISSUER_ETHEREUM_RESOLVER_PREFIX=polygon:main
ISSUER_ETHEREUM_URL={Replace with a Polygon Main RPC}
```

</TabItem>
</Tabs>

## Issuer's DID

Currently there are two options for creating an issuer's DID:

1. Using a **Makefile** command, generally used for the **UI** or **API-UI**.
2. Create Identity **endpoint** of Core API, generally used for the **Core API**.

### Makefile Command

:::note
The DID configured for the UI or API-UI works under the following rules:

1. if a DID is provided in the .env-api file, it will be checked for its existence in the vault. In case it is different from the one in the vault, the latter will be updated.
2. If a DID is not provided in the file, it will be searched in the vault.
3. When a DID is created with this method, it is saved both in the .env-api file and in the vault.
   :::

.env-api

<Tabs>
<TabItem value="Polygon Amoy">

```bash
ISSUER_API_IDENTITY_BLOCKCHAIN=polygon
ISSUER_API_IDENTITY_NETWORK=amoy
ISSUER_API_IDENTITY_METHOD={polygonid | custom method}
```

</TabItem>


<TabItem value="Polygon Main">

```bash
ISSUER_API_IDENTITY_BLOCKCHAIN=polygon
ISSUER_API_IDENTITY_NETWORK=main
ISSUER_API_IDENTITY_METHOD={polygonid | custom method}
```

</TabItem>

<TabItem value="Polygon Mumbai*">

```bash
ISSUER_API_IDENTITY_BLOCKCHAIN=polygon
ISSUER_API_IDENTITY_NETWORK=mumbai
ISSUER_API_IDENTITY_METHOD={polygonid | custom method}
```

</TabItem>
</Tabs>

Execute the following `make command` in order to generate a new DID with the .env-api provided `blockchain` ,`network` and `method`.
The given command will perform the following actions:

1. Replace **ISSUER_API_UI_ISSUER_DID** value with the new DID(.env-api file).
2. Write the new DID in the vault.

```bash
make generate-issuer-did
```

In order to delete the DID from the Vault:

```bash
make delete-did
```

### Core API

The Core API provides the `/v1/identities` endpoint in order to create an identity.

The property _type_ can have two possible values:

- `BJJ`: BJJ keys based identity.
- `ETH`: Ethereum based identity.

Create Identity Payload example:
<Tabs>
<TabItem value="Polygon Amoy">

```json
{
  "didMetadata": {
    "method": "polygonid",
    "blockchain": "polygon",
    "network": "amoy",
    "type": "BJJ"
  }
}
```

</TabItem>


<TabItem value="Polygon Main">

```json
{
  "didMetadata": {
    "method": "polygonid",
    "blockchain": "polygon",
    "network": "main",
    "type": "BJJ"
  }
}
```

</TabItem>


<TabItem value="Polygon Mumbai*">

```json
{
  "didMetadata": {
    "method": "polygonid",
    "blockchain": "polygon",
    "network": "mumbai",
    "type": "BJJ"
  }
}
```

</TabItem>
</Tabs>
