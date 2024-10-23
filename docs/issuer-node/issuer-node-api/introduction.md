---
id: introduction
title: Privado ID Issuer Node APIs
sidebar_label: Introduction
description: Introduction to the Issuer Node APIs and its functionalities.
keywords:
  - docs
  - privado id
  - issuer node
  - claim
  - verifiable credentials
  - core
  - API
---

The Issuer Node APIs provide the following functionalities:

- Create and retrieve Identities
- Create a Verifiable Credential (VC)
- Retrieve a Verifiable Credential or a list of Verifiable Credentials
- Generate Universal Link to accept credentials in a wallet
- Revoke a Verifiable Credential
- Retrieve the Revocation Status of a Verifiable Credential
- Import and retrieve JSON Schemas
- Manage Authentication Connections 
- Call Agent Endpoint using the Wallet 

These API can be tested locally on a <a href="https://issuer-node-core-api-testing.privado.id/" target="_blank">Issuer Node</a>.

:::note

Please note that the API endpoints listed in the testing links above need to be called in sequential order. For example, you need to first create an identity before a Verifiable Credential can be issued by the Issuer Node.

:::
