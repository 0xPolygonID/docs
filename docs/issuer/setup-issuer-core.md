---
id: setup-issuer-core
title: Set up Issuer Node API
sidebar_label: Setup Guide
description: Learn how to set up an Issuer Core API.
keywords:
  - docs
  - privado id
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

**You have to first [clone the repository](https://github.com/0xPolygonID/issuer-node).**

## Docker Mode Guide

### Requirements

- [Docker Engine](https://docs.docker.com/engine/) 1.27
- Makefile toolchain
- Unix-based operating system (e.g. Debian, Arch, Mac OS X)
- [Go](https://go.dev/) version 1.19 or higher

### Issuer Node API Setup (Basic Configuration)

First, make sure you have `resolvers_setting_sample.yaml` in the root directory. Take a look at [Advanced Issuer Node configuration](issuer-configuration.md#Advanced-Issuer-Node-configuration)

1. Env files configuration. Copy the config sample file:

```bash
cp .env-issuer.sample .env-issuer
```

2. Fill the .env-issuer config file with the proper variables

_.env-issuer_

```bash
ISSUER_SERVER_URL=<PUBLIC_SERVER_API_URL>
```

3. Write the private key in the localstorage. This step is needed in order to be able to transit the issuer's state. To perform that action the given account has to be funded. For Amoy network you can request some testing Matic [here](https://www.alchemy.com/faucets/polygon-amoy).

```bash
make private_key=<YOUR_WALLET_PRIVATE_KEY> import-private-key-to-kms
```

4. Run the Issuer Node API:

```bash
make build && make run
```

 **Issuer Node API specification :**
 >http://localhost:3001 or http://<PUBLIC_SERVER_API_URL>:3001


### Issuer Node API Setup (Vault Configuration)
Instead of using localstorage as a key repository (which is not recommended for production environments) you can configure 
the issuer node to use [Vault](https://www.vaultproject.io/). To do this you need to change only two variables in 
the `.env-issuer` configuration file:

```shell
ISSUER_KMS_BJJ_PROVIDER=vault
ISSUER_KMS_ETH_PROVIDER=vault
```
if you were running the node issuer make sure to run it first `make stop` and then follow the steps 3 and 4.

---

### Related guides:

[How to Set Up Issuer Node UI Guide](setup-issuer-ui.md)

[Advanced Issuer Node Configuration](issuer-configuration.md)

[Quick Start Demo](../quick-start-demo.md)
