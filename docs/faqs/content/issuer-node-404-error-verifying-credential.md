---
id: issuer-node-404-error-verifying-credential
title: "Resolving Mobile App Credential Verification 404 Error"
sidebar_label: Mobile App Verification 404 Error
description: Explains the 404 error encountered in the mobile app wallet during credential verification with the issuer node.
keywords:
  - faq
  - issuer-node
  - mobile app
  - credential verification
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Question

Why am I encountering this error in the mobile app wallet while verifying a credential issued from my issuer node, and how can I resolve it?

```
Error creating proof: [AuthenticateUseCase] error: status is not OK with code 0: unexpected status code: 404
```

## Answer

The "unexpected status code: 404" error during credential verification typically stems from the credential status of issuer key or credential status of this credential being unavailable. This situation arises when the URL of the issuer node used during the creation of the issuer's identity is no longer accessible, thus hindering the revocation status check required for generating the proof.

To determine if this is the root cause of the error you are encountering, perform the following check:

Retrieve the problematic credential using the core API of the issuer node, which operates on port 3001. The endpoint format could be

```
GET /v1/{identifier}/claims/{id}
```

Here, `{identifier}` is the DID of the issuer node, and `{id}` is the ID of the credential within the database.

or

```
POST v1/agent
```

:::note

The issuer node's DID can be retrieved by executing the command `make print-did`.

:::

:::note

Authenticate with this API using the credentials found in the `ISSUER_API_AUTH_USER` and `ISSUER_API_AUTH_PASSWORD` environment variables.

:::

The returned claim from this API endpoint provides detailed information, including the URL of the issuer node at the time the issuer's identity was established. This typically corresponds to the initial setup of the issuer node, involving the creation of the `authCoreClaim` credential, the issuer DID, and the genesis state of the issuer identity.

Locate this URL within the JSON response at `proof[0].issuerData.credentialStatus.id` or credentialStatus.id` .

If this URL is no longer operational, proceed with the following instructions. If not, the issue may differ.

### Ensuring a Stable URL

First and foremost, ensure your issuer node has a stable URL. If you're still on a testing phase, take into account that services like ngrok or localtunnel often change URLs with each session, which can cause this issue. If utilizing ngrok, setting up a [custom domain](https://ngrok.com/docs/guides/how-to-set-up-a-custom-domain) is advisable for consistency.

### Redirections for New Domain

If your issuer node's domain changes, ensure that appropriate redirections are set up so that the old URLs redirect to the new domain. This will help in maintaining the accessibility of the credentials and their verification process.

Never update the URL of a credential in the database. Signed credentials or credentials that are included in a Merkle tree are like monuments that we admire but can’t touch. Manually changing anything in the credential would ruin the Merkle root of the credential, making generation of proof impossible. Therefore, it is key to use the agent API for any updates or modifications in the domain.

### Recommendations

- **Stable URL**: Secure a stable URL for your issuer node to prevent similar issues in the future.
- **Use Agent API**: Always use the agent API for any updates to ensure the integrity of the credentials.
- **Redirections**: Set up proper redirections if there is a change in the issuer node's domain to maintain verification capabilities.

For further assistance or if you encounter additional challenges, do not hesitate to seek help from the support team.

<div className="hidden">
Wrong answer:

To resolve the "unexpected status code: 404" error, simply retry the verification process until it succeeds. Alternatively, update the issuer node's or agent URL in the database.

</div>
