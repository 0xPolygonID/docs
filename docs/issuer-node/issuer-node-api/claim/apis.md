---
id: apis
title: Credentials API
sidebar_label: Credentials
description: Credentials API endpoints and their description.
keywords:
  - docs
  - privado id
  - issuer node
  - credentials
  - verifiable credentials
  - core
  - API
  - revoke
---

# Credentials

The collection of Credential endpoints is used to provide the following set of functionalities:

- Create a Verifiable Credential (VC)
- Retrieve a credential or a set of credentials
- Generate a JSON to create a QR code
- Update Identity State
- Revoke a Verifiable Credential
- Retrieve Revocation Status

A credential ID is assigned to a Verifiable Credential when it is created by an Issuer. A user can then retrieve a VC via its ID. If a credential is no longer valid or lost, it can be revoked (rendered inactive and cannot be used).

## Create Credential

**Function**: endpoint to create a Verifiable Credential for a user.

**How it Works**: the DID (identifier string retrieved from calling the `Create Identity` endpoint) is passed as a path variable in the request URL. This is your DID identifier that you use as an issuer of credentials.

The following parameters are passed in the body of the request:

- `credentialSchema`: it is a template for a Verifiable Credential that guarantees the structure of a credential. This way, an Issuer, a Holder, and a Verifier can reference the data in a known way. Further details on the `credentialSchema` can be found in the [Create Custom Schema](../../../issuer/schema.md) section.
- `type`: the type of the credential schema sent.
- `credentialSubject`: contains DID (Decentralized Identifier), i.e. `did`, of the user and the fields related to the data to be attested. You should have previously obtained this identifier from the user by performing a "basic auth" step, this can be done through the [Authentication/QRcode step](https://issuer-admin.polygonid.me/#get-/v1/authentication/qrcode).
- `expiration`: Date of expiry of the Verifiable Credential.

:::note

Depending on the schema a user opts for, the request body may contain some fields of the schema while leaving out others. For example, in the API reference, we have considered the schema of the type `KYCAgeCredential` and therefore, included the `birthday` and `documentType` fields.

:::

The Issuer Node responds by sending a response message that contains the string `id`, which is the ID of the Verifiable Credential created by the Issuer Node.

<a href="https://issuer-node-core-api-testing.privado.id/#post-/v2/identities/-identifier-/credentials" target="_blank">API Reference</a>

## Get Credential

**Function**: endpoint to retrieve a Verifiable Credential based on its Credential ID (CID). This way, you can retrieve a credential issued by an Issuer based on this credential's ID.

**How it Works**: the DID (the identifier string retrieved from calling the `Create Identity` endpoint) and the Claim ID, i.e.`id` (or CID) of the Verifiable Credential (retrieved from calling the `Create Claim` endpoint) are passed as path variables in the request URL.

The endpoint requires to pass the issuer `did` and the Verifiable Credential `CID` as path variables in the request URL.

The server responds by sending the following data about the Verifiable Credential:

- `Context`: URL pointing to the JSON-LD Context of the Verifiable Credential.

- `credentialSchema`: URL pointing to the credential JSON schema.

- `credentialStatus`: shows the URL to fetch the [Revocation status](https://docs.iden3.io/getting-started/claim-revocation/) of the credential, `revocationNonce` (zero or any value), `type` (type of Proof, for example, SparseMerkleTreeProof).

- `credentialSubject`: contains details of the subject (to whom the credential is issued) and includes:

  - Credential Fields (for example, `birthday` and `documentType` in the case of KYCAgeCredential)
  - `id`: DID of the Subject
  - `type`: Type of credential for credentialSubject (for example, KYCAgeCredential)

- `id`: it is the ID of the Verifiable Credential.

- `expiration`: the date on which the credential shall expire.

- `issuer`: DID of the Issuer.

- `issuanceDate`: the date on which the credential was issued by the Issuer.

- `proof`: the proof that the user creates to prove that s/he is the real owner of the Verifiable Credential issued from the Issuer and that the Verifiable Credential that it holds is valid. It includes:

  - `type` of proof (for example, BJJSignature2021 or SparseMerkleTreeProof)
  - `issuerData`: It includes the Issuer's `id` (DID of the Issuer) and its `state` (value of its Claims Tree Root, i.e. root of the claims (credential) tree).
  - `authclaim`: Value of authclaim along with its mtp `existence` (proof of its existence/non-existence in the Merkle tree).
  - `coreclaim`: Value of coreclaim along with `signature` (Issuer's signature which verifies that the credential is issued by a valid Issuer).

- `proofTypes`: `types` of proof for example, BJJSignature2021 and SparseMerkleTreeProof

<a href="https://issuer-node-core-api-testing.privado.id/#get-/v2/identities/-identifier-/credentials/-id-" target="_blank">API Reference</a>

## Get Credentials

**Function**: endpoint to retrieve all the Verifiable Credentials issued by an Issuer.

**How it Works**: the DID (the identifier string retrieved from calling the `Create Identity` endpoint) is passed as path variables in the request URL.

You can retrieve a set of credentials based on different filters or criteria. These criteria can be added as the query-string parameters in the request URL. These filters (and their data types) are listed below:

- `schemaType` _String_: type of schema. For example, schema based on Age-based KYC (KYCAgeCredential).

- `schemaHash` _String_: hash of the schema. For example, c9b2370371b7fa8b3dab2a5ba81b6838.

- `credentialSubject` _String_: represents the subject of the credentials being retrieved. It should contain the identifier (DID of the user) and the associated values for the attributes specified in the credential schema file.

- `status` _enum_: retrieve credentials based on if they are revoked or expired. Default is `all` which would retrieve all the credentials.

- `query` _String_: retrieve credentials based on the filters applied to the data of the credential.


The Issuer Node responds by sending a response message that contains the Verifiable Credential and all the information related to it. 

<a href="https://issuer-node-core-api-testing.privado.id/#get-/v2/identities/-identifier-/credentials/search" target="_blank">API Reference</a>

## Get Credential QR Code

:::note

In order to communicate with the Web Wallet or the Wallet App, the Issuer Node must be hosted on a public URL.

:::

**Function**: endpoint to generate a Universal Link. The user can then click this link and accept credentials to his/her wallet.

**How it Works**: the Issuer DID (identifier string retrieved from calling the `Create Identity` endpoint) and credential Identifier (or `cid` retrieved from the `Create Credential` endpoint) are passed as path variables in the request URL.

The Issuer Node responds by sending a response message that contains a JSON which carries the following fields:

- `universalLink` contains the universal link which the user can click to accept the credential in the wallet.

- `schemaType` is the type of the schema used for the credential.


<a href="https://issuer-node-core-api-testing.privado.id/#get-/v2/identities/-identifier-/credentials/-id-/qrcode" target="_blank">API Reference</a>

## Revoke Credential

**Function**: endpoint to revoke a Verifiable Credential

**How it Works**: the Issuer DID (The identifier string retrieved from calling the `Create Identity` endpoint) and `nonce` of the VC to be revoked (Revocation Nonce) are passed as a path variable in the request URL.

The server responds by showing the Revocation Status of the credential.

<a href="https://issuer-node-core-api-testing.privado.id/#post-/v2/identities/-identifier-/credentials/revoke/-nonce-" target="_blank">API Reference</a>

## Get Revocation Status

**Function**: endpoint to retrieve the Revocation Status of the Verifiable Credential.

**How it Works**: the DID (The identifier string retrieved from calling the `Create Identity` endpoint) and `nonce` (Revocation Nonce) are passed as a path variable in the request URL. For the credential to be marked "revoked", we need to publish the state first on-chain, and then wait for 5 confirmation blocks.

The server responds by sending the following details:

- `issuer`
  - `claimstreeRoot`: Root of the Claims Merkle Tree of the Issuer
  - `state`: The Issuer's Identity State
- `mtp`
  - `existence`: Existence or Non-existence of the Revocation Nonce on the Revocation Merkle Tree. For retrieving the revocation status from this endpoint, we need to first send a transaction and after that, the state is published on-chain. Once that is done, the existence of the revocation nonce on Merkle Tree changes to "true".

<a href="#get-/v2/identities/-identifier-/credentials/revocation/status/-nonce-" target="_blank">API Reference</a>
