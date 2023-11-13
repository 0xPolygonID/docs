---
id: setup-issuer-core
title: Set up an Issuer Core API 
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

This article details the steps to achieve full integration of the Issuer Node with the Polygon ID APIs.

:::caution

The content of the QR code provided by the Issuer or Verifier has changed since the <ins>[release 2.3.0 of the Issuer node](https://github.com/0xPolygonID/issuer-node/releases/tag/v2.3.0)</ins>. Instead of sending the JSON information through the QR code, now we provide an embedded link to a page where this JSON is hosted, which improves the application performance.  Please check the <ins>[IDEN3MESSAGE_PARSER.md](https://github.com/0xPolygonID/polygonid-flutter-sdk/blob/fix/rev-status/IDEN3MESSAGE_PARSER.md)</ins> file for more information on how to parse the new QR code content.

:::

## Installation

There are two options for installing and running the server alongside the UI:

1. [Docker Setup Guide](#docker-setup-guide)
2. [Standalone Mode Guide](#standalone-mode-guide)

**For either one, you first have to [clone the repository](https://github.com/0xPolygonID/issuer-node).**

:::note
You can follow the instructions below or watch this video showing the same steps to set up an issuer node.
    
<iframe src="https://www.youtube.com/embed/ASHuaXgfDPg" width="100%" length="100%" height="500" allowfullscreen></iframe>

:::

### Docker Setup Guide

Running the app with Docker allows for minimal installation and a quick setup, as we have already set the infrastructure configuration (database, cache and vault storage). This is recommended **for evaluation use-cases only**, such as local development builds.

#### Docker Guide Requirements

- Unix-based operating system (e.g. Debian, Arch, Mac OS)
- [Docker Engine](https://docs.docker.com/engine/) `1.27+`
- Makefile toolchain `GNU Make 3.81`

:::warning

There is no compatibility with Windows environments at this time.

:::

To help expedite a lot of the Docker commands, many have been abstracted using `make` commands. Included in the following sections are the equivalent Docker commands that show what is being run.

#### Create Docker Configuration Files

Make sure you are in the root folder and then make a copy of the `.env-api.sample`, `.env-issuer.sample`, `.env-ui.sample` environment variables files:

```bash
# FROM: ./

cp .env-api.sample .env-api;
cp .env-issuer.sample .env-issuer;
# (Optional - For issuer UI)
cp .env-ui.sample .env-ui;
```

`.env-issuer` is used to configure the api-issuer. It contains the needed configuration to start the node such as the infrastructure configuration (postgres/redis/vault), the blockchain variables in to be able to publish the state, the basic auth variables and other variables.

`.env-api` is used to configure the api-ui. This file allows the user to configure the basic auth of the api-ui, the serverURL and others.

`.env-ui` is used to configure the UI with the user/password UI protection and the block explorer that will be used, among other variables.

#### Node Issuer Configuration

The `.env-issuer` will be loaded into the [Docker compose initializer](https://github.com/0xPolygonID/issuer-node/blob/develop/infrastructure/local/docker-compose.yml).

This configuration involves 2 procedures: acquiring a blockchain URL by an RPC provider and setting up a public URL.

##### Acquiring a blockchain URL by an RPC provider  

Any of the following RPC providers can be used:

- [Chainstack](https://chainstack.com/)
- [Ankr](https://ankr.com/)
- [QuickNode](https://quicknode.com/)
- [Alchemy](https://www.alchemy.com/)
- [Infura](https://www.infura.io/)

:::note "Mainnet or Testnet?"

Using Mainnet or Testnet will depend on the RPC URL you are going to use in this step. After you decide which of the RPC providers you will be using, like any of the examples above, you will need to copy the URL for the network you are willing to use.

:::

##### Setting up a public URL

It is desired to run a public forwarding URL,  pointing to a host, as it is going to be stored inside the credential. Localhost can't be used in this situation because the mobile app can't access it. 

:::note  "Getting a free Public URL"

For testing purposes, you can use a public URL. A way to set this up is by using [<ins>ngrok</ins>](https://ngrok.com) as a forwarding service that maps to a local port.
After downloading and installing ngrok, run the following command and copy the **Forwarding** URL:

```bash
# For issuer-api-ui ISSUER_API_UI_SERVER_URL env var (.env-api file)
./ngrok http 3002; 
```

Copy the **Forwarding** output value and paste it onto the `.env-issuer` file.

```bash
# FROM: /path/to/ngrok binary

# Expected Output:
# Add OAuth and webhook security to your ngrok (its free!): https://ngrok.com/free
# 
# Session Status                online
# Account                       YourAccountUsername (Plan: Free)
# Update                        update available (version 3.2.1, Ctrl-U to update)
# Version                       3.1.0
# Region                        Europe (eu)
# Latency                       -
# Web Interface                 http://127.0.0.1:4040
# Forwarding                    https://unique-forwading-address.eu.ngrok.io -> http://localhost:3001
# 
# Connections                   ttl     opn     rt1     rt5     p50     p90
                            # 0       0       0.00    0.00    0.00    0.00
```

:::

Having the blockchain URL and a public URL, you can now add them respectively to the ISSUER_ETHEREUM_URL variable and ISSUER_SERVER_URL variable in the  `.env-issuer` file.

Configure `.env-issuer` with the following details (or amend as desired).

```bash
# ...

# See Section: Getting A Public URL
ISSUER_SERVER_URL=<https://unique-forwaring-or-public-url.ngrok-free.app>
# Defaults for Basic Auth in Base64 ("user-issuer:password-issuer" = "dXNlci1pc3N1ZXI6cGFzc3dvcmQtaXNzdWVy")
# If you just want to get started, don't change these
ISSUER_API_AUTH_USER=user-issuer
ISSUER_API_AUTH_PASSWORD=password-issuer
# !!!MUST BE SET or other steps will not work
ISSUER_ETHEREUM_URL=<YOUR_RPC_PROVIDER_URI_ENDPOINT>
```

:::note
In case the Vault was loaded multiple times and a fresh start is needed, the following will remove remnant data:

```bash
# FROM: ./

make clean-vault;
# (Equivalent)
#   rm -R infrastructure/local/.vault/data/init.out
#   rm -R infrastructure/local/.vault/file/core/
#   rm -R infrastructure/local/.vault/file/logical/
#   rm -R infrastructure/local/.vault/file/sys/

# Expected Output/Prompt:
#   rm -R infrastructure/local/.vault/data/init.out
#   rm -R infrastructure/local/.vault/file/core/
#   rm -R infrastructure/local/.vault/file/logical/
#   rm -R infrastructure/local/.vault/file/sys/
```

:::

#### Start Redis, Postgres & Vault

This will start the necessary local services needed to store the wallet private key to the Hashicorp vault and allow storing data associated to the issuer. Don't forget to initialize Docker before running this command.

```bash
# FROM: ./

make up;
# (Equivalent)
#   docker compose -p issuer -f ./infrastructure/local/docker-compose-infra.yml up -d redis postgres vault;

# Expected Output:
#   docker compose -p issuer -f /Users/username/path/to/sh-id-platform/infrastructure/local/docker-compose-infra.yml up-d redis postgres vault
#   [+] Running 4/4
#   ⠿ Network issuer-network      Created                                                                                   0.0s
#   ⠿ Container issuer-vault-1    Started                                                                                   0.5s
#   ⠿ Container issuer-redis-1    Started                                                                                   0.4s
#   ⠿ Container issuer-postgres-1  Started  
```

To remove all services, run the following (ignore the warnings):

```bash
# FROM: ./

make down; 
# (Equivalent)
#   docker compose -p issuer -f ./infrastructure/local/docker-compose-infra.yml down --remove-orphans -v;

# Expected Output:
#   docker compose -p issuer -f /Users/username/path/to/sh-id-platform/infrastructure/local/docker-compose-infra.ymldown --remove-orphans
#   [+] Running 4/3
#   ⠿ Container issuer-postgres-1 Removed                                                                                   0.2s
#   ⠿ Container issuer-redis-1    Removed                                                                                   0.2s
#   ⠿ Container issuer-vault-1    Removed                                                                                   0.2s
#   ⠿ Network issuer-network      Removed                                                                                   0.0s
#   docker compose -p issuer -f /Users/username/path/to/sh-id-platform/infrastructure/local/docker-compose.yml down--remove-orphans
#   WARN[0000] The "DOCKER_FILE" variable is not set. Defaulting to a blank string. 
#   WARN[0000] The "DOCKER_FILE" variable is not set. Defaulting to a blank string. 
#   WARN[0000] The "DOCKER_FILE" variable is not set. Defaulting to a blank string. 
#   WARN[0000] The "DOCKER_FILE" variable is not set. Defaulting to a blank string.
```

#### Import Wallet Private Key To Vault

In order to secure the wallet private key so that the issuer can use it to issue credentials, it must be stored in the Hashicorp Vault.

:::note

Make sure the wallet that is provided has Testnet Matic to be able to send transactions and that you are providing the Private Key. Here's how you can [<ins>extract the private key from MetaMask</ins>](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key#:~:text=On%20the%20account%20page%2C%20click,click%20%E2%80%9CConfirm%E2%80%9D%20to%20proceed.), for instance.

:::

```bash
# FROM: ./

# Make sure to verify that the issuer-vault-1 is full initialized to avoid: "Error writing data to iden3/import/pbkey:Error making API request."
make private_key=<YOUR_WALLET_PRIVATE_KEY> add-private-key;
# (Equivalent)
#   docker exec issuer-vault-1 vault write iden3/import/pbkey key_type=ethereum private_key=<YOUR_WALLET_PRIVATE_KEY>;

# Expected Output:
#   docker exec issuer-vault-1 \
#           vault write iden3/import/pbkey key_type=ethereum private_key=<YOUR_WALLET_PRIVATE_KEY>
#   Success! Data written to: iden3/import/pbkey
```

#### Add Vault Token to Configuration File

This will get the vault token from the Hashicorp vault docker instance and add it to our `./env-issuer` file.

```bash
# FROM: ./

make add-vault-token;
# (Equivalent)
#   TOKEN=$(docker logs issuer-vault-1 2>&1 | grep " .hvs" | awk  '{print $2}' | tail -1);
# sed '/ISSUER_KEY_STORE_TOKEN/d' .env-issuer > .env-issuer.tmp;
# echo ISSUER_KEY_STORE_TOKEN=$TOKEN >> .env-issuer.tmp;
# mv .env-issuer.tmp .env-issuer;

# Expected Output:
#   sed '/ISSUER_KEY_STORE_TOKEN/d' .env-issuer > .env-issuer.tmp
#   mv .env-issuer.tmp .env-issuer
```

#### Start Issuer API

Now that the issuer API is configured, it can be started.

<Tabs>
<TabItem value="NON-Apple-M1/M2/Arm (ex: Intel/AMD)">

```bash
# FROM: ./

make run;
# (Equivalent)
#   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile" docker compose -p issuer -f /Users/username/path/tsh-id-platform/infrastructure/local/docker-compose.yml up -d api;

# Expected Output:
#   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile" docker compose -p issuer -f /Users/username/path/tsh-id-platform/local/docker-compose.yml up -d api;
```

</TabItem>

<TabItem value="Apple-M1/M2/Arm">

```bash
# FROM: ./

make run-arm;
# (Equivalent)
#   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile-arm" docker compose -p issuer -f /Users/username/path/tsh-id-platform/infrastructure/local/docker-compose.yml up -d api;

# Expected Output:
#   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile-arm" docker compose -p issuer -f /Users/username/path/tsh-id-platform/local/docker-compose.yml up -d api;
#   WARN[0000] Found orphan containers ([issuer-vault-1 issuer-postgres-1 issuer-redis-1]) for this project. If yoremoved or renamed this service in your compose file, you can run this command with the --remove-orphans flag tclean it up. 
```

</TabItem>
</Tabs>

Navigating to <http://localhost:3001> shows the issuer API endpoints:

![Issuer API frontend](/img/3001.png)

### Standalone Mode Guide

#### Standalone Mode Guide Requirements

- [Docker Engine](https://docs.docker.com/engine/) 1.27
- Makefile toolchain
- Unix-based operating system (e.g. Debian, Arch, Mac OS X)
- [Go](https://go.dev/) 1.19
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Hashicorp Vault](https://github.com/hashicorp/vault)
    
#### Standalone Mode Setup

1. Copy `.env-api.sample` as `.env-api` and `.env-issuer.sample` as `.env-issuer`. Please see the [configuration(#configuration) section for more details.
2. Run `make build-local`. This will generate a binary for each of the following commands:
    - `platform`
    - `platform_ui`
    - `migrate`
    - `pending_publisher`
    - `notifications`
3. Run `make db/migrate`. This checks the database structure and applies any changes to the database schema.
4. Run `./bin/platform` command to start the issuer.
5. Run `./bin/pending_publisher`. This checks that publishing transactions to the blockchain works.
6. Follow the steps for adding an Ethereum private key to the Vault from the Docker installation mode.
---
