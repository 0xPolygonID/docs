---
id: setup-issuer-core
title: Set up Issuer Node Core API
sidebar_label: Setup Guide
description: Learn how to set up an Issuer Core API.
keywords:
  - docs
  - polygon id
  - issuer node
  - claim
  - verifiable credentials
  - core
  - API
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This article details the steps to set up your own Issuer Node Core API.

:::caution

The content of the QR code provided by the Issuer or Verifier has changed since the <ins>[release 2.3.0 of the Issuer node](https://github.com/0xPolygonID/issuer-node/releases/tag/v2.3.0)</ins>. Instead of sending the JSON information through the QR code, now we provide an embedded link to a page where this JSON is hosted, which improves the application performance. Please check the <ins>[IDEN3MESSAGE_PARSER.md](https://github.com/0xPolygonID/polygonid-flutter-sdk/blob/main/IDEN3MESSAGE_PARSER.md)</ins> file for more information on how to parse the new QR code content.

:::

## Installation

For an advance configuration of the Issuer Node (RHS, Ethereum Identities and more), visit the [Advanced Issuer Node configuration](issuer-configuration.md#Advanced-Issuer-Node-configuration) guide.

There are two options for installing and running the server alongside the UI:

1. [Docker Setup Guide](https://github.com/0xPolygonID/issuer-node)
2. [Standalone Mode Guide](#standalone-mode-guide)

:::note
We encourage the use of **Standalone** for production environments.
:::

**For either one, you first have to [clone the repository](https://github.com/0xPolygonID/issuer-node).**

## Standalone Mode Guide

### Standalone Mode Guide Requirements

- [Docker Engine](https://docs.docker.com/engine/) 1.27
- Makefile toolchain
- Unix-based operating system (e.g. Debian, Arch, Mac OS X)
- [Go](https://go.dev/) version 1.19 or higher
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Hashicorp Vault](https://github.com/hashicorp/vault)

### Standalone Mode Setup

1. Env files configuration:

   1.1. Copy the config sample files

```bash
cp .env-issuer.sample .env-issuer
cp .env-api.sample .env-api
```

1.2. Fill the .env-issuer config file with the proper variables

:::info
For **advanced** Issuer Node **configurations**, visit the [**Advanced Issuer Node configuration**](issuer-configuration.md#Advanced-Issuer-Node-configuration) guide.
:::

_.env-issuer_

```bash
ISSUER_ETHEREUM_URL=<YOUR_RPC_PROVIDER_URI_ENDPOINT>
ISSUER_DATABASE_URL=<YOUR_POSTGRESQL_DB_INSTANCE>
ISSUER_REDIS_URL=<YOUR_REDIS_INSTANCE>
ISSUER_KEY_STORE_ADDRESS=<YOUR_VAULT_INSTANCE>
ISSUER_SERVER_URL=<PUBLICLY_ACCESSIBLE_URL_POINTING_TO_ISSUER_SERVER_PORT>
```

1.3. Enable vault authentication

```bash
make add-vault-token
```

1.4. Write the private key in the vault. This step is needed in order to be able to transit the issuer's state. To perform that action the given account has to be funded. For Mumbai network you can request some testing Matic [here](https://mumbaifaucet.com/).

```bash
make private_key=<YOUR_WALLET_PRIVATE_KEY> add-private-key
```

2. Run `make build-local`. This will generate a binary for each of the following commands:
   - `platform`
   - `platform_ui`
   - `migrate`
   - `pending_publisher`
   - `notifications`
3. Run `make db/migrate`. This command checks the database structure and applies the necessary changes to the database schema.
4. Run `./bin/platform` command to start the issuer.
5. Run `./bin/pending_publisher`. This checks that publishing transactions to the blockchain works.
6. _(Optional)_ Run `./bin/notifications`. This enables push notifications when issuing credentials to PID Wallet.

> **Core API specification** - [http://localhost:3001/](http://localhost:3001/)

---

### Related guides:

[How to Set Up Issuer Node UI Guide](setup-issuer-ui.md)

[Advanced Issuer Node Configuration](issuer-configuration.md)

[Quick Start Demo](../quick-start-demo.md)
