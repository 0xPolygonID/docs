---
id: display-method
title: Display method
sidebar_label: Display method
description: Display method
keywords:
  - docs
  - polygon id
  - issuer node
  - claim
  - verifiable credentials
  - credential customization
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Description

To improve credential usage, a client needs to be able to customize the presentation of credentials in user wallets. A standard must be established that will guide the wallet in displaying credential cards. This will improve the user experience and allow issuers to present their own special presentation for credentials.

This tutorial will show you how to create a custom credential representation in a mobile wallet.

## Credential representation configuration

Restrictions:
1. `backgroundImageUrl` and `logo` only support .png and .jpeg formats.
2. Maximum length for `title` is 60 characters.
3. Maximum length for `description` is 120 characters.


To configure the credential representation on the PolygonID wallet, follow the steps below:
1. Upload a background and logo for the credential card to IPFS or an HTTP(s) host.
1. Create a file named metadata.json with the following content:
    ```json
    {
        "title": "KYC Country of Residence",
        "description": "Know Your Customer Verification",
        "issuerName": "PolygonID Issuer",
        "titleTextColor": "#f2743a",
        "descriptionTextColor": "#f2743a",
        "issuerTextColor": "#f2743a",
        "backgroundImageUrl": "ipfs://QmecKDMotkM8a6vxw35CB7iHfToBJnzJrPcmA3gHit9jt9",
        "logo": {
            "uri": "ipfs://QmWkSgmHbKRfhndWqHwVgfVpZSrWNiWZMTHb6k5KxY8ySc",
            "alt": "Logo PolygonID Issuer"
        }
    }
    ```
    <div align="center">
        <img src= {useBaseUrl("img/custom-credential-description.png")} align="center" />
    </div>
1. Upload the metadata.json file to IPFS or an HTTPS(s) host.
1. Use the API to issue a verifiable credential with information about the display method. You can do this using the issuer-node API:
    ```bash
    POST https://<ISSUER_NODE_ADDRESS>/v1/<ISSUER_DID>/claims
    ```
    Body:
    ```json
    {
        "credentialSchema": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json",
        "type": "KYCAgeCredential",
        "credentialSubject": {
            "id": "<USER_DID>",
            "birthday": 19960424,
            "documentType": 2
        },
        "expiration": 1735689600,
        "displayMethod": {
            "id": "<IPFS_LINK_OR_HTTP_URL_TO_METADATA_FILE>",
            "type": "Iden3BasicDisplayMethodV1"
        }
    }
    ```
1. Fetch the credential using the PolygonID mobile wallet:
    <div align="center">
        <img src= {useBaseUrl("img/custom-credential.png")} align="center" />
    </div>

Please note that you should replace placeholders like `<ISSUER_NODE_ADDRESS>`, `<ISSUER_DID>`, `<USER_DID>`, `<IPFS_LINK_OR_HTTP_URL_TO_METADATA_FILE>` with actual values as needed for your configuration.

## Links
1. [Display method](https://iden3-communication.io/display-method/overview/)
