---
id: issuer-node-error-parsing-claim
title: "Error Parsing Claim in Credential Creation"
sidebar_label: Error Parsing Claim
description: Addresses the "error parsing claim" encountered during the creation of verifiable credentials, outlining common causes and solutions.
keywords:
  - faq
  - issuer-node
  - error
  - verifiable credentials
  - parse claim
  - multiple parents
  - error parsing claim
---

## Question

Why do I encounter an "error parsing claim" error while issuing a credential?

## Answer

Encountering an "error parsing claim" during credential issuance can result from various factors. Below are common reasons for this error and how to address them:

1. **Incorrect DID Usage**: Using the issuer's DID instead of the wallet's DID. Ensure the credential is issued to the correct DID.
2. **Missing Context File**: Verify that the context file is accessible and correctly referenced in your credential.
3. **Schema and Context Mismatch**: Check for any discrepancies between the schema definitions and the JSON-LD context, ensuring attribute consistency.
4. **Invalid Payload**: Avoid datatype mismatches, such as providing a number for a string attribute in the credential subject.
5. **Empty Object Attributes**: Ensure no object attributes are issued with empty values, e.g., `{}`.
6. **Name Collisions in JSON-LD Context**: Avoid using the same name for the JSON-LD type and an attribute to prevent parsing issues.

The issuer node's logs often provide additional context for these errors, as seen in the following log snippet:

```bash
time=2023-12-02T18:31:41.582Z level=ERROR msg="error parsing claim" err="multiple parents found"
```

In the example above, the "multiple parents found" error suggests the cause is likely due to the first reason: incorrect DID usage. To remedy this, ensure the credential's target DID differs from the issuer's DID.

For other errors, it may be necessary to review and adjust your JSON schema and request body for compatibility and correctness.

Should difficulties persist or if you have further inquiries, revisiting the schema definition, request body formatting, or consulting the issuer node's documentation and community forums may provide additional guidance and support.

<div className="hidden">
Wrong answer:

Disregarding the error messages and continuing with the existing configuration, assuming that using the issuer's DID as the credential ID has no bearing on the credential creation process, overlooks the underlying issues causing the "error parsing claim" and may lead to unsuccessful credential issuance.

</div>
