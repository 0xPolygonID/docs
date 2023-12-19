---
id: setup-issuer-ui
title: Set up the Issuer UI 
sidebar_label: Setup Guide
description: Learn how to set up an Issuer UI API and a user interface.
keywords: 
  - docs
  - polygon id
  - issuer node
  - claim
  - verifiable credentials
  - UI
  - API
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This article details the steps to achieve full integration of the Issuer Node with the Polygon ID APIs, as well as instructs on how to set up an intuitive user interface to manage credentials.

:::caution

The content of the QR code provided by the Issuer or Verifier has changed since the <ins>[release 2.3.0 of the Issuer node](https://github.com/0xPolygonID/issuer-node/releases/tag/v2.3.0)</ins>. Instead of sending the JSON information through the QR code, now we provide an embedded link to a page where this JSON is hosted, which improves the application performance.  Please check the <ins>[IDEN3MESSAGE_PARSER.md](https://github.com/0xPolygonID/polygonid-flutter-sdk/blob/main/IDEN3MESSAGE_PARSER.md)</ins> file for more information on how to parse the new QR code content.

:::

## Installation

There are two options for installing and running the UI:

1. [Docker Setup Guide](https://github.com/0xPolygonID/issuer-node)
2. [Standalone Mode Guide](#standalone-mode-guide)

:::note
We encourage the use of **Standalone** for production environments.
:::

**For either one, you first have to [clone the repository](https://github.com/0xPolygonID/issuer-node).**


## Standalone Mode Guide

### Standalone Mode Guide Requirements

 - Have followed the [Core-API Standalone Mode Guide](setup-issuer-core.md#standalone-mode-guide). (Step 4 of the Standalone Mode Setup is not mandatory as the UI uses an extended version of the Core API)
 - [npm](https://www.npmjs.com/) installed

### Standalone Mode Setup

1. Env file configuration:
  
  *.env-api*
  ```bash
  ISSUER_API_UI_SERVER_URL=<PUBLICLY_ACCESSIBLE_URL_POINTING_TO_ISSUER_API_UI_SERVER_PORT>
  ```

2. Create an identity as your issuer DID.
    ```bash
      make generate-issuer-did
    ```
3. Run `./bin/platform_ui` command to start the issuer-ui API.
4. Configure and deploy the UI
  
  Completing the [installation](#installation) process yields the UI as a minified Javascript app. Any changes to the UI source code would necessitate a full re-build to apply them. In most development scenarios this is undesirable, so the UI app can also be run in development mode like any [React](https://react.dev/) application to enable hot module replacement ([HMR](https://webpack.js.org/guides/hot-module-replacement/)).

  4.1. Make sure that the UI API is set up and running properly (default http://localhost:3002).
  
  4.2. Go to the `ui/` folder.
  
  4.3. Copy the `.env.sample` file as `.env`
  
  4.4. The UI requires some of the configurations already present in the parent folder files `.env-api` and `.env-ui`. Here it's the list of variables required by the UI and the mapping between them and the variables present in the parent config files, grouped by file. Please make sure the values match.

  Variables from `.env-api`:

      - `VITE_API_URL -> ISSUER_API_UI_SERVER_URL`
      - `VITE_API_USERNAME -> ISSUER_API_UI_AUTH_USER`
      - `VITE_API_PASSWORD -> ISSUER_API_UI_AUTH_PASSWORD`
      - `VITE_ISSUER_NAME -> ISSUER_API_UI_ISSUER_NAME`
      - `VITE_ISSUER_LOGO -> ISSUER_API_UI_ISSUER_LOGO`
      - `VITE_ISSUER_DID -> ISSUER_API_UI_ISSUER_DID`

  Variables from `.env-ui`:

      - `VITE_BLOCK_EXPLORER_URL -> ISSUER_UI_BLOCK_EXPLORER_URL`
      - `VITE_BUILD_TAG -> ISSUER_UI_BUILD_TAG`
      - `VITE_WARNING_MESSAGE -> ISSUER_UI_WARNING_MESSAGE`
      - `VITE_IPFS_GATEWAY_URL -> ISSUER_UI_IPFS_GATEWAY_URL`
      - `VITE_SCHEMA_EXPLORER_AND_BUILDER_URL -> ISSUER_UI_SCHEMA_EXPLORER_AND_BUILDER_URL`
  
  4.5. Run `npm install`
  
  4.6. Run `npm start`
  
  4.7. The app will be running on http://localhost:5173.

> **API UI specification** - [http://localhost:3002/](http://localhost:3002/)
>
> **UI** - [http://localhost:8088/](http://localhost:8088/)
  


---

### Related guides: 

[How to Set Up Issuer Node Core API Guide](setup-issuer-core.md)

[Advanced Issuer Node Configuration](issuer-configuration.md)

[Quick Start Demo](../quick-start-demo.md)