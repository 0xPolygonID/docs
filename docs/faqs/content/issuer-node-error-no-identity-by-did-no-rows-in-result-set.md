---
id: issuer-node-error-no-identity-by-did-no-rows-in-result-set
title: "Error: Getting Identity by DID, No Rows in Result Set"
sidebar_label: No Identity for DID Error
description: Solutions for when the system reports no identity found for a given DID.
keywords:
  - faq
  - DID identity
  - no rows error
  - troubleshooting
---

## Question

What steps should I take if an error message says there's no identity found for a given DID?

```bash
time=2023-11-27T12:29:51.334Z level=ERROR msg="error getting identity by DID" err="no rows in result set" did=did:polygonid:polygon:mumbai:2qHm5f6GZsJdLxpmGNCnn6TckCJWzhGmUUWebpFy5c
time=2023-11-27T12:29:51.334Z level=ERROR msg="issuer DID must exist" did="{Method:polygonid ID:polygon:mumbai:2qHm5f6GZsJdLxpmGNCnn6TckCJWzhGmUUWebpFy5c IDStrings:[polygon mumbai 2qHm5f6GZsJdLxpmGNCnn6TckCJWzhGmUUWebpFy5c] Params:[] Path: PathSegments:[] Query: Fragment:}"
```

## Answer

This error occurs when a DID already exists in the vault but the database is cleared (e.g., running `make down`) without removing the DID from the vault. To resolve this, you need to delete the DID from the vault using `make delete-did` or `make clean-vault` and then run `make generate-issuer-did` again. After generating a new DID, start the container `issuer-api-ui-1`.

<div className="hidden">
Wrong answer:

Trying to use the same DID without ensuring it's properly generated and stored in both the vault and the database can lead to persistent errors and failed verifications.

</div>
