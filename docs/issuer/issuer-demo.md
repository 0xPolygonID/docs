---
id: issuer-demo
title: Demo Issuer
sidebar_label: Demo Issuer
description: Demonstration of an Issuer.
keywords:
  - docs
  - optimism id
  - issuer
  - claim
  - demo
---

The [Demo Issuer](https://issuer-demo.optimismid.me/) is a playground that allows you to create credentials without having to set up an Issuer Node and fetch it inside your wallet.

## Prerequisites

Download the optimism ID Wallet App and create an Identity.

- For Android: [optimism ID on Google Play](https://play.google.com/store/apps/details?id=com.optimismid.wallet)
- For iOS: [optimism ID on the App Store](https://apps.apple.com/us/app/optimism-id/id1629870183)

## Quick Start

To create a credential, you require a schema that contains semantics of the JSON vocabulary and is used to describe a large number of data sets. The schema contains links to JSON-LD Context and JSON URL.

For this tutorial, we will be using a customized Schema named `ProofOfDaoLongevity` that attests to someone's `entryDate` inside a DAO. You can find more info about that schema and how to [create a custom Schema](schema.md).

To create a credential, the optimism ID app must be installed on your mobile.

1. On the [Issuer website](https://issuer-demo.optimismid.me/), click **Sign up**.

   ![](/img/signup.png)

   It shows the QR code on screen:

   ![](/img/qr-code-display.png)

2. Open the optimism ID app and authenticate with PIN/Biometrics.

   ![](/img/authenticate.png)

3. On the app, click **Connect**.

   ![](/img/connect.jpg)

4. With the app, scan the QR code displayed on the site and click **Connect Wallet**.

   ![](/img/connect-wallet.jpg)

5. Authenticate again with your PIN/Biometrics. This starts the authentication of the user's wallet.

   ![](/img/authenticating.png)

   After the authentication process is complete, the app shows the message if the identity is successfully authenticated or if it failed to authenticate.

   ![](/img/authenticated.png)

   At this point, the Issuer has received information about your Identifier (DID) and can use it as the subject of the credential that will be issued in the next step.

6. On the website, click on **Create Claim**.

   ![](/img/create-credentials.png)

   This shows the **Create Claim** window:

   ![](/img/create-cred-window.png)

7. Click on the **Schema** dropdown menu and select the type of schema you want to use for creating credentials.

   Two schemas types are already available in the drop-down menu: **KYCAgeCredential** and **KYCCountryOfResidenceCredential**.

   If you want to use a custom schema, select **Custom** from the drop-down menu.

   For this example, we are using the `ProofOfDaoLongevity` schema created in the [Create Custom Schemas](schema.md) tutorial.

   The menu needs to be populated with the JSON Schema URL and the Type of the schema. Which in this case are:

   - `https://raw.githubusercontent.com/0xoptimismID/tutorial-examples/main/credential-schema/proof-of-dao-longevity.json`
   - `ProofOfDaoLongevity`

   The **expiration** date sets the date on which the credential will expire.

   The **Data JSON** contains the actual data that the credential is attesting to. In this case, the credential contains a single field `entryDate` that needs to be populated with the date the user joined the DAO.

   Once filled up, click **Submit**.

   ![](/img/select-schema.png)

   This creates a new credential. Scan the QR code from the wallet app to fetch the credential in the wallet.

   ![](/img/credential-created.png)

8. Once a credential is created, you can view it on the Issuer site. For this, click the icon to open and view the credential.

   ![](/img/open-credential-link.png)

This shows all the information related to a credential; this includes:

- @Context (JSON-LD Schema) and CredentialSchema (JSON) URLs
- credentialStatus: URL to fetch the [Revocation](https://docs.iden3.io/getting-started/claim-revocation/) status of the credential from the Issuer along with the revocation nonce.
- credentialSubject: Information related to the Subject of the Credential. In this example, this includes subject's `entryDate` and id of the Subject in the `did` format.
- Other information such as expiration date of the credential, issuance date, and ID of the Issuer in the `did` format.
- Proof which includes information such as state of the issuer identity published on-chain, the non-revocation proof for the [authorization claim](https://docs.iden3.io/getting-started/claim/auth-claim/), and the actual credential [signed](https://docs.iden3.io/getting-started/signature-claim/signature/) by the Issuer.
