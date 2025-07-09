---
id: issuer-configuration
title: Configuration
sidebar_label: Configuration
description: Issuer custom configuration.
keywords:
  - docs
  - privado id
  - issuer node
  - configuration
  - verifiable credentials
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Advanced Issuer Node configuration

This guide will show you how to configure your Issuer Node.

## Understanding Revocation Status

The revocation status is a core part of the credential, as it is the verifier's way of checking whether or not a credential has been revoked by the issuer. The Issuer Node offers three different ways to check the revocation status of a credential:

- `Centralized`: The verifier or user will check the credential revocation status through the Issuer Node itself, which is why we consider it to be a centralized method. If the node is not available, the verification will fail, resulting in possible errors when trying to generate ZK Proofs.

- `RHS Off Chain`: In this case, the credential revocation will be checked in a server independent from the Issuer Node (managed by the Issuer or an independent agent), so that we no longer depend on the Issuer Node as the only point of failure. This service will be a fallback in case the RHS is not available.

- `RHS On Chain`: This method can be considered as completely decentralized since the RHS is on chain, therefore the user or verifier will check the status of a credential via this decentralized on chain service without depending on a centralized server. This is the **desirable option**.

## Setting up networks and chains
The first step in setting up the issuer node is to define the networks it will support and for which it will be able to issue credentials.
The github repository provides an example file called `resolvers_setting_sample.yaml` this file can be used as a reference to configure the issuer node networks.
You must create a file called resolvers_settings.yaml which must be in the root directory.

Let's see an example of how to configure the issuer node for the Polygon amoy network and [Privado Identity Chain](/docs/privado-identity-chain.md)
```yaml
polygon:
  amoy:
    contractAddress: 0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124 # State contract address
    networkURL: https://polygon-amoy.g.alchemy.com/v2/x # Polygon amoy RPC
    defaultGasLimit: 600000
    confirmationTimeout: 10s
    confirmationBlockCount: 5
    receiptTimeout: 600s
    minGasPrice: 0
    maxGasPrice: 1000000
    rpcResponseTimeout: 5s
    waitReceiptCycleTime: 30s
    waitBlockCycleTime: 30s
    gasLess: true
    rhsSettings:
      mode: None # None, OffChain, OnChain, All
      contractAddress: 0x16A1ae4c460C0a42f0a87e69c526c61599B28BC9 # RHS contract address
      rhsUrl: https://rhs-staging.polygonid.me # RHS URL (setup this if you are using OffChain or All mode)
      chainID: 80002 # Polygon amoy chain ID
      publishingKey: pbkey # Publishing key path. Left this value as this.

privado:
  main:
    contractAddress: 0x3C9acB2205Aa72A05F6D77d708b5Cf85FCa3a896
    networkURL: https://rpc-mainnet.privado.id
    defaultGasLimit: 600000
    confirmationTimeout: 10s
    confirmationBlockCount: 5
    receiptTimeout: 600s
    minGasPrice: 0
    maxGasPrice: 1000000
    rpcResponseTimeout: 5s
    waitReceiptCycleTime: 30s
    waitBlockCycleTime: 30s
    gasLess: false
    rhsSettings:
      mode: None
      contractAddress: 0x7dF78ED37d0B39Ffb6d4D527Bb1865Bf85B60f81
      rhsUrl: https://rhs-staging.polygonid.me
      chainID: 21000
      publishingKey: pbke
```

:::note
Configuring Privado Idenity Chain (privado:main) is necessary as identities on the Privado ID Web Wallet and the Privado ID Wallet App are asociated to this chain. This configuration ensures issuance of credentials to these identities.
:::

Notes about **rhsSettings** mode:
Types:
* Iden3commRevocationStatusV1.0: Centralized mode
* Iden3ReverseSparseMerkleTreeProof: RHS Off Chain mode
* Iden3OnchainSparseMerkleTreeProof2023: RHS On Chain mode

then:

* None - allow only `Iden3commRevocationStatusV1.0` credential status type.
* OffChain - allow `Iden3commRevocationStatusV1.0` and `Iden3ReverseSparseMerkleTreeProof` credential status type
* OnChain - `Iden3commRevocationStatusV1.0` and `Iden3OnchainSparseMerkleTreeProof2023` credential status type
* All - All the statuses.

## KMS Configuration

Credentials issued by the issuer node are signed using a private key tied to the identity responsible for issuing them. Each identity can have one or more BabyJubJub (BJJ) type private keys. Additionally, the issuer node supports creating Ethereum-controlled identities, where both a BJJ key and an Ethereum (ETH) key are associated with the identity.

#### Identity Types and State Transitions
- BJJ-Based Identity:
  - A BJJ type key is generated for the identity to sign credentials and generate zk-proofs for state transitions.
  - A shared ETH type key (imported during setup) is used to publish zk-proofs on-chain.

- ETH-Based Identity:
  - Both a BJJ type key and an ETH type key are generated for the identity.
  - The BJJ type key is used to signs the credentials.
  - Only the ETH type key is involved in state transition.
  
The issuer node integrates with various key management solutions to create, sign, and store these keys securely. Depending on your setup, here’s an overview of the available options:

| **KMS Service**       | **Supported Key Types** | **Purpose**                              | **Recommended For**      |
|------------------------|-------------------------|------------------------------------------|--------------------------|
| HashiCorp Vault        | BJJ, ETH               | Secure key creation and storage          | Production               |
| AWS Secrets Manager    | BJJ, ETH               | Secure key storage                       | Production               |
| AWS KMS                | ETH (only)             | Secure ETH key creation and signing      | Production (ETH only)    |
| Localstorage           | BJJ, ETH               | Local storage for testing                | Testing Only             |


### HashiCorp Vault
The issuer node integrates with HashiCorp Vault, delegating the creation, signing, and secure storage of both BJJ and ETH keys via a Vault plugin. To configure the issuer node to use Vault as a Key Management Service (KMS), update the .env-issuer file as follows:

```bash
ISSUER_KMS_BJJ_PROVIDER=vault
ISSUER_KMS_ETH_PROVIDER=vault

ISSUER_VAULT_USERPASS_AUTH_ENABLED=true
ISSUER_VAULT_USERPASS_AUTH_PASSWORD=<your-vault-issuernode-password>
ISSUER_KEY_STORE_ADDRESS=<your-vault-url>
```
For detailed steps to configure the Vault plugin, refer to the Docker-based setup in the following repository: [HashiCorp Vault Setup](https://github.com/0xPolygonID/issuer-node/blob/main/infrastructure/local/.vault/scripts/init.sh).

### AWS Secrets Manager
In this configuration, the issuer node handles the creation of private keys, which are securely stored in AWS Secrets Manager.

Update the .env-issuer file as follows:

```bash
ISSUER_KMS_BJJ_PROVIDER=aws-sm
ISSUER_KMS_ETH_PROVIDER=aws-sm

ISSUER_KMS_AWS_ACCESS_KEY=<your-aws-access-key>
ISSUER_KMS_AWS_SECRET_KEY=<your-aws-secret-key>
ISSUER_KMS_AWS_REGION=<your-aws-region>
```
:::note
 Ensure the credentials you use have the necessary permissions to access AWS Secrets Manager.
:::
Learn more about AWS Secrets Manager here: [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/.)

### AWS KMS Service (Only for ETH Keys)
Alternatively, AWS KMS can be used exclusively for managing and signing ETH keys, delegating their creation and secure storage to the AWS KMS service.

To configure this setup, update the .env-issuer file as follows:

```bash
ISSUER_KMS_BJJ_PROVIDER=<localstorage | vault | aws-sm>
ISSUER_KMS_ETH_PROVIDER=aws-kms

ISSUER_KMS_AWS_ACCESS_KEY=<your-aws-access-key>
ISSUER_KMS_AWS_SECRET_KEY=<your-aws-secret-key>
ISSUER_KMS_AWS_REGION=<your-aws-region>
```
:::note
Ensure your credentials have the necessary permissions for AWS KMS.
:::
Learn more about AWS KMS service: [AWS KMS](https://aws.amazon.com/kms/?nc1=h_ls)

### Localstorage (For Testing Only)
For testing purposes, both BJJ and ETH keys can be stored locally as flat files. This option is not recommended for production environments due to its lack of security.

To enable this setup, update the .env-issuer file as follows:

```bash
ISSUER_KMS_BJJ_PROVIDER=localstorage
ISSUER_KMS_ETH_PROVIDER=localstorage
```



## State Contract

The State Contract stores the Global Identity State Tree. The GIST State represents a snapshot of the states of all the identities operating in the system. The design of the State Contract allows identities to authenticate themselves using Identity Profiles.

Every time that an identity is updated, for example when a credential is issued using SMT Proof or revoked, it needs to perform a State Transition. This process consists of generating a ZK-proof or a digitally-signed message that proves that the identity is authorized to perform the state transition. Then the State contract verifies the proof on-chain via its transitState (for ZK-proofs) or transitStateGeneric (generic, as the name suggests) function.

:::info

Learn more about state contract [here](https://docs.iden3.io/contracts/state/).

:::

<Tabs>
<TabItem value="Polygon Amoy">

```yaml
polygon:
  amoy:
    contractAddress: 0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124
```
</TabItem>

<TabItem value="Polygon Main">

```yaml
polygon:
  main:
    contractAddress: 0x624ce98D2d27b20b8f8d521723Df8fC4db71D79D
```
</TabItem>
</Tabs>

### Changing the API Authentication Configuration
To change the API authentication configuration, you need to modify the `.env-issuer` file. 
This file is located in the root directory of the issuer node repository.

```shell
ISSUER_API_AUTH_USER=<issuer-node-api-user>
ISSUER_API_AUTH_PASSWORD=<issuer-node-api-password>
```


