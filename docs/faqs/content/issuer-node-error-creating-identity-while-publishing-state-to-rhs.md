---
id: issuer-node-error-creating-identity-while-publishing-state-to-rhs
title: Error Publishing State to RHS When Creating Identity
sidebar_label: Error Publishing to RHS
description: Resolving the error encountered when publishing state to the RHS during identity creation.
keywords:
  - faq
  - issuer-node
  - error
  - identity creation
  - RHS
  - Reverse Hash Service
---

## Question

Why do I encounter an error stating "unexpected status code: 404" when trying to create an identity, specifically while publishing the state to the Reverse Hash Service?

## Answer

The error you're experiencing is typically due to an incorrect configuration of `ISSUER_CREDENTIAL_STATUS_RHS_MODE` and an invalid `ISSUER_CREDENTIAL_STATUS_RHS_URL`. This occurs when `ISSUER_CREDENTIAL_STATUS_RHS_MODE` is set to `OffChain`, but the provided RHS URL is not a valid endpoint.

To resolve this issue, check your `.env-issuer` file for the `ISSUER_CREDENTIAL_STATUS_RHS_MODE` value. If it is set to `OffChain`, you must specify a valid Reverse Hash Service Endpoint in `ISSUER_CREDENTIAL_STATUS_RHS_URL`. For example, you could use our staging RHS: `https://rhs-staging.polygonid.me/`.

If your `ISSUER_CREDENTIAL_STATUS_RHS_MODE` is configured for on-chain operation, ensure you have the correct smart contract information for your network, such as Mumbai:

- `ISSUER_CREDENTIAL_STATUS_ONCHAIN_TREE_STORE_SUPPORTED_CONTRACT`=0x76EB7216F2400aC18C842D8C76739F3B8E619DB9
- `ISSUER_CREDENTIAL_STATUS_RHS_CHAIN_ID`=8001

Choosing `ISSUER_CREDENTIAL_STATUS_RHS_URL=None` indicates that the issuer node will handle revocation credential status resolution internally, and no further RHS setup is required.

For a comprehensive understanding and configuration guidance, please review the available revocation status modes. Detailed instructions can be found in the [Revocation Status Modes documentation](../../../docs/issuer/issuer-configuration.md/#revocation-status).

<div className="hidden">
Wrong answer:

Simply replace the RHS URL with the Issuer Node URL or remove the `ISSUER_CREDENTIAL_STATUS_RHS_URL` from your .env-issuer file without adjusting the `ISSUER_CREDENTIAL_STATUS_RHS_MODE` setting or ensuring the RHS endpoint's validity.

</div>
