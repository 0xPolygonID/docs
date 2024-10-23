---
id: verifier-library-intro
title: Introduction
sidebar_label: Introduction
description: Verifier workflow and libraries.
keywords:
  - docs
  - polygon id
  - ID holder
  - issuer
  - verifier
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Introduction

At its core, every off-chain interaction between a Verifier and a user's Wallet follows this workflow:

- A web application designs a [request](./request-api-guide.md) for the users. This is delivered to the user via a [Universal link](../../wallet/universal-links.md), a QR code or via deep-linking (it is up to the implementer). This can either be a [auth request](./request-api-guide.md#basic-auth-request) or a [query-based request](./request-api-guide.md#query-based-request).
- The user clicks the universal link which directs them to the Web Wallet or the mobile wallet or the scans the QR code using the mobile wallet to parse the request.
- The user fetches the revocation status of the requested credential from the Issuer of that credential.
- The user generates a ZK proof on mobile according to the request of the website starting from the credentials held in his/her wallet. This also contains the ZK proof that the credential is not revoked.
- The user sends the ZK proof to the Verifier.
- The Verifier verifies the ZK proof using the [verification API](./verification-api-guide.md).
- The Verifier checks that the State of the Issuer of the credential and the State of the user are still valid and have not been revoked (this is still performed using the same [verification API](./verification-api-guide.md)).
- If the verification is successful, the Verifier grants access to the user (or activates any customized logic).

<div align="center">
<img src={useBaseUrl("img/off-chain-flow.png")} align="center" width="600"/>
</div>
<br></br>

Assume that the request is: "Are you over 18 years old?". The Verifier _never gets access to any of the user's credentials_. Instead, the Verifier receives a cryptographic proof which, on verification, provides an answer "yes" or "no" to the previous question.

This section provides all the elements needed to integrate off-chain verification with Privado ID.

## Libraries

The authentication flow can be implemented either in GoLang or Javascript

- <a href="https://github.com/iden3/go-iden3-auth" target="_blank">Go Iden3 Verification Library</a>

- <a href="https://github.com/iden3/js-iden3-auth" target="_blank">JS Iden3 Verification Library</a>
