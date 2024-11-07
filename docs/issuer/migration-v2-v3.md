---
id: issuer-migration-guide
title: Migration Guide (v2 to v3)
sidebar_label: Migration Guide (v2 to v3)
description: Guide for migrating from issuer node v2 to v3
keywords:
  - docs
  - privado id
  - issuer node
  - v2
  - v3
  - core
  - API
  - UI
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Migration Guide: Upgrading from Issuer Node v2 to v3

We are excited to announce the release of Issuer Node v3. If you are currently running Issuer Node v2, we recommend migrating to the new version as soon as possible.

:::note
The migration process is designed to be seamless, with no disruption to previously issued credentials, connections, or the overall functionality of your system.
:::

## Key Enhancements in Issuer Node v3

- **Unified API** (v2): The previous two separate APIs (Core API and UI API) have been consolidated into a single, unified API. This simplifies development, enhances developer experience, and introduces new features like improved credentials status check while retaining all functionalities from API v1.
- **Streamlined Credential Issuance**: Issuer Node v3 introduces a simplified credential issuance flow. Now, users can authenticate and receive credentials in a single step using universal links.
- **Flexible Key Management**: The vault setup is now optional, giving developers the freedom to choose their preferred key management tool. Additionally, Issuer Node v3 supports AWS Key Management Service (KMS).
- **Enhanced UI**: The new UI enables the creation of multiple identities supported on multiple networks for an issuer and supports credential issuance through universal links, all seamlessly integrated with the Unified API.

## Migration Steps

If you were using Docker to run Issuer Node and wish to migrate to 3, please follow these steps after backing up your project folder.

#### 1. **Backup Your Database**

```bash
docker exec -i issuer-postgres-1 /bin/bash -c "PGPASSWORD=polygonid pg_dump --username polygonid platformid" > ./dump.sql
```

#### 2. **Backup your vault**

Use the command below to export your vault keys:

```bash
make vault_token=hvs.XXXX vault-export-keys
```
This will generate a file named keys.json.

#### 3. **Stop the Issuer Node**

Run the following command to stop your Issuer Node:
```bash
make stop
```

#### 4. **Pull Changes**

Pull the latest changes for v3 from the main branch of the repository
```bash
git pull
```

#### 5. **Update Configuration**

Modify your .env-issuer file to include or update the following variables. Please look at the latest env-issuer.sample file [here](https://github.com/0xPolygonID/issuer-node/blob/1d57318e338f0418572d8e41ae54e9b3418eac9b/.env-issuer.sample).

```bash
ISSUER_SERVER_URL=<PUBLICLY_ACCESSIBLE_URL_POINTING_TO_ISSUER_SERVER_PORT>
ISSUER_API_AUTH_USER=user-issuer
ISSUER_API_AUTH_PASSWORD=password-issuer
```
Please refer the point 3 [here](./setup-issuer-core.md/#issuer-node-api-setup-basic-configuration-building-docker-images) to configure the variables related to storing your keys, depending on the key repository you choose (local storage or Vault).

Create a file named resolvers_settings.yaml in the project's root directory. You can copy the resolvers_settings_sample.yaml file from [here](https://github.com/0xPolygonID/issuer-node/blob/main/resolvers_settings_sample.yaml) as a template. For information on configuration regarding setting up chains and RPCs, see [Setting up networks and chains](issuer-configuration.md#Advanced-Issuer-Node-configuration) in Advanced Configuration guide.


#### 6. Restart the Infrastructure Layer

```bash 
make up
```
#### 7. Import the Database Backup


```bash
docker exec -i issuer-postgres-1 /bin/bash -c "PGPASSWORD=polygonid psql --username polygonid platformid" < ./dump.sql
```

#### 8. Import Keys into Local Storage or a New Vault

For Local storage:

```bash
cp keys.json ./localstoragekeys/kms_localstorage_keys.json
```

For Vault:

Since you are running a new vault instance, obtain the new vault token by running
``` bash 
docker logs issuer-vault-1
```
Or
```bash
make print-vault-token`
```

Then, import your keys:

```bash
make vault_token=hvs.YYY vault-import-keys
```

#### 9.  Start the Services

Run all services with the following command:


```bash
make run-all
```

## Additional Notes

- New makefile commands have been added in this release. We recommend reviewing the README file for a comprehensive list.
- Issuer Node API v2 continues to support the following endpoints from v1 to ensure compatibility with previously issued credentials:
    - /v1/agent (API reference here)
    - /v1/{identifier}/claims/revocation/status/{nonce} (API reference here)
- By following these steps, you should be able to migrate to Issuer Node v3 smoothly and take advantage of the new features and improvements.





