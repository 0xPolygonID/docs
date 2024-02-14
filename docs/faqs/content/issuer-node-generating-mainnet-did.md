---
id: issuer-node-generating-mainnet-did
title: "Generating an Issuer DID for the Main Network"
sidebar_label: Main Network DID Generation
description: Steps to generate an issuer DID for the main network.
keywords:
  - faq
  - mainnet
  - issuer-node
  - DID generation
  - .env-api
---

## Question

How can I generate a DID for the Main network?

## Answer

To generate an issuer DID for the Main network, update the `ISSUER_API_IDENTITY_NETWORK` variable in the `.env-api` file to `main`. Afterward, restart the Docker containers (`issuer_api-ui`, `issuer_ui`, `issuer_notifications`, and `issuer_pending_publisher`) to ensure the new configuration is applied.
