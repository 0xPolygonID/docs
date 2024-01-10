---
id: faq-issuer-did-does-not-exist
title: Issuer DID doesn't exist in the database
sidebar_label: FAQs
description: The provided did in the .env-api does not exist in the database.
keywords: 
  - docs
  - polygon id
  - issuer
  - faqs
  - questions
---

## Title
Issuer DID doesn't exist in the database

## Description
The given error is thrown when the issuer did provided in the .env-api file does not exist in the database. This error is thrown when the issuer node is started as it's checked that the provided did exists.

## Correct answer
In order to solve this issue, you will need to create the issuer did in the database. To do so, you will need to run the following command:

```bash
make generate-issuer-did
```

## Wrong answer
Replace the did in the .env-api file with another one that neither exists in the database or remove it from the file and leave it blanc.