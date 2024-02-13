---
id: faq-issuer-node-did-generation
title: "Generating an Issuer DID"
sidebar_label: Generating Issuer DID
description: Steps to generate an issuer DID for use with the issuer-node-ui and its backend.
keywords:
  - faq
  - issuer-node
  - DID generation
  - Docker
  - .env-issuer
  - .env-api
---

## Question

How do I generate an issuer DID for use with the issuer-node-ui?

## Answer

To generate an issuer DID when running the issuer node using Docker, Docker Compose, and a makefile, use the command `make generate-issuer-did`. This command initializes the necessary DID information, storing it in the database and updating the `.env-api` file and Vault with the generated DID.

Ensure you have the `.env-issuer` and `.env-api` files prepared with the correct values as defined in the issuer node installation process before running the command. After generation, you should verify the DID in the Vault matches the `ISSUER_API_UI_ISSUER_DID` variable in the `.env-api` file by using `make print-did`.

Remember to restart the Docker containers (`issuer_api-ui`, `issuer_ui`, `issuer_notifications`, and `issuer_pending_publisher`) after generating or updating the DID.
