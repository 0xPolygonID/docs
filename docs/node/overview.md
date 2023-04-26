---
id: overview
title: Issuer Node Overview
sidebar_label: Overview
description: Issuer Node is a self-hosted Node that any implementer can quickly set up and integrate into their application.
keywords: 
  - docs
  - polygon id
  - holder
  - issuer
  - node
---

The [Issuer Node](https://github.com/0xPolygonID/sh-id-platform) is a self-hosted Node that any implementer can quickly set up and integrate into their application. Once the setup is completed, the Issuer Node exposes all the functionalities necessary to run an issuer such as:
 
- Create, manage, and revoke an identity
- Issue credentials to an identity
- Share credentials with the user's wallet using QR Code
- Publish [Identity States](https://docs.iden3.io/getting-started/identity/identity-state/) on-chain 
- Revoke credentials 

The Issuer Node can generate multiple identities for multiple Issuers and manages the states of these identities by updating the state stored on-chain.
 
The Issuer Node provides API endpoints for the integrator's applications.
 
## Components

The [Issuer Node](https://github.com/0xPolygonID/sh-id-platform) comprises the following components and each one of these components can be either dockerized or each one of these can be launched as separate service.

- **Issuer Application** to issue Verifiable Credentials and communicate with users' wallets.

- **Vault**: Based on [HashiCorp](https://www.hashicorp.com/), the Vault is used in the Issuer Node for providing key management services. It helps to secure sensitive data, such as the private key of the issuer, thus protecting them in a secure way. The Vault has been provided with a plugin called `vault-plugin-secrets-iden3`; this plugin is used to sign the data with <a href="https://docs.iden3.io/getting-started/babyjubjub/" target="_blank">Baby Jubjub Keys</a> that are stored in the Vault. 
 
- **Redis**: [Redis](https://redis.io/) is used for caching the schemas that we use in the Issuer Node. The schemas are downloaded from IPFS and stored on Redis. This way, every time, the Issuer Node issues a Credential, it doesn't need to fetch the schemas from an external source; it can fetch it directly from Redis. This boosts the performance of the application. 
 
- **DB**: This container is used as the data source for the Issuer Node. In our implementation of the Issuer Node, we have used Postgres as the database. It is where all the data related to issued credentials are stored. 
    
![](/img/issuer-node-components.png)

:::note 

In a testing environment, you can run the Vault, Redis, and Postgres services inside a docker. But for production, you are advised to secure these services first before using them.

:::

## Issuer Node API

The Issuer Node APIs provide a user with the following functionalities: 

- Create and retrieve Identities
- Create a Verifiable Credential (VC)
- Retrieve a Verifiable Credential or a list of Verifiable Credentials
- Generate JSON to create a QR Code and use that to accept credentials in wallet
- Revoke a Verifiable Credential
- Retrieve the Revocation Status of a Verifiable Credential
- Call Agent Endpoint using the Wallet App
 
These APIs can be tested locally on a [Self Hosted Platform](https://self-hosted-platform.polygonid.me/#overview) or with our [Postman Collection](https://www.postman.com/dark-star-200015/workspace/public/collection/23322631-727c2573-3d62-4d58-9d46-0f479144d75d?action=share&creator=23322631). 

:::note

Please note that the API endpoints listed in the testing links above need to be called in sequential order. For example, you need to first create an identity before a Verifiable Credential can be issued by the Issuer Node.

:::

## Core Library

- [Issuer Node](https://github.com/0xPolygonID/sh-id-platform)
 
## Support Libraries
 
- [Go Iden3 Core](https://github.com/iden3/go-iden3-core): Golang implementation of iden3 core functionality.

- [Go Iden3 Crypto](https://github.com/iden3/go-iden3-crypto]): Golang implementation of important cryptographic elements including baby jubjub key, Keccak256, and Poseidon.

- [Go Merkle Tree SQL](https://github.com/iden3/go-merkletree-sql): Golang implementation of Merkle tree based on the library of circuit templates.
