---
id: faq-how-to-use-issuer-node-on-mainnet
title: Using Issuer Node on Mainnet
sidebar_label: Using Issuer Node on Mainnet
description: Guide on configuring and using the Issuer Node in a mainnet environment.
keywords:
  - faq
  - issuer-node
  - how-to
  - mainnet
---

## Question

How can I configure and use the Issuer Node on the mainnet?

## Answer

The Issuer Node is designed to operate on EVM-compatible networks, supporting both testnets and mainnet environments. It comes pre-configured for use on the Polygon/Mumbai networks, with contracts readily available for those networks. For deployment on other blockchains, you will need to manually deploy the necessary contracts.

To configure the Issuer Node for mainnet operation, adjust the following environment variables within your `.env-issuer` file:

```bash
ISSUER_API_IDENTITY_NETWORK=main
ISSUER_ETHEREUM_CONTRACT_ADDRESS=0x624ce98D2d27b20b8f8d521723Df8fC4db71D79D
ISSUER_ETHEREUM_RESOLVER_PREFIX=polygon:main
ISSUER_ETHEREUM_URL={Your Polygon Mainnet RPC URL}
```

After configuring the `.env-issuer` file, generate a new issuer DID for the mainnet environment with the command:

```bash
make generate-issuer-did
```

Restart your node following this setup to commence operations on the mainnet.

For additional configuration details, refer to the [Issuer Node Configuration](../../../docs/issuer/issuer-configuration.md) documentation.

<div className="hidden">
Wrong answer:

Issuer Node can work simultaneously in different networks without changing the configuration.

</div>
