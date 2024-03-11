---
id: issuer-node-404-error-verifying-credential
title: "Resolving Mobile App Credential Verification 404 Error"
sidebar_label: Mobile App Verification 404 Error
description: Explains how to address the 404 error encountered in the mobile app wallet during credential verification with the issuer node. Provides steps to ensure a stable URL and to update the issuer node URL in the database.
keywords:
  - faq
  - issuer-node
  - mobile app
  - credential verification
  - ngrok
  - database update
  - pgAdmin
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Question

Why am I encountering this error in the mobile app wallet while verifying a credential issued from my issuer node, and how can I resolve it?

```
Error creating proof: [AuthenticateUseCase] error: status is not OK with code 0: unexpected status code: 404
```

## Answer

The "unexpected status code: 404" error during credential verification typically stems from the URL stored in the `authCoreClaim` being unavailable. This situation arises when the URL of the issuer node used during the creation of the issuer's identity is no longer accessible, thus hindering the revocation status check required for generating the proof.

To determine if this is the root cause of the error you are encountering, perform the following check:

Retrieve the problematic credential using the core API of the issuer node, which operates on port 3001. The endpoint format is:

```
GET /v1/{identifier}/claims/{id}
```

Here, `{identifier}` is the DID of the issuer node, and `{id}` is the ID of the credential within the database.

:::note

The issuer node's DID can be retrieved by executing the command `make print-did`.

:::

:::note

Authenticate with this API using the credentials found in the `ISSUER_API_AUTH_USER` and `ISSUER_API_AUTH_PASSWORD` environment variables.

:::

The returned claim from this API endpoint provides detailed information, including the URL of the issuer node at the time the issuer's identity was established. This typically corresponds to the initial setup of the issuer node, involving the creation of the `authCoreClaim` credential, the issuer DID, and the genesis state of the issuer identity.

Locate this URL within the JSON response at `proof[0].issuerData.credentialStatus.id`.

If this URL is no longer operational, proceed with the following instructions. If not, the issue may differ.

### Ensuring a Stable URL

First and foremost, ensure your issuer node has a stable URL. Services like ngrok or localtunnel often change URLs with each session, which can cause this issue. If utilizing ngrok, setting up a [custom domain](https://ngrok.com/docs/guides/how-to-set-up-a-custom-domain) is advisable for consistency.

### Manually Updating the URL in the Database

:::note

Manually updating the URL of the credentials in the database is not a straightforward process. For development or testing purposes, it might be simpler to recreate the issuer node's identity and start from scratch. This can be accomplished by removing and restarting the Docker containers. However, be advised that this approach **will erase all existing data**.

:::

To manually update the URL in existing credentials, particularly if using Docker, follow these detailed steps:

1. Launch a pgAdmin container for UI-based interaction:

```bash
docker run -p 8080:80 --network=issuer-network -e "PGADMIN_DEFAULT_EMAIL=mail@mail.com" -e "PGADMIN_DEFAULT_PASSWORD=password" --name pgadmin_container -d dpage/pgadmin4
```

2. Navigate to `http://localhost:8080` in your browser and log in with the provided credentials (`mail@mail.com`/`password`).

3. Within the dashboard, opt to "Add New Server".

<div align="center">
    <img src={useBaseUrl("img/faqs/issuer-node-pgadmin-01.png")} width="600px" />
</div>

4. Name it "Issuer Node".

<div align="center">
    <img src={useBaseUrl("img/faqs/issuer-node-pgadmin-02.png")} width="600px" />
</div>

5. In the "Connection" tab, input the necessary details and confirm by clicking "Save".

<div align="center">
    <img src={useBaseUrl("img/faqs/issuer-node-pgadmin-03.png")} width="600px" />
</div>

6. On the tree to the left, explore the nodes to `Servers > Issuer Node > Databases > platformid > Schemas > public > Tables`, right-click the `claims` table, and choose "View/Edit Data > All Rows".

<div align="center">
    <img src={useBaseUrl("img/faqs/issuer-node-pgadmin-04.png")} width="600px" />
</div>

7. Locate the `credential_status` column in the loaded credentials (claims). This column contains a JSON value.

<div align="center">
    <img src={useBaseUrl("img/faqs/issuer-node-pgadmin-05.png")} width="900px" />
</div>

8. Identify the credential with the `revocationNonce` of `0` (the `authCoreClaim` credential). Modify the URL within the `id` property of the JSON to the new domain of your issuer node.

<div align="center">
    <img src={useBaseUrl("img/faqs/issuer-node-pgadmin-06.png")} width="600px" />
</div>

9. Confirm the update by clicking "Ok" and save the alterations to apply the updated issuer node URL.

<div align="center">
    <img src={useBaseUrl("img/faqs/issuer-node-pgadmin-07.png")} width="300px" />
</div>

By following these steps, new credentials issued will utilize the updated issuer node URL. Note that previously issued credentials will need their URLs updated individually to resolve any verification issues.

### Updating the Issuer URL in Database Records

For those comfortable with direct database manipulation, the issuer node URL within existing credentials can be updated using a SQL command. This method is particularly useful if you have a large number of credentials that need updating to a new issuer node URL. Here is the SQL command to perform this update:

```sql
UPDATE claims
SET credential_status = jsonb_set(credential_status, '{id}', ('"' || regexp_replace(credential_status ->> 'id', '^https://123456', 'https://0.0.0.0') || '"')::jsonb)
WHERE jsonb_extract_path_text(credential_status, 'id') LIKE 'https://123456/%' AND identifier = 'myDID';
```

In this command:

- `https://123456` represents the old URL to be replaced.
- `https://0.0.0.0` is the new URL you're updating to.
- `myDID` should be replaced with the actual DID of the issuer whose credentials you're updating.

This SQL command specifically targets the `credential_status` JSONB column within the `claims` table, replacing the old URL with the new one only in records where the `id` field of the `credential_status` matches the specified pattern and belongs to the specified issuer DID.

:::warning

Direct manipulation of database records can lead to data integrity issues if not performed carefully. Ensure you have backups or other recovery methods available before executing direct database updates.

:::

### Recommendations

- **Stable URL**: Secure a stable URL for your issuer node to prevent similar issues in the future.
- **Database Caution**: Directly modifying database entries should be done with caution to avoid unintended data corruption.

For further assistance or if you encounter additional challenges, do not hesitate to seek help from the support team.

<div className="hidden">
Wrong answer:

To resolve the "unexpected status code: 404" error, simply retry the verification process until it succeeds, without needing to check or update the issuer node's URL in the database or reconsider the stability of your ngrok setup.

</div>
