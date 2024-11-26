---
id: quick-start-demo
title: Quick Start Demo
sidebar_label: Quick Start Demo
description: A quick demonstration of Privado ID's main features.
keywords:
  - docs
  - privado id
  - ID holder
  - issuer
  - verifier
  - wallet
  - credential
  - schema
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This tutorial is a quick demonstration of some of Privado ID's main functionalities. To illustrate how Privado ID works, we will walk you through some of its products and tools by following along a simple POAP use case.
POAP stands for Proof of Attendance Protocol, which is used to prove that someone has taken part in a given event.

This guide will briefly touch on the 3 roles of the [Triangle of Trust](introduction.md#core-concepts-of-privado-id-verifiable-credentials-identity-holder-issuer-and-verifier), namely the Identity Holder, the Issuer and the Verifier. For that, we will take the case of an individual who needs to prove that they were able to participate in a particular event.

These are the steps we will cover in this article:

1. [Set up a Privado ID wallet](#set-up-a-privado-id-wallet)
2. [Issue a new credential to attest to the ID Holder's attendance to the event](#issue-a-new-credential-to-attest-to-the-id-holders-event-attendance)
3. [Fetch the newly created credential](#fetch-the-newly-created-credential)
4. [Verify the ID holder credential](#verify-the-id-holder-credential)

## Set up a Privado ID wallet

To store verifiable credentials, the Identity Holder (the individual receiving the credential) needs a compatible wallet. Here, we’ll use the Privado ID Wallet, which supports both mobile and web-based access.
:::note

You can also use any Privado ID compatible wallet. Please, check our [<ins>Ecosystem page</ins>](https://marketplace.privado.id/ecosystem) for other options.

:::

To get started with the Privado ID Wallet, you can either visit the [Privado ID Web Wallet](https://wallet.privado.id/) in your browser or download the mobile app and create an Identity.

- Web Browser: <a href="https://wallet.privado.id/" target="_blank">Privado ID Web Wallet</a>
- For Android: <a href="https://play.google.com/store/apps/details?id=id.privado.wallet" target="_blank">Privado ID Wallet App on Google Play</a>
- For iOS: <a href="https://apps.apple.com/us/app/privadoid/id6566184703" target="_blank">Privado ID Wallet App on the App Store</a>


:::note
- The Privado ID Web Wallet is a web based identity wallet. It is a reference implementation built using our [<ins>JS SDK</ins>](/docs/js-sdk/js-sdk-overview.md). Learn more about the Web Wallet [<ins>here</ins>](/docs/wallet/web-wallet.md).
- Privado ID Wallet App is an implementation of the [<ins>Wallet SDK</ins>](/docs/category/wallet-sdk), as a way of showcasing its possibilities. Learn more about the Wallet App [<ins>here</ins>](/docs/wallet/wallet-app/privadoid-app.md).
:::

## Issue a new credential to attest to the ID Holder's event attendance

A trusted entity, for instance, a private institution will now play the role of an issuer. It will be responsible for creating the credential and sending it to the ID Holder.

We are using <a href="https://issuer-demo.privado.id/">the Issuer Node UI Demo environment</a> to manage credentials. This is the place where you as an issuer can can create and manage identities and credentials, generate connections and manage schemas.

However, if you are using a new credential type, you actually need to create a schema for that credential, which basically is the set of JSON files that gather all the attributes of that specific credential.

To facilitate this issuance process, we have already created the credential schema with schema type POAP01 whose URLs are the following:

- JSON schema URL
  `ipfs://QmTSwnuCB9grYMB2z5EKXDagfChurK5MiMCS6efrRbsyVX`
- JSON-LD Context
  `ipfs://QmdH1Vu79p2NcZLFbHxzJnLuUHJiMZnBeT7SNpLaqK7k9X`

:::note

To learn how to set up your own issuer environment by deploying an issuer node, visit the [<ins>Issuer section in the documentation</ins>](./issuer/issuer-overview.md).

:::

:::info

The schema used in this demo was built using the Privado ID Schema Builder and is available on [<ins>the Privado ID Schema Explorer</ins>](https://tools.privado.id/schemas/1fa99457-b2ae-4884-ae12-d658bd6abf69). Learn more about creating new schemas on [<ins>the Schema Builder UI guide</ins>](/docs/issuer/schema-builder/).

:::

### Issue a new credential to attest to the ID Holder's attendance to the event

With the new schema in hand, the issuer should now be able to generate a credential.

1. First, go to the <a href="https://issuer-demo.privado.id/">the Issuer Node UI testing environment</a>.

   :::warning

   This Issuer Node is publicly available and used only for testing purposes. Do not use personal or sensitive data. All data is deleted every 48 hours.

   :::

2. Now you need to import the schema. Click on **Import Schema** and paste our previously generated schema IPFS address `ipfs://QmTSwnuCB9grYMB2z5EKXDagfChurK5MiMCS6efrRbsyVX`:

   <div align="center">
       <img width="100%" src={useBaseUrl("img/quick-start-demo/import-schema.png")}></img>
   </div>

   You may preview the schema and then Import it.

3. You can go ahead and click on **Issue Credential** in the top righ-hand corner. Choose **Credential Link** on the next page and your schema on the dropdown menu ("POAP01", in our case). For this credential, we are providing a proof of attendance to an event in Paris:

<div align="center">
    <img width="500" src={useBaseUrl("img/quick-start-demo/create-credential.png")}></img>
</div>

4. After you click on **Create Credential Link**, you'll be presented with a Universal Link and a Deep Link to the credential offer, along with a QR code configured for these links. The QR code can be scanned directly with the Privado ID Wallet app.

    :::info

    When the user interacts with the [<ins>Universal Link</ins>](/docs/wallet/universal-links.md) , it will launch the Privado ID Web Wallet in the browser or Privado ID Wallet app in case of a mobile phone displaying the credential offer to claim the credential. Deep link could be handled only by mobile wallet app though.

    :::

    <div align="center">
    <img width="500" src={useBaseUrl("img/quick-start-demo/qr.png")}></img>
    </div>

## Fetch the newly created credential

Now we are back to the ID Holder role. You can either use the Web Wallet on the browser or the Wallet App to accept the credential via the link or the QR code generated by the issuer in the last step.

:::note
To sync the identity and its associated credentials between the Privado ID Web Wallet and the Privado ID Wallet App, the user must log in with the same crypto wallet account on both platforms. Once you claim a credential on one platform, it will be visible on the other.
:::

#### Web Wallet

After clicking the Universal link, it will take you to the Web Wallet. Click **Sign In** and connect your crypto wallet such as Metamask. Click **Add to my wallet**. This should add the credential to your wallet.


<div align="center">
    <img src={useBaseUrl("img/quick-start-demo/web-wallet.png")}></img>
</div>

Click on **Manage your credentials** to view and manage the credential in the Web Wallet.

<div align="center">
    <img  src={useBaseUrl("img/quick-start-demo/web-wallet-2.png")}></img>
</div>

#### Mobile Wallet App

Alternatively, Scan the QR code from the Wallet App. Click **Sign In**. This should authenticate and add the credential to the Wallet.

<div align="center">
    <img src={useBaseUrl("img/quick-start-demo/wallet-app.png")}></img>
</div>


## Verify the ID holder credential

Here comes the third role in this tutorial: the verifier. This could be represented by an organization that needs to verify some details of someone's credentials. In our use case, this organization wants to verify whether the ID holder actually attended our made-up Paris event.

Here are the steps to verify the credential:

1. Visit the [Query builder website](https://tools.privado.id/query-builder/). The [Query Builder](/docs/verifier/query-builder/) is a tool designed to simplify the creation of verification queries.

<div align="center">
    <img width="600" src={useBaseUrl("img/quick-start-demo/verifier-home.png")}></img>
</div>

2. You now need to define the query. You will now make use of the JSON-LD URL which we have also provided: `ipfs://QmdH1Vu79p2NcZLFbHxzJnLuUHJiMZnBeT7SNpLaqK7k9X`. Here is how the query should look like:

<div align="center">
    <img width="600" src={useBaseUrl("img/quick-start-demo/verifier-query-1.png")}></img>
</div>

3. Click **Create Query**. Now click **Test query** button which will take you the Privado ID Web Wallet

<div align="center">
    <img width="600" src={useBaseUrl("img/quick-start-demo/verifier-query-2.png")}></img>
</div>

4. Click **Sign in** and connect your crypto wallet. As you have already claimed the credential, it shows as 'claimed'. Click **Verify**, after which the process of generating the proof starts.

<div align="center">
    <img width="900" src={useBaseUrl("img/quick-start-demo/web-wallet-verification.png")}></img>
</div>

5. Finally, the proof is generated and sent to the verifier. The verifier will then check the revocation status and any additional information to validate the proof. You will receive the following response on the Query Builder website:
<div align="center">
    <img width="600" src={useBaseUrl("img/quick-start-demo/verifier-validation.png")}></img>
</div>

Alternatively, you can also use Privado ID Wallet app to verify.
After Step 3, once you are redirected to Web Wallet, click on **Continue via app**,
this should present a QR code. Open the Privado ID Wallet App and scan the QR code.
Click on **Verify**
<div align="center">
    <img width="900" src={useBaseUrl("img/quick-start-demo/wallet-app-verification.png")}></img>
</div>


<br></br>

This quick-start guide demonstrates Privado ID’s basic functionalities through a POAP use case, covering wallet setup, credential issuance, retrieval, and verification. While this is a simplified example, Privado ID provides a comprehensive suite of SSI tools for managing decentralized identity and verifiable credentials.


