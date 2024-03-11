---
id: overview
title: On-chain verification
sidebar_label: On-chain verification
description: On-chain verification tutorials.
keywords:
  - docs
  - polygon id
  - ID holder
  - issuer
  - verifier
  - on-chain
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The on-chain verification workflow allows dApps to verify users' credentials inside a Smart Contract. Zero-Knowledge Proof cryptography enables this verification to happen privately, that means, without revealing any personal information of the user (prover).

This flow is especially needed in cases where further on-chain logic needs to be implemented on successful verification such as:

- Distributing a token airdrop only to human-verified accounts
- Allowing voting only to account members of your DAO
- Blocking airdrops to users that belong to a specific country
- Allowing trading only to accounts that passed the KYC verification

## On-chain verification flow

At its core, every on-chain interaction between a Verifier and a user's Wallet follows this workflow:

<div align="center">
<img src={useBaseUrl("img/on-chain-verification-flow.png")} align="center" width="600"/>
</div>

1. After having deployed a [Verifier Smart Contract](#design-the-erc20-zk-airdrop-verifier-contract), the Verifier designs a [Request](#set-the-zkp-request) for the users. This has to be recorded on-chain inside the Verifier Smart Contract.
1. The Request is delivered to the user within a QR code (or via deep-linking, depending on the implementation).
1. The user scans the QR code using his/her mobile ID wallet and parses the request
1. The application fetches the revocation status of the requested credential from the Issuer of that credential.
1. A ZK proof is generated on mobile according to the request of the website and based on the credentials held in his/her wallet. This also contains the ZK proof that the credential is not revoked.
1. The user sends the ZK proof to the Verifier Smart Contract.
1. The Verifier Smart Contract verifies the zk Proof.
1. The Verifier Smart Contract checks that the State of the Issuer of the credential and the State of the user are still valid and have not been revoked.
1. If the verification is successful, the Verifier executes the logic defined in the Smart Contract.

Note that an active action from the Verifier is only required at step 1. All the rest of the interaction is between the user and the Smart Contract. All the verification logic is executed programmatically inside the Smart Contract.

## Implement an ERC20 ZK Airdrop

In this tutorial, we will create an ERC20 ZK Airdrop Contract. The chosen query criterium is to be born before `01/01/2002`. Users that can prove that they were born before that date will be able to get the airdrop. Otherwise, they will not. The proof submitted to the Smart Contract will not reveal any information about the specific date of birth of the user as we are using zero knowledge.

:::note

To set up a different query check out the [<ins>ZK Query Language section</ins>](/docs/verifier/verification-library/zk-query-language.md).

:::

This tutorial is based on the verification of a Credential of Type `KYCAgeCredential` with an attribute `birthday` with a Schema URL `https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld`.

The prerequisite is that users have the [Polygon ID Wallet app](/docs/wallet/wallet-overview.md) installed and self-issued a Credential of type `KYC Age Credential Merklized` using our [Demo Issuer](https://issuer-demo.polygonid.me/)

:::note

The full executable code related to this tutorial can be cloned from <ins><a href="https://github.com/0xPolygonID/tutorial-examples/tree/main/on-chain-verification" target="_blank">this repository</a></ins>.

:::

### Design the ERC20 zk Airdrop Verifier Contract

Let us jump into the code by writing the ERC20Verifier contract.

The ERC20Verifier is an ERC20 standard contract with a few other features. The extra functionality is given by the zero-knowledge proof verification. All the functions dedicated to the ZK verification are contained inside the
<a href="https://github.com/iden3/contracts/blob/master/contracts/verifiers/ZKPVerifier.sol" target="_blank">ZKPVerifier Contract</a> and inherited within the ERC20Verifier. For example, users will submit their proof to claim the airdrop by calling <a href="https://github.com/iden3/contracts/blob/master/contracts/verifiers/ZKPVerifier.sol#L40" target="_blank">`submitZKPResponse`</a>.

The ERC20Verifier contract must define at least a single `TRANSFER_REQUEST_ID`. This is the Identifier of the request that the contract is making to the user.

```solidity
pragma solidity ^0.8.16;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {PrimitiveTypeUtils} from "@iden3/contracts/lib/PrimitiveTypeUtils.sol";
import {ICircuitValidator} from "@iden3/contracts/interfaces/ICircuitValidator.sol";
import {ZKPVerifier} from "@iden3/contracts/verifiers/ZKPVerifier.sol";

contract ERC20Verifier is ERC20, ZKPVerifier {
    uint64 public constant TRANSFER_REQUEST_ID = 1;

    // define the amount of token to be airdropped per user
    uint256 public TOKEN_AMOUNT_FOR_AIRDROP_PER_ID = 5 * 10**uint(decimals());

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC20(name_, symbol_) {}

}
```

The ZKPVerifier Contract provides 2 hooks:

<a href="https://github.com/iden3/contracts/blob/master/contracts/verifiers/ZKPVerifier.sol#L113" target="_blank">`_beforeProofSubmit`</a> and <a href="https://github.com/iden3/contracts/blob/master/contracts/verifiers/ZKPVerifier.sol#L122" target="_blank">`_afterProofSubmit`</a>. These hooks are called before and after any proof gets submitted and can be used to create personalized logic inside your Smart Contract.

In this specific case, it must be checked that the sender of the proof matches the address contained in the proof challenge. This requirement is necessary to prevent proof front-running. This condition is added inside `_beforeProofSubmit`.

The airdrop logic must be added inside `_afterProofSubmit`. The contract must execute the airdrop once the proof is correctly verified.

```solidity {4, 5, 13, 14, 15, 16, 17, 28, 29, 30, 31, 32}
contract ERC20Verifier is ERC20, ZKPVerifier {
    uint64 public constant TRANSFER_REQUEST_ID = 1;

    mapping(uint256 => address) public idToAddress;
    mapping(address => uint256) public addressToId;

    uint256 public TOKEN_AMOUNT_FOR_AIRDROP_PER_ID =
        5 * 10 ** uint256(decimals());

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC20(name_, symbol_) {}

    function _beforeProofSubmit(
        uint64 /* requestId */,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check that  challenge input is address of sender
        address addr = PrimitiveTypeUtils.int256ToAddress(
            inputs[validator.inputIndexOf("challenge")]
        );
        // this is linking between msg.sender and
        require(
            _msgSender() == addr,
            "address in proof is not a sender address"
        );
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        require(
            requestId == TRANSFER_REQUEST_ID && addressToId[_msgSender()] == 0,
            "proof can not be submitted more than once"
        );

        // get user id
        uint256 id = inputs[1];
        // additional check didn't get airdrop tokens before
        if (idToAddress[id] == address(0) && addressToId[_msgSender()] == 0) {
            super._mint(_msgSender(), TOKEN_AMOUNT_FOR_AIRDROP_PER_ID);
            addressToId[_msgSender()] = id;
            idToAddress[id] = _msgSender();
        }
    }

}
```

Finally, we can add a further element of security inside the Smart Contract: prevent any type of token transfer (even after the airdrop) unless users passed the proof verification. This last condition is added by overriding the ERC20 `_beforeTokenTransfer` function and checking that the receiver address `to` of the transfer is included inside the
<a href="https://github.com/iden3/contracts/blob/master/contracts/verifiers/ZKPVerifier.sol#L28" target="_blank">`proofs`</a> mapping.

```solidity {29, 30, 31, 32, 33}
contract ERC20Verifier is ERC20, ZKPVerifier {
    uint64 public constant TRANSFER_REQUEST_ID = 1;

    mapping(uint256 => address) public idToAddress;
    mapping(address => uint256) public addressToId;

    uint256 public TOKEN_AMOUNT_FOR_AIRDROP_PER_ID =
        5 * 10 ** uint256(decimals());

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC20(name_, symbol_) {}

    function _beforeProofSubmit(
        uint64 /* requestId */,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        ...
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
       ...
    }

    function _beforeTokenTransfer(
        address /* from */,
        address to,
        uint256 /* amount */
    ) internal view override {
        require(
            proofs[to][TRANSFER_REQUEST_ID] == true,
            "only identities who provided proof are allowed to receive tokens"
        );
    }
}
```

The contract is now fully written!

### Deploy the Contract

:::note "Hardhat"

For this tutorial, we are using the Hardhat development environment to facilitate the contract deployment. You can learn how to get started with this tool by checking [<ins>their documentation</ins>](https://hardhat.org/hardhat-runner/docs/getting-started).

:::

Execute this Hardhat script to deploy the contract:

```js
async function main() {
  const verifierContract = "ERC20Verifier";
  const verifierName = "ERC20zkAirdrop";
  const verifierSymbol = "zkERC20";

  const ERC20Verifier = await ethers.getContractFactory(verifierContract);
  const erc20Verifier = await ERC20Verifier.deploy(verifierName, verifierSymbol);

  await erc20Verifier.deployed();
  console.log(verifierName, " contract address:", erc20Verifier.address);
}
```

:::note

The contract ERC20Verifier must be deployed on the Mumbai test network as there is a set of supporting contracts that are already deployed on Mumbai.

```bash
npx hardhat run polygon-mumbai scripts/deploy.js
```

:::

### Set the ZKP Request

The actual ZKP request "to be born before 01/01/2002" hasn't been added to the Smart Contract yet. To do so it is necessary to call <a href="https://github.com/iden3/contracts/blob/master/contracts/verifiers/ZKPVerifier.sol#L68" target="_blank">setZKPRequest</a> function inherited inside the ERC20Verifier which takes 2 inputs:

1. `requestId`: the ID associated with the request.
2. `request`: <a href="https://github.com/iden3/contracts/blob/master/contracts/interfaces/IZKPVerifier.sol#L8" target="_blank">ZKPRequest</a> struct. ZKPRequest struct contains 3 fields:
   1. `metadata`: contract invoke request.
   2. `validator` the address of the <a href="https://github.com/iden3/contracts/tree/master/contracts/validators" target="_blank">Validators Smart Contract</a> already deployed on Mumbai. This is the contract that executes the verification on the ZK proof submitted by the user. It can be of type [CredentialAtomicQuerySigValidator](/docs/smart-contracts.md#credentialatomicquerysigvalidator) or [CredentialAtomicQueryMTPValidator](/docs/smart-contracts.md#credentialatomicquerymtpvalidator).
   3. `data` encoded bytes of <a href="https://github.com/iden3/contracts/blob/master/contracts/validators/CredentialAtomicQueryValidator.sol#L12" target="_blank">CredentialAtomicQuery</a> struct.

CredentialAtomicQuery struct contains 10 fields:

1. `schema` namely the bigInt representation of the schema of the requested credential. This can be obtained by passing your schema to this [Go Sandbox](https://go.dev/play/p/3id7HAhf-Wi). In order to use the sandbox, the constants `jsonLDContext`, `typ`, `fieldName` and `schemaJSONLD` need to be modified according to your request.
2. `claimPathKey` represents the path to the queries key inside the merklized credential. In this case, it is the path to the `birthday` key. This can be obtained by passing your schema to this [Go Sandbox](https://go.dev/play/p/3id7HAhf-Wi). In order to use the sandbox, the constants `jsonLDContext`, `typ`, `fieldName` and `schemaJSONLD` need to be modified according to your request.
3. `operator` is either 1,2,3,4,5,6. To understand more about the operator you can check the [zk query language](/docs/verifier/verification-library/zk-query-language.md).
4. `slotIndex` represents specific position for <a href="https://docs.iden3.io/protocol/claims-structure/#index-vs-value" target="_blank">data in claim</a>.
5. `value` represents the threshold value you are querying. In this case, it is the date 01/01/2002.
6. `queryHash` is the poseidon hash of `schemaHash`, `slotIndex`, `operator`, `claimPathKey`, `claimPathNotExists`, `valueHash`. Used for gas consumption optimization.
7. `allowedIssuers` represents the allowed issuers of the credential.
8. `circuitIds` is an array of circuit IDs (['credentialAtomicQuerySigV2OnChain'] or ['credentialAtomicQueryMTPV2OnChain']).
9. `skipClaimRevocationCheck` checks whether the credential revocation will be checked during the proof generation.
10. `claimPathNotExists`: 0 or 1; 0 for inclusion in merklized credentials, 1 for non-inclusion and for non-merklized credentials.

To encode these fields to structure, use this function:

```js
const { Web3 } = require("web3");

function packValidatorParams(query, allowedIssuers = []) {
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  return web3.eth.abi.encodeParameter(
    {
      CredentialAtomicQuery: {
        schema: "uint256",
        claimPathKey: "uint256",
        operator: "uint256",
        slotIndex: "uint256",
        value: "uint256[]",
        queryHash: "uint256",
        allowedIssuers: "uint256[]",
        circuitIds: "string[]",
        skipClaimRevocationCheck: "bool",
        claimPathNotExists: "uint256",
      },
    },
    {
      schema: query.schema,
      claimPathKey: query.claimPathKey,
      operator: query.operator,
      slotIndex: query.slotIndex,
      value: query.value,
      queryHash: query.queryHash,
      allowedIssuers: allowedIssuers,
      circuitIds: query.circuitIds,
      skipClaimRevocationCheck: query.skipClaimRevocationCheck,
      claimPathNotExists: query.claimPathNotExists,
    }
  );
}
```

Calculate query hash:

```js
const { poseidon } = require("@iden3/js-crypto");
const { SchemaHash } = require("@iden3/js-iden3-core");
const { prepareCircuitArrayValues } = require("@0xpolygonid/js-sdk");

function calculateQueryHash(values, schema, slotIndex, operator, claimPathKey, claimPathNotExists) {
  const expValue = prepareCircuitArrayValues(values, 64);
  const valueHash = poseidon.spongeHashX(expValue, 6);
  const schemaHash = coreSchemaFromStr(schema);
  const quaryHash = poseidon.hash([
    schemaHash.bigInt(),
    BigInt(slotIndex),
    BigInt(operator),
    BigInt(claimPathKey),
    BigInt(claimPathNotExists),
    valueHash,
  ]);
  return quaryHash;
}

function coreSchemaFromStr(schemaIntString) {
  const schemaInt = BigInt(schemaIntString);
  return SchemaHash.newSchemaHashFromInt(schemaInt);
}
```

:::info

Check out our [<ins>Smart Contract section</ins>](/docs/smart-contracts.md) to learn more about the set of verifications executed on the zk proof.

:::

Execute this Hardhat script to set the ZK request to the Smart Contract:

```js
const { Web3 } = require("web3");
const { poseidon } = require("@iden3/js-crypto");
const { SchemaHash } = require("@iden3/js-iden3-core");
const { prepareCircuitArrayValues } = require("@0xpolygonid/js-sdk");

const Operators = {
  NOOP: 0, // No operation, skip query verification in circuit
  EQ: 1, // equal
  LT: 2, // less than
  GT: 3, // greater than
  IN: 4, // in
  NIN: 5, // not in
  NE: 6, // not equal
};

function packValidatorParams(query, allowedIssuers = []) {
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  return web3.eth.abi.encodeParameter(
    {
      CredentialAtomicQuery: {
        schema: "uint256",
        claimPathKey: "uint256",
        operator: "uint256",
        slotIndex: "uint256",
        value: "uint256[]",
        queryHash: "uint256",
        allowedIssuers: "uint256[]",
        circuitIds: "string[]",
        skipClaimRevocationCheck: "bool",
        claimPathNotExists: "uint256",
      },
    },
    {
      schema: query.schema,
      claimPathKey: query.claimPathKey,
      operator: query.operator,
      slotIndex: query.slotIndex,
      value: query.value,
      queryHash: query.queryHash,
      allowedIssuers: allowedIssuers,
      circuitIds: query.circuitIds,
      skipClaimRevocationCheck: query.skipClaimRevocationCheck,
      claimPathNotExists: query.claimPathNotExists,
    }
  );
}

function coreSchemaFromStr(schemaIntString) {
  const schemaInt = BigInt(schemaIntString);
  return SchemaHash.newSchemaHashFromInt(schemaInt);
}

function calculateQueryHash(values, schema, slotIndex, operator, claimPathKey, claimPathNotExists) {
  const expValue = prepareCircuitArrayValues(values, 64);
  const valueHash = poseidon.spongeHashX(expValue, 6);
  const schemaHash = coreSchemaFromStr(schema);
  const quaryHash = poseidon.hash([
    schemaHash.bigInt(),
    BigInt(slotIndex),
    BigInt(operator),
    BigInt(claimPathKey),
    BigInt(claimPathNotExists),
    valueHash,
  ]);
  return quaryHash;
}

async function main() {
  // you can run https://go.dev/play/p/3id7HAhf-Wi to get schema hash and claimPathKey using YOUR schema
  const schemaBigInt = "74977327600848231385663280181476307657";

  const type = "KYCAgeCredential";
  const schemaUrl =
    "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld";
  // merklized path to field in the W3C credential according to JSONLD  schema e.g. birthday in the KYCAgeCredential under the url "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld"
  const schemaClaimPathKey =
    "20376033832371109177683048456014525905119173674985843915445634726167450989630";

  const requestId = 1;

  const query = {
    requestId,
    schema: schemaBigInt,
    claimPathKey: schemaClaimPathKey,
    operator: Operators.LT,
    slotIndex: 0,
    value: [20020101, ...new Array(63).fill(0)], // for operators 1-3 only first value matters
    circuitIds: ["credentialAtomicQuerySigV2OnChain"],
    skipClaimRevocationCheck: false,
    claimPathNotExists: 0,
  };

  query.queryHash = calculateQueryHash(
    query.value,
    query.schema,
    query.slotIndex,
    query.operator,
    query.claimPathKey,
    query.claimPathNotExists
  ).toString();

  // add the address of the contract just deployed
  const ERC20VerifierAddress = "<ERC20VerifierAddress>";

  let erc20Verifier = await hre.ethers.getContractAt("ERC20Verifier", ERC20VerifierAddress);

  const validatorAddress = "0x1E4a22540E293C0e5E8c33DAfd6f523889cFd878"; // sig validator
  // const validatorAddress = "0x0682fbaA2E4C478aD5d24d992069dba409766121"; // mtp validator

  const invokeRequestMetadata = {
    id: "7f38a193-0918-4a48-9fac-36adfdb8b542",
    typ: "application/iden3comm-plain-json",
    type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
    thid: "7f38a193-0918-4a48-9fac-36adfdb8b542",
    body: {
      reason: "airdrop participation",
      transaction_data: {
        contract_address: ERC20VerifierAddress,
        method_id: "b68967e2",
        chain_id: 80001,
        network: "polygon-mumbai",
      },
      scope: [
        {
          id: query.requestId,
          circuitId: query.circuitIds[0],
          query: {
            allowedIssuers: ["*"],
            context: schemaUrl,
            credentialSubject: {
              birthday: {
                $lt: query.value[0],
              },
            },
            type,
          },
        },
      ],
    },
  };

  try {
    const txId = await erc20Verifier.setZKPRequest(requestId, {
      metadata: JSON.stringify(invokeRequestMetadata),
      validator: validatorAddress,
      data: packValidatorParams(query),
    });
    console.log("Request set");
  } catch (e) {
    console.log("error: ", e);
  }
}
```

The contract is now correctly deployed on Mumbai Testnet and the query has been set up, congratulations! Now it is time to launch the airdrop!

### Add the Proof Request Inside a QR Code

The last step is to design the proof request to be embedded inside a QR code. In this particular case this is how the request should look like (remember to modify it by adding the address of your ERC20Verifier Contract):

```json
{
  "id": "7f38a193-0918-4a48-9fac-36adfdb8b542",
  "typ": "application/iden3comm-plain-json",
  "type": "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
  "thid": "7f38a193-0918-4a48-9fac-36adfdb8b542",
  "body": {
    "reason": "airdrop participation",
    "transaction_data": {
      "contract_address": "<ERC20VerifierAddress>",
      "method_id": "b68967e2",
      "chain_id": 80001,
      "network": "polygon-mumbai"
    },
    "scope": [
      {
        "id": 1,
        "circuitId": "credentialAtomicQuerySigV2OnChain",
        "query": {
          "allowedIssuers": ["*"],
          "context": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
          "credentialSubject": {
            "birthday": {
              "$lt": 20020101
            }
          },
          "type": "KYCAgeCredential"
        }
      }
    ]
  }
}
```

> The scope section inside the JSON file must match the query previously set when calling the `setZKPRequest` function.

Note that the request resembles, in most of its parts, the one designed for [off-chain verification](/docs/verifier/verification-library/request-api-guide.md). The extra part that has been added here is the `transcation_data` that includes:

- `contract_address`, namely the address of the Verifier contract, in this case, ERC20Verifier.
- `method_id`, namely the [Function Selector](https://solidity-by-example.org/function-selector/) of the <a href="https://github.com/iden3/contracts/blob/master/contracts/verifiers/ZKPVerifier.sol#L40" target="_blank">submitZKPResponse</a> function.
- `chain_id`, the ID of the chain where the Smart Contract has been deployed.
- `network`, the name of the network where the Smart contract has been deployed.

> To display the QR code inside your frontend, you can use the `express.static` built-in middleware function together with this <a href="https://github.com/0xPolygonID/tutorial-examples/tree/main/verifier-integration/js/static" target="_blank">Static Folder</a> or this [Code Sandbox](https://codesandbox.io/s/yp1pmpjo4z?file=/index.js).

Scanning the QR with their Polygon ID Wallet, users will be able to generate proofs and send transactions to the Smart Contract in order to request credentials for their airdrops.

The same proof generation request can also be delivered to users via Deep Linking. In order to do so, it is necessary to [encode](https://www.base64encode.org/) the JSON file to Base64 Format. The related deep link would be `iden3comm://?i_m={{base64EncodedJsonHere}}`. For example, in this specific case the deep link would be: `iden3comm://?i_m=ewogICAgImlkIjogIjdmMzhhMTkzLTA5MTgtNGE0OC05ZmFjLTM2YWRmZGI4YjU0MiIsCiAgICAidHlwIjogImFwcGxpY2F0aW9uL2lkZW4zY29tbS1wbGFpbi1qc29uIiwKICAgICJ0eXBlIjogImh0dHBzOi8vaWRlbjMtY29tbXVuaWNhdGlvbi5pby9wcm9vZnMvMS4wL2NvbnRyYWN0LWludm9rZS1yZXF1ZXN0IiwKICAgICJ0aGlkIjogIjdmMzhhMTkzLTA5MTgtNGE0OC05ZmFjLTM2YWRmZGI4YjU0MiIsCiAgICAiYm9keSI6IHsKICAgICAgICAicmVhc29uIjogImFpcmRyb3AgcGFydGljaXBhdGlvbiIsCiAgICAgICAgInRyYW5zYWN0aW9uX2RhdGEiOiB7CiAgICAgICAgICAgICJjb250cmFjdF9hZGRyZXNzIjogIjxFUkMyMFZlcmlmaWVyQWRkcmVzcz4iLAogICAgICAgICAgICAibWV0aG9kX2lkIjogImI2ODk2N2UyIiwKICAgICAgICAgICAgImNoYWluX2lkIjogODAwMDEsCiAgICAgICAgICAgICJuZXR3b3JrIjogInBvbHlnb24tbXVtYmFpIgogICAgICAgIH0sCiAgICAgICAgInNjb3BlIjogWwogICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAiaWQiOiAxLAogICAgICAgICAgICAgICAgImNpcmN1aXRJZCI6ICJjcmVkZW50aWFsQXRvbWljUXVlcnlTaWdWMk9uQ2hhaW4iLAogICAgICAgICAgICAgICAgInF1ZXJ5IjogewogICAgICAgICAgICAgICAgICAgICJhbGxvd2VkSXNzdWVycyI6IFsKICAgICAgICAgICAgICAgICAgICAgICAgIioiCiAgICAgICAgICAgICAgICAgICAgXSwKICAgICAgICAgICAgICAgICAgICAiY29udGV4dCI6ICJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vaWRlbjMvY2xhaW0tc2NoZW1hLXZvY2FiL21haW4vc2NoZW1hcy9qc29uLWxkL2t5Yy12My5qc29uLWxkIiwKICAgICAgICAgICAgICAgICAgICAiY3JlZGVudGlhbFN1YmplY3QiOiB7CiAgICAgICAgICAgICAgICAgICAgICAgICJiaXJ0aGRheSI6IHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICIkbHQiOiAyMDAyMDEwMQogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICAgICAgICAidHlwZSI6ICJLWUNBZ2VDcmVkZW50aWFsIgogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgXQogICAgfQp9`

## Claim the Airdrop

You can directly test it by scanning the QR Code below using your Polygon ID App:

<div align="center">
<img src= "/img/qr-code-on-chain-verification.png" align="center" width="400"/>
</div>
<br></br>

### How is the proof submission executed?

The wallet needs to call the `submitZKPResponse()` function before it can submit the proof for the requirements set in the Airdrop Participation process. This function forms part of the ZKPVerifier Interface [IZKPVerifier](https://github.com/iden3/contracts/blob/master/contracts/interfaces/IZKPVerifier.sol#L7) and is actually implemented inside the [ZKPVerifier Contract](https://github.com/iden3/contracts/blob/master/contracts/verifiers/ZKPVerifier.sol#L40).

```solidity
import "./ICircuitValidator.sol";

interface IZKPVerifier {
    function submitZKPResponse(
        uint64 requestId,
        uint256[] memory inputs,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c
    ) external;
}
```

## Extend it to Your Own Logic

Now that you have been able to create your first on-chain ZK-based application, you can extend it to accommodate any type of imaginable logic. The target Smart Contract doesn't have to be an ERC20 but it can be an ERC721, a DeFi pool, a voting Smart Contract or whatever contract you can think of. Equally, the query can be extended to any type of existing Credential and based on the different operators available inside the <a href="https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/" target="_blank">ZK Query Language</a>.

Another possibility to customize your Smart Contract involves setting different ZK requests. First of all, multiple `REQUEST_ID` must be defined inside the main Smart Contract. Therefore, the contract deployer can set a different query for each request ID and create different outcomes inside `_afterProofSubmit` according to the type of proof received. For example, an airdrop contract can verify the role of a user inside a DAO and distribute a different amount of tokens based on the role.

## Estimated Gas Costs for On-Chain Verifier
While it is clear that gas cost is highly dependent on the complexity of the logic that you add to the `_afterProofSubmit` and `_beforeProofSubmit` functions, the sample code for the on-chain verifier in this tutorial costs approximately 700k gas to execute on-chain. The zk proof verification function specifically costs approximately 520k gas. The above estimates are accurate as of January 2024.

