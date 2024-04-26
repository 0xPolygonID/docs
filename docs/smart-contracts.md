---
id: smart-contracts
title: Smart Contracts
sidebar_label: Smart Contracts
description: Smart Contracts used by the Polygon ID solution.
keywords:
  - docs
  - polygon id
  - smart
  - contract
---

<a href="https://github.com/0xPolygonID/contracts" target="_blank">Polygon ID Smart Contracts - Github</a>

:::caution
*Polygon Mumbai testnet has been deprecated 
:::

## State Contract addresses

For situations where one needs to publish data on the blockchain, such as creating an MTP-type credential, generating on-chain proofs and making credential revocations effective, it is important to have the following Smart Contracts addresses:

- Testnet(amoy) -> `0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124`
- Mainnet -> `0x624ce98D2d27b20b8f8d521723Df8fC4db71D79D`
- Testnet(mumbai)***** -> `0x134B1BE34911E39A8397ec6289782989729807a4`


:::info
Check a contract codebase and algorithms of work <ins>[docs](https://docs.iden3.io/contracts/state/)</ins>, <ins>[repository](https://github.com/iden3/contracts/tree/master/contracts/state)</ins>.
:::

## IdentityTreeStore contract (On-chain RHS)

|        Network             |     Address                                |
|:--------------------------:|:------------------------------------------:|
| **Polygon Mainnet**        | 0xbEeB6bB53504E8C872023451fd0D23BeF01d320B |
| **Polygon Amoy testnet**   | 0x3d3763eC0a50CE1AdF83d0b5D99FBE0e3fEB43fb |
| Polygon Mumbai testnet*     | 0x16A1ae4c460C0a42f0a87e69c526c61599B28BC9 |


## Validator addresses

Current addresses on **Polygon Mainnet** (V2.0.1 V2 validators):



|                   |                                Sig                                |                                MTP                                |
|:-----------------:|:-----------------------------------------------------------------:|:-----------------------------------------------------------------:|
|   **Verifier**    |            0xa0495df44ABBDbfCD1da30638869A3307BF21532             |            0x068b3dDE10b55643b55aA4820c7a977dEEEc3c07             |
|  **Validators**   |            0xEF8540a5e0F4f53B436e7C3A273dCAe1C05d764D             |            0x03Ee09635E9946165dd9538e9414f0ACE57e42e1             |
| **ERC20 example** | 0xB9Ac8e785f854f9B76bBF6d495213d58226DE813 (request id = 1 (sig)) | 0xB9Ac8e785f854f9B76bBF6d495213d58226DE813  (request id = 2 (mtp) |


Current addresses on **Polygon Amoy** testnet. (V2.0.1 V2 validators)

|                   |                             Sig                             |                             MTP                              |
|:-----------------:|:-----------------------------------------------------------:|:------------------------------------------------------------:|
|   **Verifier**    |         0x35178273C828E08298EcB0C6F1b97B3aFf14C4cb          |          0x789D95794973034BFeDed6D4693e7cc3Eb253B3a          |
|  **Validators**   |         0x8c99F13dc5083b1E4c16f269735EaD4cFbc4970d          |          0xEEd5068AD8Fecf0b9a91aF730195Fef9faB00356          |
| **ERC20 example** | 0x2b23e5cF70D133fFaA7D8ba61E1bAC4637253880 (request id = 1) | 0x2b23e5cF70D133fFaA7D8ba61E1bAC4637253880  (request id = 2) |




Current addresses on **Polygon Mumbai** testnet*****. (V2.0.1 V2 validators):

|                   |                             Sig                             |                             MTP                              |
|:-----------------:|:-----------------------------------------------------------:|:------------------------------------------------------------:|
|   **Verifier**    |         0x81ef49013627F363570a1C60B0D2215E23651B01          |          0xe5DB0489979C5671D9785cF1cBA9D9028041c9Bf          |
|  **Validators**   |         0x59f2a6D94D0d02F3a2F527a8B6175dc511935624          |          0xb9b51F7E8C83C90FE48e0aBd815ef0418685CcF6          |
| **ERC20 example** | 0x3a4d4E47bFfF6bD0EF3cd46580D9e36F3367da03 (request id = 1) | 0x3a4d4E47bFfF6bD0EF3cd46580D9e36F3367da03  (request id = 2) |


Current addresses for V3 beta circuit on **Polygon Amoy** testnet. (2.0.1-beta.1 V3 validator):

|                      |                                          V3 validator 2.0.1-beta.1                                          |   
|:--------------------:|:-----------------------------------------------------------------------------------------------------------:|
|     **Verifier**     |                                 0x07Bbd95505c44B65D7FA3B08dF6F5859373Fa1DC                                  | 
|    **Validators**    |                                 0xa5f08979370AF7095cDeDb2B83425367316FAD0B                                  |     
| **ERC20 SD example** |                         0xc5Cd536cb9Cc3BD24829502A39BE593354986dc4 (request id = 3)                         |
|     **ERC20 example**      | 0xc5Cd536cb9Cc3BD24829502A39BE593354986dc4 (request id = 100 - 1100 merklized  / 10000 - 65000 nonmerklized |



Current addresses for V3 beta circuit on **Polygon Mumbai** testnet*****. (2.0.1-beta.1 V3 validator):

|                      |                                          V3 validator 2.0.1-beta.1                                          |   
|:--------------------:|:-----------------------------------------------------------------------------------------------------------:|
|     **Verifier**     |                                 0xDE27fc243Bf4eDAaB72E1008c9828C480582f672                                  | 
|    **Validators**    |                                 0x3412AB64acFf5d94Da4914F176A43aCbDdC7Fc4a                                  |     
| **ERC20 SD example** |                         0x36eB0E70a456c310D8d8d15ae01F6D5A7C15309A (request id = 3)                         |
|     **ERC20 example**      | 0x36eB0E70a456c310D8d8d15ae01F6D5A7C15309A (request id = 100 - 1100 merklized  / 10000 - 65000 nonmerklized |

:::note
More about <ins>[v3 circuit](./verifier/v3-circuit)</ins>.

Check the examples of deployment for <ins>[ v3 validator](https://github.com/0xPolygonID/contracts/blob/main/scripts/deployV3Validator.ts)</ins>
:::


## CredentialAtomicQuerySigValidator

<a href="https://github.com/iden3/contracts/blob/master/contracts/validators/CredentialAtomicQuerySigValidator.sol" target="_blank">CredentialAtomicQuerySigValidator.sol - Github</a>

The CredentialAtomicQuerySigValidator contract is used to verify any credential-related zk proof generated by user using the <a href="https://docs.iden3.io/protocol/main-circuits/#credentialAtomicQuerySigV2OnChain" target="_blank">credentialAtomicQuerySigV2OnChain</a> circuit. The contract only verifies proofs based on credential of type `Signature`

The core of the contract is its <a href="https://github.com/iden3/contracts/blob/master/contracts/validators/CredentialAtomicQuerySigValidator.sol#L53" target="_blank">verify</a> function that takes the proof generated by a user and executes a set of verifications:

- Verifies that the proof is valid. This verification is actually performed inside the
  <a href="https://github.com/iden3/contracts/blob/master/contracts/lib/VerifierSig.sol" target="_blank">verifierSig</a> contract which is automatically generated using circom.
- Verifies that the input used to generate the proof matches the query associated to that specific Request.
- Verifies that the user's and the Issuer's identity states are valid based on the State Contract.

> The CredentialAtomicQuerySigValidator executes the same set of verifications of the [Verification Library](/docs/verifier/verification-library/verification-api-guide.md#verification---under-the-hood). The former is required when performing on-chain verification while the latter is required for off-chain verification.

## CredentialAtomicQueryMTPValidator

<a href="https://github.com/iden3/contracts/blob/master/contracts/validators/CredentialAtomicQueryMTPValidator.sol" target="_blank">CredentialAtomicQueryMTPValidator.sol - Github</a>

Performs the same set of verifications of the CredentialAtomicQuerySigValidator but for credential of type `MTP`.

> Further protocol related contracts can be found at <a href="https://docs.iden3.io/contracts/state" target="_blank">Iden3 - Smart Contracts</a>



