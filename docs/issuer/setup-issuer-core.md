---
id: setup-issuer-core
title: Set up Issuer Node API
sidebar_label: Setup Guide
description: Learn how to set up an Issuer API.
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

This article details the steps to set up your own Issuer Node API.

:::caution

Issuer Node v3 is now available, bringing enhanced features and optimizations. If you are using the previous version of Issuer Node (v2), we recommend upgrading to the latest version as soon as possible. To ensure a smooth transition, please follow the migration guide provided [<ins> here </ins>](issuer-migration-guide).

Below is the installation guide for Issuer Node v3.

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

### Issuer Node API Setup (basic configuration building docker images)

Before you start, ensure the `resolvers_setting_sample.yaml` in the root directory. For information on configuration, see [Setting up networks and chains](issuer-configuration.md#Advanced-Issuer-Node-configuration) in Advanced Configuration guide.

Follow these steps to get started:

1. Configure Environment File:

  Copy the sample configuration file:

```bash
cp .env-issuer.sample .env-issuer
cp .env-ui.sample .env-ui
```

2. Set Environment Variables

  Fill in the `.env-issuer` config file to match your environment, especially the ISSUER_SERVER_URL and any other relevant variables. 

  _.env-issuer_

  ```bash
  ISSUER_SERVER_URL=<PUBLIC_SERVER_API_URL>
  ```

3. Key Management System (KMS) Setup

  Please Look at the [KMS configuration](https://github.com/0xPolygonID/issuer-node/blob/main/.env-issuer.sample#L21) in the sample file and file your .env-issuer config file accordingly.

  The Issuer Node allows you to choose between two key management systems for managing private keys: local storage (default) or [Vault](https://www.vaultproject.io/). It is recommended to use Vault for production environments for enhanced security.

  - Local Storage:
    - If you opt for local storage, set the following in your .env-issuer file:

    ```bash
    ISSUER_KMS_BJJ_PROVIDER=localstorage
    ISSUER_KMS_ETH_PROVIDER=localstorage
    ```

    - Specify the path for local storage:

    ```bash
    ISSUER_KMS_PROVIDER_LOCAL_STORAGE_FILE_PATH=./localstoragekeys
    ```
  
  - Vault:
    - For Vault configuration, ensure that you set the Vault address, plugin, and authentication method properly:

    ```bash
    ISSUER_KMS_BJJ_PROVIDER=vault
    ISSUER_KMS_ETH_PROVIDER=vault
    ISSUER_KEY_STORE_ADDRESS=http://vault:8200
    ISSUER_KEY_STORE_PLUGIN_IDEN3_MOUNT_PATH=iden3
    ```

    - Optionally, configure authentication and TLS if necessary:

    ```bash
    ISSUER_VAULT_USERPASS_AUTH_ENABLED=true
    ISSUER_VAULT_USERPASS_AUTH_PASSWORD=<your_password>
    ISSUER_VAULT_TLS_ENABLED=false  # Set to true if TLS is needed
    ISSUER_VAULT_TLS_CERT_PATH=<path_to_certificate>
    ```



3. Import Ethereum Private Key

  Import your Ethereum private key into the KMS provider you have configured. The associated account must be funded for state transitions. For Amoy network you can request some testing Matic [here](https://www.alchemy.com/faucets/polygon-amoy).

  ```bash
  make private_key=<YOUR_WALLET_PRIVATE_KEY> import-private-key-to-kms
  ```

4. Start the Issuer Node API

  Build and run the Issuer Node API:
  ```bash
  make up && make build-api && make run-api
  ```

**Issuer Node API specification **

 The Issuer Node API will be accessible at:
 >http://localhost:3001 or http://<PUBLIC_SERVER_API_URL>:3001




---

### Related guides:

[How to Set Up Issuer Node UI Guide](setup-issuer-ui.md)

[Migrating from Issuer Node v2 to v3 Guide](issuer-migration-guide)



[Advanced Issuer Node Configuration](issuer-configuration.md)

[Quick Start Demo](../quick-start-demo.md)
