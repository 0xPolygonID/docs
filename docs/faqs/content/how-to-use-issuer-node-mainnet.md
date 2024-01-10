---
id: faq-how-to-use-issuer-node-mainnet
title: How to use Issuer Node in mainnet
sidebar_label: FAQs
description: How to use the Issuer Node in mainnet mode.
keywords: 
  - docs
  - polygon id
  - faqs
  - issuer
  - questions
  - mainnet
---

## Title
How to use the Issuer Node in mainnet mode.

## Description
The Issuer Node can work in EVM compatible networks both in testing and mainnet environments. In case it's deployed in Polygon/Mumbai networks, contracts are already available. If you prefer to use other blockchains, you will have to deploy the contracts yourself.

## Correct answer
In order to use the Issuer Node in mainnet mode, you will need to set the following environment variables in the .env-issuer file:

.env-issuer
```bash
ISSUER_API_IDENTITY_NETWORK=main
ISSUER_ETHEREUM_CONTRACT_ADDRESS=0x624ce98D2d27b20b8f8d521723Df8fC4db71D79D
ISSUER_ETHEREUM_RESOLVER_PREFIX=polygon:main
ISSUER_ETHEREUM_URL={Replace with a Polygon Main RPC}
```

Once the environment variables are set, you will need to create the issuer did with the following command:
```bash
make generate-issuer-did
```

Restart the node and it will be ready to use in mainnet.

For further configurations, please check the [Issuer Node Configuration](../../../docs/issuer/issuer-configuration.md) section.

## Wrong answer
Issuer Node can work simultaneously in different networks without changing the configuration.