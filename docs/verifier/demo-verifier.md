---
id: demo-verifier
title: Demo Verifier
sidebar_label: Demo Verifier
description: Demonstration of a Verifier.
keywords: 
  - docs
  - polygon id
  - verifier
  - claim
  - demo
---

The [Demo Verifier](https://verifier-demo.polygonid.me/) is a playground that allows you to create query based on a specific credential, generate QR based on that query and let the user scan the QR code to generate a zero-knowledge proof that the query is satisfied.

## Prerequisites


Download the Polygon ID Wallet App and create an Identity.

- For Android: [Polygon ID on Google Play](https://play.google.com/store/apps/details?id=com.polygonid.wallet)
- For iOS: [Polygon ID on the App Store](https://apps.apple.com/us/app/polygon-id/id1629870183)
- Have the queried credential inside your wallet. For the tutorial, we are using the `ProofOfDaoLongevity` that can be created via the [Demo Issuer](/guides/issuer/issuer-demo.md).

## Quick Start 

1. On the Demo Verifier website click on the drop-down menu and then **Custom**

    ![](/img/verifier-demo-1.png)

    Click on **Sign In**.

2. Create the query via the editor.

    The editor allows you to design the query that the user will have to satisfy. The query is created by selecting the credential type and the attribute that you want to query. More info on how to design a query are described via the [ZK Query Language](zk-query-language.md).

    In this example, we are querying the date of entry of the user inside a DAO. In particular, we want to make sure that the user joined the DAO before a specific date.
    This query is based on the `ProofOfDaoLongevity` credential type described by this [JSON-LD Context](https://github.com/0xPolygonID/tutorial-examples/blob/main/credential-schema/proof-of-dao-longevity.json-ld).

    ![](/img/verifier-demo-2.png)

    Then click **Submit**.

3. The query is then converted into a QR code that can be scanned by the user.

    ![](/img/verifier-demo-3.png)

    Once scanning the QR code with the Polygon ID app, the user will be prompted to generate a zero knowledge proof that attests that the query is satisfied without revealing any further information about the credential. For example, the actual date of entry of the user inside the DAO is not revealed to the verifier.
