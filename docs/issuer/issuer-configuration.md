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
\*Polygon Mumbai testnet has been deprecated
:::

## Understanding Revocation Status

The revocation status is a core part of the credential, as it is the verifier's way of checking whether or not a credential has been revoked by the issuer. The Issuer Node offers three different ways to check the revocation status of a credential:

- `Centralized`: The verifier or user will check the credential revocation status through the Issuer Node itself, which is why we consider it to be a centralized method. If the node is not available, the verification will fail, resulting in possible errors when trying to generate ZK Proofs.

- `RHS Off Chain`: In this case, the credential revocation will be checked in a server independent from the Issuer Node (managed by the Issuer or an independent agent), so that we no longer depend on the Issuer Node as the only point of failure. This service will be a fallback in case the RHS is not available.

- `RHS On Chain`: This method can be considered as completely decentralized since the RHS is on chain, therefore the user or verifier will check the status of a credential via this decentralized on chain service without depending on a centralized server. This is the **desirable option**.

## Setting up networks and chains
The first step in setting up the issuer node is to define the networks it will support and for which it will be able to issue credentials.
The github repository provides an example file called `resolvers_setting_sample.yaml` this file can be used as a reference to configure the issuer node networks.
You must create a file called resolvers_settings.yaml which must be in the root directory.

Let's see an example of how to configure the issuer node for the Polygon amoy network.
```yaml
polygon:
  amoy:
    contractAddress: 0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124 # State contract address
    networkURL: https://polygon-mumbai.g.alchemy.com/v2/x # Polygon amoy RPC
    defaultGasLimit: 600000
    confirmationTimeout: 10s
    confirmationBlockCount: 5
    receiptTimeout: 600s
    minGasPrice: 0
    maxGasPrice: 1000000
    rpcResponseTimeout: 5s
    waitReceiptCycleTime: 30s
    waitBlockCycleTime: 30s
    gasLess: true
    rhsSettings:
      mode: None # None, OffChain, OnChain, All
      contractAddress: 0x16A1ae4c460C0a42f0a87e69c526c61599B28BC9 # RHS contract address
      rhsUrl: https://rhs-staging.polygonid.me # RHS URL (setup this if you are using OffChain or All mode)
      chainID: 80002 # Polygon amoy chain ID
      publishingKey: pbkey # Publishing key path. Left this value as this.
```
Notes about **rhsSettings** mode:
Types:
* Iden3commRevocationStatusV1.0: Centralized mode
* Iden3ReverseSparseMerkleTreeProof: RHS Off Chain mode
* Iden3OnchainSparseMerkleTreeProof2023: RHS On Chain mode

then:

* None - allow only `Iden3commRevocationStatusV1.0` credential status type.
* OffChain - allow `Iden3commRevocationStatusV1.0` and `Iden3ReverseSparseMerkleTreeProof` credential status type
* OnChain - `Iden3commRevocationStatusV1.0` and `Iden3OnchainSparseMerkleTreeProof2023` credential status type
* All - All the statuses.






**UI**:



## State Contract

The State Contract stores the Global Identity State Tree. The GIST State represents a snapshot of the states of all the identities operating in the system. The design of the State Contract allows identities to authenticate themselves using Identity Profiles.

Every time that an identity is updated, for example when a credential is issued using SMT Proof or revoked, it needs to perform a State Transition. This process consists of generating a ZK-proof or a digitally-signed message that proves that the identity is authorized to perform the state transition. Then the State contract verifies the proof on-chain via its transitState (for ZK-proofs) or transitStateGeneric (generic, as the name suggests) function.

:::info

Learn more about state contract [here](https://docs.iden3.io/contracts/state/).

:::

<Tabs>
<TabItem value="Polygon Amoy">

```yaml
polygon:
  amoy:
    contractAddress: 0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124
```
</TabItem>

<TabItem value="Polygon Main">

```yaml
polygon:
  main:
    contractAddress: 0x624ce98D2d27b20b8f8d521723Df8fC4db71D79D
```
</TabItem>
</Tabs>

