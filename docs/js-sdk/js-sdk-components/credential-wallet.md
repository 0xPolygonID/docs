---
id: credential-wallet
title: Credential Wallet
sidebar_label: Credential Wallet
description: Credential Wallet components and capabilities.
keywords:
  - docs
  - privado id
  - holder
  - issuer
  - verifier
  - wallet
  - js sdk
  - credential
---

A Credential Wallet manages credentials issued by issuers and provides secure storage and retrieval capabilities. The Credential Wallet is implemented through a Credential Interface that enables interaction with the underlying credential storage system.

The methods described below enable you to create and manage credential wallets effectively:

## Credential Retrieval

### list()

Retrieves all stored Verifiable Credentials in W3C format from the wallet.

```typescript
list(): Promise<W3CCredential[]>;
```

**Returns:** An array of all W3C Verifiable Credentials stored in the wallet.

[API Reference](https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.list#credentialwalletlist-method)

### findByQuery()

Searches for credentials using the Iden3 protocol's query language, enabling precise credential filtering based on multiple criteria.

```typescript
findByQuery(query: ProofQuery): Promise<W3CCredential[]>;
```

**Parameters:**
- `query`: Query object containing search criteria

**ProofQuery Interface:**
```typescript
export interface ProofQuery {
  allowedIssuers?: string[];              // Authorized credential issuers
  credentialSubject?: { [key: string]: unknown }; // Subject attributes to match
  schema?: string;                        // JSON schema URL for credential validation
  claimId?: string;                      // Specific credential identifier
  credentialSubjectId?: string;          // Subject's unique identifier
  context?: string;                      // Credential context information
  type?: string;                         // Credential type specification
}
```

**Query Parameters:**
- `allowedIssuers`: Array of issuer DIDs authorized to issue matching credentials
- `claimId`: Unique identifier of the target credential
- `credentialSubjectId`: Identifier of the credential subject (recipient)
- `type`: Specific credential type to filter by
- `schema`: JSON schema URL used for credential creation and validation
- `credentialSubject`: Subject attributes and claims to match against

**Returns:** Array of W3C Verifiable Credentials matching the query criteria.

The returned credentials can be used for proof generation in verification scenarios.

:::info Query Language

Learn more about the Iden3 query language capabilities in the [Query Language documentation](https://docs.iden3.io/protocol/querylanguage/).

:::

[API Reference](https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.findbyquery#credentialwalletfindbyquery-method)

## Credential Storage

### save()

Stores a single W3C Verifiable Credential in the database using upsert operation (insert or update if exists).

```typescript
save(credential: W3CCredential): Promise<void>;
```

**Parameters:**
- `credential`: W3C Verifiable Credential to be stored

**Operation:** Uses upsert logic to either insert new credentials or update existing ones based on credential identifier.

[API Reference](https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.save#credentialwalletsave-method)

### saveAll()

Performs batch storage of multiple W3C Verifiable Credentials using upsert operations for improved performance.

```typescript
saveAll(credentials: W3CCredential[]): Promise<void>;
```

**Parameters:**
- `credentials`: Array of W3C Verifiable Credentials to be stored

**Benefits:** Optimized for bulk operations, reducing database transaction overhead compared to multiple individual save operations.

[API Reference](https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.saveall#credentialwalletsaveall-method)

### remove()

Permanently removes a specific W3C Verifiable Credential from storage.

```typescript
remove(id: string): Promise<void>;
```

**Parameters:**
- `id`: Unique identifier of the credential to be removed

**Warning:** This operation is irreversible. Ensure proper backup procedures before credential removal.

[API Reference](https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.remove#credentialwalletremove-method)

## Authentication Credentials

### getAuthBJJCredential()

Retrieves the Auth Baby Jubjub credential for a specific user, enabling cryptographic signing operations.

```typescript
getAuthBJJCredential(did: DID): Promise<W3CCredential>;
```

**Parameters:**
- `did`: DID of the credential holder (not the issuer)

**Returns:** W3C Verifiable Credential of Auth BJJ type, containing the public key and signing capabilities.

**Use Case:** Essential for identity authentication and message signing within the Iden3 ecosystem.

[API Reference](https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.getauthbjjcredential#credentialwalletgetauthbjjcredential-method)

## Revocation Status Management

### getRevocationStatusFromCredential()

Retrieves or constructs the current revocation status for a given credential, determining whether it remains valid.

```typescript
getRevocationStatusFromCredential(cred: W3CCredential): Promise<RevocationStatus>;
```

**Parameters:**
- `cred`: W3C Verifiable Credential to check for revocation

**Returns:** `RevocationStatus` indicating whether the credential is currently valid or has been revoked.

**Supported Status Types:**
- **SparseMerkleTreeProof**: Standard on-chain revocation verification
- **Iden3ReverseSparseMerkleTreeProof**: Revocation verification using Reverse Hash Service

[API Reference](https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.getrevocationstatusfromcredential#credentialwalletgetrevocationstatusfromcredential-method)

### getRevocationStatus()

Retrieves revocation status based on the specific credential status type and configuration.

```typescript
getRevocationStatus(
  credStatus: CredentialStatus,
  credentialStatusResolveOptions?: CredentialStatusResolveOptions
): Promise<RevocationStatus>;
```

**Parameters:**
- `credStatus`: Credential status configuration specifying the revocation checking method
- `credentialStatusResolveOptions`: (Optional) Additional resolution parameters

**CredentialStatusResolveOptions:**
- `issuerDID`: DID of the credential issuer
- `userDID`: DID of the user requesting status verification  
- `issuerData`: Issuer metadata from either Signature Proof (BJJ) or Iden3SparseMerkleTreeProof

**Supported Status Types:**
- Standard revocation checking (on-chain verification)
- Reverse Hash Service integration
- Agent-based status resolution
- On-chain status verification

**Returns:** Current revocation status indicating credential validity.

[API Reference](https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.getrevocationstatus#credentialwalletgetrevocationstatus-method)

## Credential Creation

### createCredential()

Creates a new W3C Verifiable Credential based on provided specifications and JSON schema validation.

```typescript
createCredential(issuer: DID, request: CredentialRequest, schema: JSONSchema): W3CCredential;
```

**Parameters:**
- `issuer`: DID of the credential issuer
- `request`: Credential creation specification containing subject data and requirements
- `schema`: JSON schema for credential structure validation and type definition

**Process:**
1. Validates the credential request against the provided JSON schema
2. Creates credential claims based on the request specifications  
3. Formats the credential according to W3C Verifiable Credential standards
4. Returns the properly structured credential ready for issuance

**Returns:** W3C-compliant Verifiable Credential ready for signing and issuance.

[API Reference](https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.createcredential#credentialwalletcreatecredential-property)