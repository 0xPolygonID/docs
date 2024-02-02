---
id: query-builder
title: Query Builder
sidebar_label: Query Builder
description: Learn how to use the Query Builder.
keywords:
  - docs
  - polygon id
  - ID holder
  - issuer
  - verifier
  - query builder
  - credentialAtomicQuerySigV2
  - credentialAtomicQuerySigV2OnChain
  - credentialAtomicQueryMTPV2
  - credentialAtomicQueryMTPV2OnChain
  - credentialAtomicQueryV3
  - credentialAtomicQueryV3OnChain
  - selective disclosure
  - proof of uniqueness
  - nullifier
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The [Query Builder](https://schema-builder.polygonid.me/query-builder) is a dynamic, user-friendly tool designed for crafting verification queries. It simplifies the process by providing a comprehensive form, encompassing all necessary fields for creating detailed queries.

This tool enables verifiers to establish specific rules for identity verification, catering to a range of criteria from organizational membership to age requirements. Polygon ID enhances this process, offering a secure and streamlined way for users to authenticate their identity based on these criteria.

With its standardized interface, the Query Builder ensures uniformity, consistency, and minimizes errors in query creation across various users and organizations. It also presents a more intuitive alternative to manually writing queries on the [ZK Query Language](./verification-library/zk-query-language.md), making query creation accessible even for those without in-depth technical knowledge.

<div align="center">
<img src={useBaseUrl("/img/query-builder.png")} align="center" width="600"/>
</div>
<br/>

## Building a query

### URL to JSON-LD Context

To create a query, it is essential to reference the correct schema, specifically its JSON-LD Context's URL. Users have two options: they can either enter a URL pointing to a JSON-LD Context or utilize one from the [Schema Explorer](https://schema-builder.polygonid.me). By starting to type the name (or any other keyword) of the desired schema in the Schema Explorer, a list of available schemas will appear, allowing the user to select the appropriate one.

<div align="center">
<img src={useBaseUrl("/img/query-builder-url.png")} align="center" width="600"/>
</div>
<br/>

### Schema type

The JSON-LD Context of a schema in the Schema Explorer is limited to a single type. However, a custom JSON-LD Context may encompass multiple types. This particular field enables users to select the appropriate type for constructing their query. As a user-friendly feature, in cases where the JSON-LD Context is single-typed, the field is pre-filled automatically.

### Attribute field

Upon specifying the URL and type, the interface displays a hierarchical tree structure that showcases the attributes associated with the selected type. Queries are based on the values of these attributes, which are stored within a user's wallet as part of their credentials.

Credentials consist of various primitive attributes such as strings, integers, booleans, etc. These primitive attributes may be structured in a nested format using object attributes (represented as folders in the tree). Since queries are only executable against primitive attributes, object attributes (folders), are not selectable within the tree.

<div align="center">
<img src={useBaseUrl("/img/query-builder-attribute-field.png")} align="center" width="600"/>
</div>
<br/>

### Proof type

This field allows specifying the verification method used by the issuer at the time of issuing the credential, which is essential for a successful query verification. While creating a query, users must carefully choose a Proof Type that aligns with the original method selected by the issuer when issuing the credential. The two options available are:

- **Signature-based (SIG):** Verifies claims based on Baby JubJub (BJJ) Key Signatures. This method is straightforward, relying on the issuer's signature for authentication. It's fast and doesn't involve on-chain transactions.
- **Merkle Tree Proof (MTP):** Verifies claims through their inclusion in a Merkle Tree, which is part of the issuer’s on-chain identity. This approach not only bolsters security but also provides a timestamp, confirming the claim's existence at a specific historical moment.

### Circuit ID

The Query Builder incorporates 6 [Circom](https://docs.circom.io/) circuits, each designed for specific verification scenarios. Selection of the appropriate Circuit ID depends on the verification context (off-chain or on-chain) and the proof type used when the claim was issued. Below is a guide to these circuits:

1. **credentialAtomicQuerySigV2:** Verifies off-chain if a claim, signed by the Issuer, meets the verifier's criteria.
2. **credentialAtomicQuerySigV2OnChain:** Similar to SIG V2, but for on-chain verification (smart contract verifiers).
3. **credentialAtomicQueryMTPV2:** For off-chain verification of claims added to the issuer's claims Merkle Tree.
4. **credentialAtomicQueryMTPV2OnChain:** Applies MTP V2 logic for on-chain scenarios (smart contract verifiers).
5. **credentialAtomicQueryV3:** A versatile circuit for claims either signed by the Issuer or included in the Issuer's state, suitable for off-chain verification.
6. **credentialAtomicQueryV3OnChain:** The on-chain counterpart of V3, also accommodating both SIG and MTP proof types.

#### Circuit Selection Based on Proof Type

The available circuits in the Query Builder are filtered based on the selected Proof Type:

- **Signature-based (SIG) Proof Type:** For SIG, the list includes V2 SIG circuits (1 and 2) and the V3 circuits, as they support both SIG and MTP proof types.
- **Merkle Tree Proof (MTP) Proof Type:** With MTP, the options presented are V2 MTP circuits (3 and 4) and also the V3 circuits, compatible with both SIG and MTP.

It's important to consider the proof type as it directly influences the circuit options provided, ensuring alignment with the verification method (off-chain or on-chain via a smart contract) and the specific requirements of the query.

:::caution
V3 circuits are experimental as of this writing, so users should exercise caution and stay informed about their development and stability.
:::

### Proof of Uniqueness

The Proof of Uniqueness enhances security and integrity in contexts requiring [sybil resistance](https://en.wikipedia.org/wiki/Sybil_attack). This feature is optional and it's exclusively supported by v3 circuits. It's managed through two fields in the Query Builder form:

1. **Enable Proof of Uniqueness:** This checkbox is initially unchecked. When selected, it enables the Proof of Uniqueness feature.

2. **Nullifier Session ID:** A numeric input field that remains disabled unless the "Check proof of uniqueness" checkbox is selected. It requires the user to provide a nullifier session ID.

The nullifier session ID field is a critical component for calculating the NullifierID, which is essential for establishing Proof of Uniqueness in a query. This ID serves as a verifier-specific session identifier, which might represent, for example, a voting ID. It is used in the NullifierID calculation formula:

`NullifierID = hash(genesisID, credProfileNonce, schemaHash, verifierID, nullifierSessionID)`

Providing a nullifier session ID ensures the query's integrity and uniqueness, conforming to the protocol's sybil resistant features:

- **One Credential Per Session:** Each identity can obtain only one Nullifier per specific credential, nullifier session id, consistent across all Profiles and Genesis ID that are used for the same verifier.
- **Brute-force Resistance:** Prevents brute-forcing to reveal Genesis ID or other values.
- **Tracking Resistance:** Ensures Profile IDs and Genesis ID cannot be linked based on the Nullifier ID.
- **Flexible Session Duration:** Allows the verifier to keep the session active as needed, without time-specific constraints.
- **Protection Against Collusion:** Prevents matching different identifiers as belonging to the same identity, even if the issuer and verifier collude.

### Query Type

The protocol allows selection between two query types:

1. **Condition:** This type allows the prover to demonstrate that a specific condition is met without revealing the underlying data. It maintains data privacy by cryptographically verifying the condition. An example is proving legal age for entry into a venue without disclosing the actual age.

2. **Selective disclosure:** Use this when you need the prover to reveal specific data stored in their credential. This option discloses the actual value of an attribute to the verifier. For instance, instead of just requesting proof proving legal age, it would disclose the prover's actual age to the verifier.

Choose "Condition" for privacy-preserving verification, or "Selective disclosure" for cases where revealing specific information is necessary.

### Operator

In conditional queries, the "Operator" input defines the logical operation to be applied. The supported operators are:

- **Equal:** Checks if the value is equal to the specified value.
- **Not Equal:** Verifies if the value is not equal to the specified value.
- **Less Than:** Assesses that the value is less than the given value.
- **Greater Than:** Evaluates if the value is greater than the specified value.
- **Matches one of the values:** Determines if the value is within a given set of values.
- **Matches none of the values:** Checks if the value is not within a specified set.

Choose the appropriate operator based on the condition you want to validate.

### Attribute value

The "Attribute value" field allows verifiers to input the specific value or range of values used to compare with the selected attribute in the prover's credential. This field adapts to the type of the chosen attribute, accommodating various data types such as strings, numbers, booleans, dates, and more. This ensures that the value provided is compatible with the selected operator and the nature of the attribute.

### Issuer DID

This field in the query form is used to specify the Decentralized Identifier (DID) of the issuer that is trusted by the verifier. By entering a specific DID, the verifier can confirm that the credential presented by the prover was indeed issued by the specified issuer.

:::caution

Using `*` as a wildcard to accept credentials from any issuer is possible but not recommended, particularly in production environments. This approach may compromise the query's security and integrity, as it will validate credentials issued by any issuer.

:::

:::caution

Currently, the Query Builder supports specifying only a single DID. This means users have the choice to either provide one specific issuer DID or use `*` to allow any issuer. However, the former is strongly advised for maintaining robust verification standards.

:::

### Skip Revocation Check

This checkbox, when enabled, instructs the circuit to bypass the verification step that checks whether a credential has been revoked.

:::caution

Opting to skip the revocation check is generally not advised. This check is a crucial security feature, ensuring that the credential being used is still valid and has not been revoked by the issuer. Skipping this step can lead to the acceptance of outdated or invalidated credentials, potentially compromising the integrity of the verification process and the trustworthiness of the results.

:::

## Verifying a query

After setting up the query in the Query Builder, verification can be performed, which differs for off-chain and on-chain queries.

### Off Chain verification process

The verification of queries off-chain is a straightforward process:

1. **Initiate Verification:** Click the "Test query" button in the Query Builder to generate a QR code.
2. **Scan QR Code:** Use the prover's wallet to scan this QR code.
3. **Credential Validation:** The wallet checks for the existence of the credential and verifies all query requirements, including issuer DID, revocation status, and specified conditions.
4. **Zero-Knowledge Proof Generation:** If the criteria are met, a zero-knowledge proof is generated. This proof serves as cryptographic evidence that the prover's credential is valid and fulfills all aspects of the query.
5. **Receiving Proof:** The zero-knowledge proof is returned as a JWZ token, which can be decoded using the [JWZ tool](https://jwz.polygonid.me/).

For a detailed walkthrough, refer to the provided video illustrating the complete process of creating and verifying an off-chain query.

<div align="center">
<video controls align="center" width="100%" height="auto">
  <source src={useBaseUrl("/img/query-builder-off-chain-verification.mp4")} />
</video>
</div>
<br/>

### On Chain Verification Process

On-chain verification enables smart contracts to execute logic based on query results. To set this up:

1. **Select the Network:** Choose either Polygon Mainnet or Polygon Mumbai.
2. **Set a Request Id:** This unique ID acts as a key in the contract's state map. It's essential to choose a distinct ID for each request.
3. **Smart Contract Address:** Input the address of the contract responsible for proof validation and logic execution on the selected network.
4. **Click the Set Request Button:** This action sends a `Set ZKP Request` transaction.

After setting up the contract, the Query Builder generates a QR code for the prover's wallet to scan.

Once the wallet scans the QR code and the user approves the request, a zero-knowledge proof is generated. This proof is submitted to the contract through a `Submit ZKP Response` transaction, triggering the contract's logic.

For a comprehensive guide, refer to the video detailing the process of creating and verifying an on-chain query.

<div align="center">
<video controls align="center" width="100%" height="auto">
  <source src={useBaseUrl("/img/query-builder-on-chain-verification.mp4")} />
</video>
</div>
<br/>
