---
id: faq-cannot-creat-identity
title: Cannot create identity
sidebar_label: FAQs
description: Cannot create identity due to error publishing state to RHS.
keywords: 
  - docs
  - polygon id
  - issuer
  - faqs
  - questions
---

## Title
Cannot create identity due to error publishing state to RHS.

## Description
When trying to create an identity with the core api the following error is seeing in the logs 

```bash
msg="publishing state to RHS" err="unexpected status code: 404"
```

## Correct answer

This error is caused due to the fact that the provided value of `ISSUER_CREDENTIAL_STATUS_RHS_MODE` is `OffChain` and the provided `ISSUER_CREDENTIAL_STATUS_RHS_URL` is not valid.

In order to solve this check the different revocation [status modes](../../../docs/issuer/issuer-configuration.md/#revocation-status) and choose the one that fits your needs.

## Wrong answer

Replace the RHS URL with the Issuer Node URL or remove the `ISSUER_CREDENTIAL_STATUS_RHS_URL` from the .env-issuer file.