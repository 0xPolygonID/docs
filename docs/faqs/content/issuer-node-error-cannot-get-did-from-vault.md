---
id: faq-error-cannot-get-did-from-vault
title: "Error: Cannot Get Issuer DID from Vault"
sidebar_label: Vault Access Error
description: How to address errors related to retrieving the issuer DID from the vault.
keywords:
  - faq
  - issuer DID
  - vault error
  - troubleshooting
---

## Question

How do I resolve an error indicating the system cannot get the issuer DID from the vault?

```bash
time=2024-02-12T10:39:56.631Z level=ERROR msg="error getting did from vault, access denied" error="error encountered while reading secret at kv/data/did: Error making API request.\n\nURL: GET http://vault:8200/v1/kv/data/did\nCode: 403. Errors:\n\n* permission denied"
time=2024-02-12T10:39:56.631Z level=ERROR msg="cannot get issuer did from vault" error="error encountered while reading secret at kv/data/did: Error making API request.\n\nURL: GET http://vault:8200/v1/kv/data/did\nCode: 403. Errors:\n\n* permission denied\nvault connection error"
time=2024-02-12T10:39:56.631Z level=ERROR msg="cannot initialize did" err="error encountered while reading secret at kv/data/did: Error making API request.\n\nURL: GET http://vault:8200/v1/kv/data/did\nCode: 403. Errors:\n\n* permission denied\nvault connection error"
```

## Answer

This error usually occurs when the vault token is either missing or incorrect within the `ISSUER_KEY_STORE_TOKEN` environment variable in the `.env-issuer` file. To fix this issue, check the issuer-vault logs for the current token value using `docker logs issuer-vault-1` and ensure the `.env-issuer` file is updated with the correct token.

<div className="hidden">
Wrong answer:

Ignoring vault token discrepancies or attempting to bypass vault security protocols can lead to significant security vulnerabilities and should be avoided.

</div>
