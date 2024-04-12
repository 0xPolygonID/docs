---
id: on-chain-tutorial
title: Tutorial
sidebar_label: Tutorial
description: Learn how on-chain issuance works on Polygon ID through a simple tutorial.
keywords:
  - docs
  - polygon id
  - on-chain issuer
  - claim
  - verifiable credentials
  - smart contract
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Currently, we have two approaches to issuing on-chain credentials: **on-chain merklized issuer** and **on-chain non-merklized issuer**.
The difference between these two approaches:

1. The **on-chain merklized issuer** calculates the Merkle root for a credential on the backend and stores the core claim of the credential on-chain using a smart contract, because merklization process is too expensive to do in a smart contract by the user. Credential data and metadata can stay private on issuer side and only hash of the credential will be published on chain. We can think of it as a centralized issuer with the ability to store trees on the blockchain.

   - [demo](https://github.com/0xPolygonID/onchain-merklized-issuer-demo)
   - [contract](https://github.com/0xPolygonID/contracts/blob/main/contracts/examples/IdentityExample.sol)

1. The **on-chain non-merklized issuer** can use information from the blockchain (such as balance, token ownership, etc.) to issue a credential directly on the blockchain. This approach is decentralized and trustless - no need to trust an issuer to act honestly, because it's enforced by the smart contract and auditable on chain. But it comes with a few limitations: max 4 data fields in the credential and data is public. More about [**non-merklized credentials**](https://docs.iden3.io/protocol/non-merklized/).
   - [demo](https://github.com/0xPolygonID/onchain-nonmerklized-issuer-demo)
   - [contract](https://github.com/0xPolygonID/contracts/blob/main/contracts/examples/BalanceCredentialIssuer.sol)

This guide presents an example of how to use the **on-chain merklized issuer**. We created a small application, where we communicate with Metamask to retrieve the user's balance and a claim about this balance is generated via the on-chain issuer. In this case, the credential will be created locally and stored to **on-chain issuer**.

There are two main components in this application:

1. On-chain merklized issuer ([demo](https://github.com/0xPolygonID/onchain-merklized-issuer-demo)|[contract](https://github.com/0xPolygonID/contracts/blob/main/contracts/examples/IdentityExample.sol))
1. Front-end component for communication with Metamask

## Requirements:

1. Node js => 18.x
1. Go => 1.20.x
1. npm => 9.x.x
1. docker => 20.x
1. docker-compose => 2.23.x
1. Polygon ID wallet app
1. [Ngrok](https://ngrok.com/)

## How to run the On-chain Issuer

1. Clone this repository:

   ```bash
   git clone https://github.com/0xPolygonID/onchain-merklized-issuer-demo
   ```

1. Deploy an on-chain merklized issuer contract. You can use [this sample](https://github.com/0xPolygonID/contracts/blob/main/contracts/examples/IdentityExample.sol) or create your own smart contract with custom logic.

   Clone smart contracts repository:
   ```bash
   git clone https://github.com/0xPolygonID/contracts.git
   ```

   Deploy Identity Example contract:
   ```bash
   export AMOY_PRIVATE_KEY={private_key} && \
   export AMOY_RPC_URL={rpc_url} && \
   npx hardhat run scripts/deployIdentityExample.ts --network amoy
   ```
   
   
:::note

You can find more information on how to deploy a smart contract using Hardhat [<ins>in this readme</ins>](https://github.com/iden3/contracts#readme).

:::




   
   

1. Use the utility to calculate the issuerDID from the smart contract address:

   ```bash
   go run utils/convertor.go --contract_address=<ADDRESS_OF_IDENTITY_DEPLOYED_CONTRACT>
   ```

1. Run ngrok on 8080 port.

   ```bash
   ngrok http 8080
   ```

1. Fill the .env config file with the proper variables:

<Tabs>
<TabItem value="Polygon Mumbai">

   ```bash
   SUPPORTED_RPC="80001=<RPC_POLYGON_MUMBAI>"
   ISSUERS_PRIVATE_KEY="<ISSUER_DID>=<PRIVATE_KEY_OF_THE_CONTRACT_DEPLOYER>"
   EXTERNAL_HOST="<NGROK_URL>"
   SUPPORTED_STATE_CONTRACTS="80001=0x134B1BE34911E39A8397ec6289782989729807a4"
   ```

</TabItem>

<TabItem value="Polygon Amoy">

   ```bash
   SUPPORTED_RPC="80002=<RPC_POLYGON_AMOY>"
   ISSUERS_PRIVATE_KEY="<ISSUER_DID>=<PRIVATE_KEY_OF_THE_CONTRACT_DEPLOYER>"
   EXTERNAL_HOST="<NGROK_URL>"
   SUPPORTED_STATE_CONTRACTS="80002=0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124"
   ```

</TabItem>

<TabItem value="Polygon Main">

   ```bash
   SUPPORTED_RPC="137=<RPC_POLYGON_MAIN>"
   ISSUERS_PRIVATE_KEY="<ISSUER_DID>=<PRIVATE_KEY_OF_THE_CONTRACT_DEPLOYER>"
   EXTERNAL_HOST="<NGROK_URL>"
   SUPPORTED_STATE_CONTRACTS="137=0x624ce98D2d27b20b8f8d521723Df8fC4db71D79D"
   ```

</TabItem>
</Tabs>

1. Run docker-compose:

   ```bash
   docker-compose build
   docker-compose up -d
   ```

1. Go to: http://localhost:3000

Don't forget to download and install the Polygon ID wallet app before you go the next steps.

- For Android: <a href="https://play.google.com/store/apps/details?id=com.polygonid.wallet" target="_blank">Polygon ID on Google Play</a>
- For iOS: <a href="https://apps.apple.com/us/app/polygon-id/id1629870183" target="_blank">Polygon ID on the App Store</a>

## Issue and fetch credential

1. Open `http://localhost:3000`.

2. Select an issuer:

<div align="center">
    <img width="300" src="/img/select_an_issuer.png"></img>
</div>

3. Scan the QR code with your Polygon ID wallet app and follow the instructions on the application.

<div align="center">
    <img width="300" src="/img/onchain-issuer-2.png"></img>
</div>

4. You will see your DID and now you can connect to MetaMask. Follow the flow on the MetaMask app.

<div align="center">
    <img width="600" src="/img/onchain-issuer-3.png"></img>
</div>

5. The on-chain issuer application will now display your account. You can get your balance in gwei.

<div align="center">
    <img width="600" src="/img/onchain-issuer-4.png"></img>
</div>

6. The account balance will be shown in gwei together with some other information about the claim.

<div align="center">
    <img width="700" src="/img/onchain-issuer-5.png"></img>
</div>

7. Clicking on **Get Claim** will finally lead to the QR Code used to fetch the credential with MTP proof. Here we are making a request to the on-chain issuer node. This node then saves this claim in a contract address. Scan it with the Polygon ID wallet and the credential should be added to the mobile app.

<div align="center">
    <img width="500" src="/img/onchain-issuer-6.png"></img>
</div>

Here is the credential on the mobile app:

<div align="center">
    <img width="300" src="/img/onchain-issuer-7.png"></img>
</div>

## Use already deployed demo

You can use already deployed demo: https://onchain-merklized-issuer-demo.polygonid.me

## How to verify the balance claim

1. Go to the [Verifier website](https://verifier-demo.polygonid.me/).
1. Choose `custom` from the dropdown menu.

<div align="center">
    <img width="400" src="/img/onchain-issuer-8.png"></img>
</div>

1. Fill up the form.

   - **Circuit Id**: Credential Atomic Query MTP;
   - **URL**: https://gist.githubusercontent.com/ilya-korotya/b06baa37453ed9aedfcb79100b84d51f/raw/balance-v1.jsonld
   - **Type**: BalanceCredential
   - **Field**: balance
   - **Operator**: all the operators work for the claim. [More information here](https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/)
   - **Value**: set the value that you want to verify.

   Here is an example:

   <div align="center">
       <img width="600" src="/img/onchain-issuer-9.png"></img>
   </div>

1. Press submit.

1. Use the mobile application to scan the QR code and complete the verification process. The verifier will check the revocation status and additional information and the proof will be sent to the verifier. The Verifier website will present then the proof information.

<div align="center">
    <img width="600" src="/img/onchain-issuer-10.png"></img>
</div>
