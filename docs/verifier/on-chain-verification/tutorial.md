---
id: tutorial
title: On-chain verification Tutorial
sidebar_label: Tutorial
description: On-chain verification tutorial.
keywords:
  - docs
  - privado id
  - ID holder
  - issuer
  - verifier
  - on-chain
---



## Implementing an ERC20 ZK Airdrop

In this tutorial, we will create an ERC20 ZK Airdrop Contract. The chosen query criterium is to be born before `01/01/2002`. Users that can prove that they were born before that date will be able to get the airdrop. Otherwise, they will not. The proof submitted to the Smart Contract will not reveal any information about the specific date of birth of the user as we are using zero knowledge.

:::note

To set up a different query check out the [<ins>ZK Query Language section</ins>](/docs/verifier/verification-library/zk-query-language.md).

:::

This tutorial is based on the verification of a Credential of Type `KYCAgeCredential` with an attribute `birthday` with a Schema URL `https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld`.

The prerequisite is that users have the [Polygon ID Wallet app](/docs/wallet/wallet-overview.md) installed and self-issued a Credential of type `KYC Age Credential Merklized` using our [Demo Issuer](https://issuer-demo.polygonid.me/)

:::note

Some executable code related to this tutorial is in <ins><a href="https://github.com/0xPolygonID/contracts" target="_blank">this repository</a></ins>.

:::


## Design the ERC20 zk Airdrop Contract with ZK-proof verification

### Embedded ZKPVerifier Smart Contract
This is an abstract smart contract, which implements the logic of verifying ZK Proofs and saving the verification result. It is designed to be inherited by another smart contract with own business logic, which may consume proof verification functionality.

The contract is designed to work with different ZK Validator contracts and different proof requests, both or which are set by the contract owner.

### Universal Verifier Smart Contract
This smart contract implements the same functionality as `EmbeddedZKPVerifier` Smart Contract, however it is not an abstract but a standalone contract.

The `UniversalVerifier` is designed to be used by multiple external contracts. Not only a `UniversalVerifier` owner but actually any address can set a `ZKPRequest` in `UniversalVerifier`. The only restriction for the proof request at the moment is that it should use a ZK Validator, which is whitelisted. The whitelisting is managed by the contract owner. 

### Let us jump into the code by writing the ERC20Verifier contract in each of the two ways.

#### Inheriting EmbeddedZKPVerifier abstract smart contract

We'll create a `ERC20Verifier`, which is an ERC20 standard contract. The extra functionality is given by the zero-knowledge proof verification. All the functions dedicated to the ZK verification are contained inside the `EmbeddedZKPVerifier` Contract and inherited within the `ERC20Verifier`. For example, users will submit their proof to claim the airdrop by calling `submitZKPResponse`.

The `ERC20Verifier` contract must define at least a single `TRANSFER_REQUEST_ID`. This is the Identifier of the request that the contract is making to the user.

The `EmbeddedZKPVerifier` Contract provides 2 hooks: `_beforeProofSubmit` and `_afterProofSubmit`.

These hooks are called before and after any proof gets submitted and can be used to create personalized logic inside your Smart Contract. In this specific case, it must be checked that the sender of the proof matches the address contained in the proof challenge. This requirement is necessary to prevent proof front-running. This condition is added inside `_beforeProofSubmit`.

In this specific example, the airdrop token minting is inside `_afterProofSubmit`, which is executed if the proof is correctly verified. Of course, the airdrop logic can be personalized according to the needs of the project. As another option, you may mint tokens to a user via a separate `mint` function call if the user address was verified before.

Finally, we will add another element of security inside the Smart Contract: prevent any type of token transfer unless there is a proof verification from a destination address. This last condition is added by overriding the ERC20 `_update` function and checking that the receiver address `to` of the transfer is included inside the `proofs` mapping.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import {ERC20Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import {PrimitiveTypeUtils} from '@iden3/contracts/lib/PrimitiveTypeUtils.sol';
import {ICircuitValidator} from '@iden3/contracts/interfaces/ICircuitValidator.sol';
import {EmbeddedZKPVerifier} from '@iden3/contracts/verifiers/EmbeddedZKPVerifier.sol';
contract ERC20Verifier is ERC20Upgradeable, EmbeddedZKPVerifier {
   uint64 public constant TRANSFER_REQUEST_ID_SIG_VALIDATOR = 1;
   uint64 public constant TRANSFER_REQUEST_ID_MTP_VALIDATOR = 2;
   /// @custom:storage-location erc7201:polygonid.storage.ERC20Verifier
   struct ERC20VerifierStorage {
      mapping(uint256 => address) idToAddress;
      mapping(address => uint256) addressToId;
      uint256 TOKEN_AMOUNT_FOR_AIRDROP_PER_ID;
   }
   // keccak256(abi.encode(uint256(keccak256("polygonid.storage.ERC20Verifier")) - 1)) & ~bytes32(uint256(0xff))
   bytes32 private constant ERC20VerifierStorageLocation =
   0x3b1c3bd751d9cd42a3739426a271cdc235017946663d56eeaf827d70f8b77000;
   function _getERC20VerifierStorage() private pure returns (ERC20VerifierStorage storage $) {
      assembly {
         $.slot := ERC20VerifierStorageLocation
      }
   }
   modifier beforeTransfer(address to) {
      require(
         isProofVerified(to, TRANSFER_REQUEST_ID_SIG_VALIDATOR) ||
         isProofVerified(to, TRANSFER_REQUEST_ID_MTP_VALIDATOR),
         'only identities who provided sig or mtp proof for transfer requests are allowed to receive tokens'
      );
      _;
   }
   function initialize(string memory name, string memory symbol) public initializer {
      ERC20VerifierStorage storage $ = _getERC20VerifierStorage();
      super.__ERC20_init(name, symbol);
      super.__EmbeddedZKPVerifier_init(_msgSender());
      $.TOKEN_AMOUNT_FOR_AIRDROP_PER_ID = 5 * 10 ** uint256(decimals());
   }
   function _beforeProofSubmit(
      uint64 /* requestId */,
      uint256[] memory inputs,
      ICircuitValidator validator
   ) internal view override {
      // check that challenge input is address of sender
      address addr = PrimitiveTypeUtils.uint256LEToAddress(
         inputs[validator.inputIndexOf('challenge')]
      );
      // this is linking between msg.sender and
      require(_msgSender() == addr, 'address in proof is not a sender address');
   }
   function _afterProofSubmit(
      uint64 requestId,
      uint256[] memory inputs,
      ICircuitValidator validator
   ) internal override {
      ERC20VerifierStorage storage $ = _getERC20VerifierStorage();
      if (
         requestId == TRANSFER_REQUEST_ID_SIG_VALIDATOR ||
         requestId == TRANSFER_REQUEST_ID_MTP_VALIDATOR
      ) {
         // if proof is given for transfer request id ( mtp or sig ) and it's a first time we mint tokens to sender
         uint256 id = inputs[1];
         if ($.idToAddress[id] == address(0) && $.addressToId[_msgSender()] == 0) {
            super._mint(_msgSender(), $.TOKEN_AMOUNT_FOR_AIRDROP_PER_ID);
            $.addressToId[_msgSender()] = id;
            $.idToAddress[id] = _msgSender();
         }
      }
   }
   function _update(
      address from /* from */,
      address to,
      uint256 amount /* amount */
   ) internal override beforeTransfer(to) {
      super._update(from, to, amount);
   }
   function getIdByAddress(address addr) public view returns (uint256) {
      return _getERC20VerifierStorage().addressToId[addr];
   }
   function getAddressById(uint256 id) public view returns (address) {
      return _getERC20VerifierStorage().idToAddress[id];
   }
   function getTokenAmountForAirdropPerId() public view returns (uint256) {
      return _getERC20VerifierStorage().TOKEN_AMOUNT_FOR_AIRDROP_PER_ID;
   }
}
```

#### Using Universal Verifier Smart Contract

Unlike, the previous example, the `ERC20LinkedUniversalVerifier` contract does not inherit the `EmbeddedZKPVerifier` contract. Instead, it uses the `UniversalVerifier` contract to check the proof result.

Unlike `ERC20Verifier` the `ERC20LinkedUniversalVerifier` does not need to implement the `_beforeProofSubmit` and `_afterProofSubmit` hooks as proof verification is assumed to be done directly to the `UniversalVerifier` contract by some other transaction.

In the same way the `ERC20LinkedUniversalVerifier` contract must define at least one `TRANSFER_REQUEST_ID` to get proof statuses for this request id from the `UniversalVerifier`.

In this example, you may mint tokens to a user via the `mint` function call.

Any token transfers are prevented inside `beforeTokenTransfer` modifier (which is invoked via `mint -> _mint -> update` call chain) unless there is already verification proof in UniversalVerifier, which corresponds to `msg.sender` address.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {PrimitiveTypeUtils} from '@iden3/contracts/lib/PrimitiveTypeUtils.sol';
import {ICircuitValidator} from '@iden3/contracts/interfaces/ICircuitValidator.sol';
import {EmbeddedZKPVerifier} from '@iden3/contracts/verifiers/EmbeddedZKPVerifier.sol';
import {UniversalVerifier} from '@iden3/contracts/verifiers/UniversalVerifier.sol';
contract ERC20LinkedUniversalVerifier is ERC20 {
   uint64 public constant TRANSFER_REQUEST_ID_SIG_VALIDATOR = 0;
   uint64 public constant TRANSFER_REQUEST_ID_MTP_VALIDATOR = 1;
   UniversalVerifier public verifier;
   uint256 public TOKEN_AMOUNT_FOR_AIRDROP_PER_ID = 5 * 10 ** uint256(decimals());
   modifier beforeTokenTransfer(address to) {
      require(
         verifier.getProofStatus(to, TRANSFER_REQUEST_ID_SIG_VALIDATOR).isVerified ||
         verifier.getProofStatus(to, TRANSFER_REQUEST_ID_MTP_VALIDATOR).isVerified,
         'only identities who provided sig or mtp proof for transfer requests are allowed to receive tokens'
      );
      _;
   }
   constructor(
      UniversalVerifier verifier_,
      string memory name_,
      string memory symbol_
   ) ERC20(name_, symbol_) {
      verifier = verifier_;
   }
   function mint(address to) public {
      _mint(to, TOKEN_AMOUNT_FOR_AIRDROP_PER_ID);
   }
   function _update(
      address from,
      address to,
      uint256 value
   ) internal override beforeTokenTransfer(to) {
      super._update(from, to, value);
   }
}
```

### Deploy the Contract

:::note "Hardhat"

For this tutorial, we are using the Hardhat development environment to facilitate the contract deployment. You can learn how to get started with this tool by checking [<ins>their documentation</ins>](https://hardhat.org/hardhat-runner/docs/getting-started).

:::

#### Deploy your custom contract inherited from EmbeddedZKPVerifier

Execute this Hardhat script to deploy either `ERC20Verifier`. Change the `verifierContract` variable to the desired contract name.


```js
import { ethers } from "hardhat";
import { upgrades } from "hardhat";


async function main() {
   const verifierContract = "ERC20Verifier";
   const verifierName = "ERC20zkAirdrop";
   const verifierSymbol = "zkERC20";

   const ERC20Verifier = await ethers.getContractFactory(verifierContract);
   const erc20Verifier = await upgrades.deployProxy(
           ERC20Verifier,
           [verifierName, verifierSymbol]
   );

   await erc20Verifier.waitForDeployment();
   console.log(verifierName, " contract address:", await erc20Verifier.getAddress());
}

main()
        .then(() => process.exit(0))
        .catch((error) => {
           console.error(error);
           process.exit(1);
        });
```

#### Deploy your custom contract linked to Universal Verifier smart contract

```js
import { ethers } from 'hardhat';

async function main() {
   const universalVerifierAddress = '<universal verifier address here>';
   const verifierName = 'ERC20LinkedUniversalVerifier';
   const verifierSymbol = 'zkERC20';

   const verifier = await ethers.deployContract(
           verifierName,
           [ universalVerifierAddress, verifierName, verifierSymbol ]
   );
   await verifier.waitForDeployment();
   console.log(verifierName, ' contract address:', await verifier.getAddress());
}

main()
        .then(() => process.exit(0))
        .catch((error) => {
           console.error(error);
           process.exit(1);
        });
```

:::note

The contract ERC20Verifier preferably to be deployed on the Amoi test network as there is a set of supporting validator contracts.

:::

### Set the ZKP Request  & Add the Proof Request Inside a QR Code
To set up the ZKP request and easily generate a request to present to users, please visit the "Set ZKP Request" section.

[Set ZKP Request](/docs/verifier/on-chain-verification/set-zkp-request.md)

### Things to Note

> The scope section inside the JSON file must match the query previously set when calling the `setZKPRequest` function.
Note that the request resembles, in most of its parts, the one designed for [off-chain verification](/docs/verifier/verification-library/request-api-guide.md). The extra part that has been added here is the `transcation_data` that includes:

- `contract_address`, namely the address of the Verifier contract, in this case, ERC20Verifier.
- `method_id`, namely the [Function Selector](https://solidity-by-example.org/function-selector/) of the `submitZKPResponse` function.
- `chain_id`, the ID of the chain where the Smart Contract has been deployed.
- `network`, the name of the network where the Smart contract has been deployed.

> To display the QR code inside your frontend, you can use the `express.static` built-in middleware function together with this <a href="https://github.com/0xPolygonID/tutorial-examples/tree/main/verifier-integration/js/static" target="_blank">Static Folder</a> or this [Code Sandbox](https://codesandbox.io/s/yp1pmpjo4z?file=/index.js).
Scanning the QR with their Polygon ID Wallet, users will be able to generate proofs and send transactions to the Smart Contract in order to request credentials for their airdrops.

The same proof generation request can also be delivered to users via Deep Linking. In order to do so, it is necessary to [encode](https://www.base64encode.org/) the JSON file to Base64 Format. The related deep link would be `iden3comm://?i_m={{base64EncodedJsonHere}}`. For example, in this specific case the deep link would be: `iden3comm://?i_m=ewogICAgImlkIjogIjdmMzhhMTkzLTA5MTgtNGE0OC05ZmFjLTM2YWRmZGI4YjU0MiIsCiAgICAidHlwIjogImFwcGxpY2F0aW9uL2lkZW4zY29tbS1wbGFpbi1qc29uIiwKICAgICJ0eXBlIjogImh0dHBzOi8vaWRlbjMtY29tbXVuaWNhdGlvbi5pby9wcm9vZnMvMS4wL2NvbnRyYWN0LWludm9rZS1yZXF1ZXN0IiwKICAgICJ0aGlkIjogIjdmMzhhMTkzLTA5MTgtNGE0OC05ZmFjLTM2YWRmZGI4YjU0MiIsCiAgICAiYm9keSI6IHsKICAgICAgICAicmVhc29uIjogImFpcmRyb3AgcGFydGljaXBhdGlvbiIsCiAgICAgICAgInRyYW5zYWN0aW9uX2RhdGEiOiB7CiAgICAgICAgICAgICJjb250cmFjdF9hZGRyZXNzIjogIjxFUkMyMFZlcmlmaWVyQWRkcmVzcz4iLAogICAgICAgICAgICAibWV0aG9kX2lkIjogImI2ODk2N2UyIiwKICAgICAgICAgICAgImNoYWluX2lkIjogODAwMDEsCiAgICAgICAgICAgICJuZXR3b3JrIjogInBvbHlnb24tbXVtYmFpIgogICAgICAgIH0sCiAgICAgICAgInNjb3BlIjogWwogICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAiaWQiOiAxLAogICAgICAgICAgICAgICAgImNpcmN1aXRJZCI6ICJjcmVkZW50aWFsQXRvbWljUXVlcnlTaWdWMk9uQ2hhaW4iLAogICAgICAgICAgICAgICAgInF1ZXJ5IjogewogICAgICAgICAgICAgICAgICAgICJhbGxvd2VkSXNzdWVycyI6IFsKICAgICAgICAgICAgICAgICAgICAgICAgIioiCiAgICAgICAgICAgICAgICAgICAgXSwKICAgICAgICAgICAgICAgICAgICAiY29udGV4dCI6ICJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vaWRlbjMvY2xhaW0tc2NoZW1hLXZvY2FiL21haW4vc2NoZW1hcy9qc29uLWxkL2t5Yy12My5qc29uLWxkIiwKICAgICAgICAgICAgICAgICAgICAiY3JlZGVudGlhbFN1YmplY3QiOiB7CiAgICAgICAgICAgICAgICAgICAgICAgICJiaXJ0aGRheSI6IHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICIkbHQiOiAyMDAyMDEwMQogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICAgICAgICAidHlwZSI6ICJLWUNBZ2VDcmVkZW50aWFsIgogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgXQogICAgfQp9`


### How is the proof submission executed?

A wallet needs to call the `submitZKPResponse` function before it can submit the proof for the requirements set in the Airdrop Participation process.
This function is defined by `IZKPVerifier` interface and therefore implemented in both `EmbeddedZKPVerifier` and `UniversalVerifier` contracts. 


```solidity
 function submitZKPResponse(
     uint64 requestId,
     uint256[] memory inputs,
     uint256[2] memory a,
     uint256[2][2] memory b,
     uint256[2] memory c
 ) external;
```

## Extend it to Your Own Logic

Now that you have been able to create your first on-chain ZK-based application, you can extend it to accommodate any type of imaginable logic. The target Smart Contract doesn't have to be an ERC20 but it can be an ERC721, a DeFi pool, a voting Smart Contract or whatever contract you can think of. Equally, the query can be extended to any type of existing Credential and based on the different operators available inside the <a href="https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/" target="_blank">ZK Query Language</a>.

Another possibility to customize your Smart Contract involves setting different ZK requests. First of all, multiple `REQUEST_ID` must be defined inside the main Smart Contract. Therefore, the contract deployer can set a different query for each request ID and create different outcomes inside `_afterProofSubmit` according to the type of proof received. For example, an airdrop contract can verify the role of a user inside a DAO and distribute a different amount of tokens based on the role.

## Estimated Gas Costs for On-Chain Verifier
The general gas cost depends on the code you put into `_beforeProofSubmit` and `_afterProofSubmit` hooks. The value we observed with our tests for `submitZKPResponce` functions calls was aroung 700K gas and zk proof verification function specifically costs approximately 520k gas as of January 2024.