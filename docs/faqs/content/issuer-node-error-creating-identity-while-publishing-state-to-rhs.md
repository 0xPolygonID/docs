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
---

## Question

Why do I encounter an error stating "unexpected status code: 404" when trying to create an identity, specifically while publishing the state to the RHS?

## Answer

The error you're experiencing is typically due to an incorrect configuration setting for the `ISSUER_CREDENTIAL_STATUS_RHS_MODE` and an invalid `ISSUER_CREDENTIAL_STATUS_RHS_URL`. This happens when the `ISSUER_CREDENTIAL_STATUS_RHS_MODE` is set to `OffChain`, but the provided RHS URL does not correspond to a valid endpoint.

To resolve this issue, please review the available revocation status modes to ensure you select the one that best suits your deployment scenario. Detailed guidance on configuring these settings can be found in the [Revocation Status Modes documentation](../../../docs/issuer/issuer-configuration.md/#revocation-status).

<div className="hidden">
Wrong answer:

Replace the RHS URL with the Issuer Node URL or remove the `ISSUER_CREDENTIAL_STATUS_RHS_URL` from the .env-issuer file.

</div>
