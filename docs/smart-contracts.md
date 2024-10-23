---
id: smart-contracts
title: Smart Contracts
sidebar_label: Smart Contracts
description: Smart Contracts used by the Privado ID
keywords:
  - docs
  - polygon id
  - smart
  - contract
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<a href="https://github.com/iden3/contracts" target="_blank">Privado ID Smart Contracts - Github</a>

As part of our unified address methodology, we deployed contracts via the CREATE2 EVM opcode. This method ensures that the final address of the contract depends on the contract's initialization bytecode and a salt. To support deployments across various networks, we utilized [CreateX](https://createx.rocks/) contract factories. Specifically, the [deployCreate2](https://github.com/pcaversaccio/createx/blob/main/src/CreateX.sol#L332) method was used to handle the deployments.


## Networks 
We have deployed contracts across the following mainnets and testnets so far:

**Mainnets**:
- [Privado Identity Chain](/docs/privado-identity-chain)
- [Ethereum](https://etherscan.io/address/0x3C9acB2205Aa72A05F6D77d708b5Cf85FCa3a896)
- [Polygon POS](https://polygonscan.com/address/0x624ce98d2d27b20b8f8d521723df8fc4db71d79d)
- [Polygon zkEVM](https://zkevm.polygonscan.com/address/0x3C9acB2205Aa72A05F6D77d708b5Cf85FCa3a896)
- [Linea](https://lineascan.build/address/0x3C9acB2205Aa72A05F6D77d708b5Cf85FCa3a896)

**Testnets**:

- [Ethereum Sepolia](https://sepolia.etherscan.io/address/0x3C9acB2205Aa72A05F6D77d708b5Cf85FCa3a896)
- [Polygon Amoy](https://amoy.polygonscan.com/address/0x1a4cc30f2aa0377b0c3bc9848766d90cb4404124)
- [Polygon zkEVM Cardona](https://cardona-zkevm.polygonscan.com/address/0x3C9acB2205Aa72A05F6D77d708b5Cf85FCa3a896)
- [Linea-Sepolia](https://sepolia.lineascan.build/address/0x3C9acB2205Aa72A05F6D77d708b5Cf85FCa3a896)


## Unified contract addresses

:::warning *EXCEPTIONS
It’s important to note that the State contract addresses for the following two networks are exceptions. These contracts were already deployed at these addresses, and they are not being redeployed because they contain a significant amount of historically collected data. Redeploying them to a unified address would result in data loss, which we aim to avoid:
- Polygon Amoy State Contract: <ins>[0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124](https://amoy.polygonscan.com/address/0x1a4cc30f2aa0377b0c3bc9848766d90cb4404124)</ins>
- Polygon Mainnet State Contract : <ins>[0x624ce98D2d27b20b8f8d521723Df8fC4db71D79D](https://polygonscan.com/address/0x624ce98d2d27b20b8f8d521723df8fc4db71d79d)</ins>

:::

|   Smart Contract Type        |                 Unified Address                   |
| :----------------------: | :----------------------------------------: |
|   **STATE* **    |  0x3C9acB2205Aa72A05F6D77d708b5Cf85FCa3a896 |
|   **VALIDATOR_MTP_V2**    | 0x27bDFFCeC5478a648f89764E22fE415486A42Ede |
| **VALIDATOR_SIG_V2** | 0x59B347f0D3dd4B98cc2E056Ee6C53ABF14F8581b |
| **VALIDATOR_V3** | 0xd179f29d00Cd0E8978eb6eB847CaCF9E2A956336 |
| **UNIVERSAL_VERIFIER** | 0xfcc86A79fCb057A8e55C6B853dff9479C3cf607c |
| **IDENTITY_TREE_STORE** | 0x7dF78ED37d0B39Ffb6d4D527Bb1865Bf85B60f81 |


:::info
State Contracts are used for publishing data on the blockchain in scenarios such as issuing MTP-type credentials, generating on-chain proofs, enforcing credential revocations, and providing a timestamping service for tracking expirations during on-chain proof verifications.
Check the contract codebase and algorithms of work <ins>[docs](https://docs.iden3.io/contracts/state/)</ins>, <ins>[repository](https://github.com/iden3/contracts/tree/master/contracts/state)</ins>.
:::

:::info Stateless Contract Libraries
We have released a set of reusable stateless contracts, deployed to unified addresses, that can be integrated into any contract. These can be used for standalone deployments of contracts from the ecosystem.

- SMT_LIB: 0x682364078e26C1626abD2B95109D2019E241F0F6
- POSEIDON_1: 0xC72D76D7271924a2AD54a19D216640FeA3d138d9
- POSEIDON_2: 0x72F721D9D5f91353B505207C63B56cF3d9447edB
- POSEIDON_3: 0x5Bc89782d5eBF62663Df7Ce5fb4bc7408926A240
- POSEIDON_4: 0x0695cF2c6dfc438a4E40508741888198A6ccacC2

These libraries can be leveraged for various purposes, such as building custom verifiers, state management, or identity trees, allowing for flexible integration into other projects. By using these pre-deployed contracts, developers can significantly reduce the gas costs typically incurred during deployment.
:::

:::info
More about <ins>[v3 circuit](./verifier/v3-circuit)</ins>.

Check the examples of deployment for <ins>[ v3 validator](https://github.com/0xPolygonID/contracts/blob/main/scripts/deployV3Validator.ts)</ins>
:::
## CredentialAtomicQuerySigValidator

<a href="https://github.com/iden3/contracts/blob/master/contracts/validators/CredentialAtomicQuerySigValidator.sol" target="_blank">CredentialAtomicQuerySigValidator.sol - Github</a>

The CredentialAtomicQuerySigValidator contract is used to verify any credential-related zk proof generated by user using the <a href="https://docs.iden3.io/protocol/main-circuits/#credentialAtomicQuerySigV2OnChain" target="_blank">credentialAtomicQuerySigV2OnChain</a> circuit. The contract only verifies proofs based on credential of type `Signature`

The core of the contract is its <a href="https://github.com/iden3/contracts/blob/master/contracts/validators/CredentialAtomicQuerySigValidator.sol#L53" target="_blank">verify</a> function that takes the proof generated by a user and executes a set of verifications:

- Verifies that the proof is valid. This verification is actually performed inside the 
  <a href="https://github.com/iden3/contracts/blob/master/contracts/lib/groth16-verifiers/Groth16VerifierSig.sol" target="_blank">Groth16VerifierSig</a> contract which is automatically generated using circomlibjs library.
- Verifies that the input used to generate the proof matches the query associated to that specific Request.
- Verifies that the user's and the Issuer's identity states are valid based on the State Contract.

> The CredentialAtomicQuerySigValidator executes the same set of verifications of the [Verification Library](/docs/verifier/verification-library/verification-api-guide.md#verification---under-the-hood). The former is required when performing on-chain verification while the latter is required for off-chain verification.

## CredentialAtomicQueryMTPValidator

<a href="https://github.com/iden3/contracts/blob/master/contracts/validators/CredentialAtomicQueryMTPValidator.sol" target="_blank">CredentialAtomicQueryMTPValidator.sol - Github</a>

Performs the same set of verifications of the CredentialAtomicQuerySigValidator but for credential of type `MTP`.

> Further protocol related contracts can be found at <a href="https://docs.iden3.io/contracts/state" target="_blank">Iden3 - Smart Contracts</a>
