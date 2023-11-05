---
id: features
title: Features
sidebar_label: Features
description: Issuer main features.
keywords: 
  - docs
  - polygon id
  - issuer node
  - claim
  - verifiable credentials
  - features
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## DID with Ethereum address
Currently available only on the [Issuer Node Core API](/docs/issuer/issuer-core.md), this feature enables the creation of Ethereum-controlled identities.  Ethereum accounts are used here to authenticate, prove statements and control identity.
The representation of the DID for this case follows the same canonical form, where the identifier `2qCU58EJgrELSJT6EzT27Rw9DhvwamAdbMLpePztYq` actually originates from the Ethereum address: 

```
did:polygonid:polygon:mumbai:2qCU58EJgrELSJT6EzT27Rw9DhvwamAdbMLpePztYq
```

:::note

Due to its public nature, the Ethereum Polygon DID doesn't support private profiles.

:::

## Revocation Status
Mobile applications can get the Revocation Status of a particular credential by requesting that information straight from the Issuer Node. However, if the Issuer Node is offline for some reason, that communication would not work. The Revocation Hash Service and The On-chain Revocation Status are two solutions for this issue. 

<div align="center">
<img src= {useBaseUrl("img/without-rhs.png")} align="center" />
</div>

### Revocation Hash Service
The Revocation Hash Service (RHS) stores all the revocation information online which can be accessed by mobile applications and verifiers. In this scenario, the communication between mobile and Revocation Hash service replaces the link between the application and the Issuer Node:

<div align="center">
<img src= {useBaseUrl("img/rhs.png")} align="center" />
</div>

As the diagram shows, the Issuer Node sends the revocation information to the RHS. The service, then, is able to return the credential status to the application.

### On-chain Revocation
On-chain Revocation status leverages the blockchain decentralized storage to make the revocation information permanent on the network. That means that, even if the Issuer Node or the Revocation Hash Service is down, the data is still available on-chain.

<div align="center">
<img src= {useBaseUrl("img/blockchain.png")} align="center" />
</div>

