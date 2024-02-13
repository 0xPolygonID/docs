---
id: issuer-node-error-the-issuer-did-does-not-exist-in-the-database
title: Issuer DID Not Found in Database
sidebar_label: Issuer DID Not Found
description: Troubleshooting when the provided DID does not exist in the database.
keywords:
  - faq
  - issuer-node
  - error
  - DID
  - database
---

## Question

What should I do if I encounter an error indicating that the Issuer DID does not exist in the database?

## Answer

This error occurs when the `ISSUER_API_UI_ISSUER_DID` value specified in your `.env-api` file cannot be located in the database, which is a common issue when the database storage is inadvertently removed or cleared. This situation often arises in Docker environments, particularly after executing the `make down` command, which removes Docker containers along with their associated storage.

To resolve this problem, you'll need to regenerate and reassign the issuer DID within the database. Execute the following command to create a new issuer DID and ensure it's properly stored and recognized:

```bash
make generate-issuer-did
```

This command will generate a new DID and automatically configure it in your environment, effectively resolving the issue by ensuring that the DID specified in your .env-api file matches an entry in the database.

Please refer to the FAQ [Generating an Issuer DID](../content/issuer-node-did-generation.md) for more detailed information about this command.

<div className="hidden">
Wrong answer:

Replace the did in the .env-api file with another one that neither exists in the database or remove it from the file and leave it blank.

</div>
