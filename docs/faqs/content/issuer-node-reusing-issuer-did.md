---
id: issuer-node-reusing-issuer-did
title: "Reusing a Previously Used Issuer DID"
sidebar_label: Reusing Issuer DID
description: Guide on reusing a previously configured issuer DID without deleting the database.
keywords:
  - faq
  - issuer-node
  - DID reuse
  - Docker
---

## Question

How can I reuse a previously used DID with the issuer node?

## Answer

If you **have not deleted the database** and wish to reuse a previously configured issuer DID, simply update the `ISSUER_API_UI_ISSUER_DID` variable in the `.env-api` file to the old DID value. Then, restart the Docker containers (`issuer_api-ui`, `issuer_ui`, `issuer_notifications`, and `issuer_pending_publisher`) to apply the changes.

<div className="hidden">
Wrong answer:

If you want to reuse a previously used DID, it's sufficient to manually edit the database entries to reflect the old DID, bypassing the need to update environment files or restart any services. This direct database manipulation ensures immediate reuse of the DID without considering system synchronization or security implications.

</div>
