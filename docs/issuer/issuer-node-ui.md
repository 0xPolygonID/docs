---
id: issuer-node-ui
title: Issuer Node UI
sidebar_label: Overview
description: Issuer Node UI description and its components.
keywords: 
  - docs
  - polygon id
  - issuer node
  - claim
  - verifiable credentials
  - UI
  - API
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Issuer Node UI
The Issuer Node UI provides the full experience of having an Issuer Node with all its capabilities. Although it offers only a single identity, it also presents a few extra features, such as establishing connections and importing schemas. It comes in an API format but there is also the possibility of generating a full-fledged user interface. 

Issuer Node API UI with Managing Schemas, Credentials and other functionalities:

<div align="center">
<img src= {useBaseUrl("img/3002.png")} align="center" />
</div>

Issuer Node User Interface with a more visual experience:

<div align="center">
<img src= {useBaseUrl("img/8088.png")} align="center" />
</div>

## Issuer Node Components

The [Issuer Node](https://github.com/0xPolygonID/issuer-node) comprises the following components and each one of these components can be either dockerized or launched as a separate service. 

- **Issuer Application** to issue Verifiable Credentials and communicate with users' wallets.

- **Vault**: Based on [HashiCorp](https://www.hashicorp.com/), the Vault is used in the Issuer Node for providing key management services. It is utilized to protect the user sensitive data by securing their private key. The Vault has been provided with a plugin called `vault-plugin-secrets-iden3`; this plugin is used to sign the data with <a href="https://docs.iden3.io/getting-started/babyjubjub/" target="_blank">Baby Jubjub Keys</a> that are stored in the Vault. 
 
- **Redis**: [Redis](https://redis.io/) is used for caching the schemas that we use in the Issuer Node. The schemas are downloaded from IPFS and stored on Redis. This way, every time the Issuer Node issues a credential, it doesn't need to fetch the schemas from an external source; it can fetch it directly from Redis. This boosts the performance of the application. 
 
- **DB**: This container is used as the data source for the Issuer Node. In our implementation of the Issuer Node, we have used Postgres as the database. It is where all the data related to issued credentials are stored. 

:::note

In a testing environment, you can run the Vault, Redis, and Postgres services inside a docker. For production environments, you are advised to secure these services first before using them. 

:::

<div align="center">
<img src= {useBaseUrl("img/ui-infra.png")} align="center" />
</div>
Issuer Node UI API architecture.