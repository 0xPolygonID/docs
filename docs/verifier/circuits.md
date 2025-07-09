---
id: circuits
title: "Circuits"
sidebar_label: "Circuits"
description: "Explore the essential Circom circuits used in Iden3’s decentralized identity protocol. Learn how state transitions, authentication, and advanced credential verification techniques work together for robust digital identity management."
keywords:
  - iden3
  - circuits
  - decentralized identity
  - identity verification
  - circom
  - zkSNARKs
  - state transition
  - authentication
  - credential verification
  - merkle tree
  - on-chain
  - off-chain
  - digital identity
  - cryptography
---



The following is the overview of the most important `circom` circuits used in Privado ID protocol and ecosystem. These circuits play a crucial role in enabling secure identity ownership, trustworthy credential verification, and efficient on-chain or off-chain checks.
## 1. stateTransition

**Circuit Purpose:**  
Validates an identity state transition from an old user state to the new one, ensuring the identity owner is the one making the update.

**Usage Notes:**

- Used whenever an identity’s Claims Tree, Revocation Tree, or Roots Tree is updated (e.g., adding or revoking a claim).
- Relies on the Prover’s signature to confirm ownership of the old state before finalizing the new state.
- Typically verified on-chain via a `transitState` function, which updates the global identity mapping and GIST upon successful proof verification.

## 2. authV2

**Circuit Purpose:**  
Confirms that the Prover (identity holder) owns a specific identity by controlling a BabyJubJub private key and including its state in the GIST (global identity state tree) or being at genesis state.

**Usage Notes:**

- `authV2` is the standard circuit for proving an identity’s ownership with on-chain or off-chain identity state consistency checks.
- It is a main circuit to be used in authentication and authorization flows in JWZ (JSON WEB Zero-Knowledge tokens).

## 3. credentialAtomicQueryMTPV2

**Circuit Purpose:**  
Proves that the Prover holds a valid credential (issued by an issuer) that satisfies a Verifier’s query. The credential's representation is stored in the issuer’s Claims Tree, and the circuit relies on:

- Checking that the core claim representation hash is included in this tree via a Merkle Tree Proof (MTP) approach.
- Verifying the non-revocation of the credentials in the issuer’s Revocation Tree.
- Checking the validity of the issuer's state and its existence in the state contract.
- Ensuring that the Prover uses an identity that controls the credential subject identifier.
- Supporting queries on any credential field, thanks to the unique JSON-LD merklization algorithm.

**Usage Notes:**

- Designed for off-chain verifications with atomic queries.

## 4. credentialAtomicQueryMTPV2Onchain

**Circuit Purpose:**  
Same as `credentialAtomicQueryMTPV2`, but with support for output optimizations, making it more efficient for on-chain use. **Note:** It does not support selective disclosure.

**Usage Notes:**

- Designed for on-chain verifiers.

## 5. credentialAtomicQuerySigV2

**Circuit Purpose:**  
Similar to `credentialAtomicQueryMTPV2` but for credentials that are signed by the issuer's BabyJubJub key rather than being included in the issuer’s Merkle Tree. It:

- Verifies the issuer’s signature over the core claim representation of a W3C credential (including the Merkle root of the JSON-LD document).
- Checks that the BabyJubJub key is included in the issuer state (which is either at genesis or published on-chain) and that key is not revoked in the latest issuer state.

**Usage Notes:**

- Suitable when the issuer issues credentials in a purely signature-based manner, rather than including them in state and performing state transitions.

## 6. credentialAtomicQuerySigV2Onchain

**Circuit Purpose:**  
Builds on `credentialAtomicQuerySigV2` by adding on-chain verifier support. It:

- Checks that a credential signed by the issuer meets the verifier’s query.
- Verifies that the Prover controls the identity to which the credential belongs.
- Ensures that the credential is not expired or revoked.
- Computes a hash of query-related inputs (such as schema, operator, value, etc.) for cheaper on-chain verification of the proof.

**Usage Notes:**

- Ideal for smart contract verifiers that need to confirm a user’s credentials without relying on the issuer’s Merkle tree (i.e., signature-based issuance).
- The circuit’s proof can be submitted to a contract function (often verifying via an on-chain zkSNARK), reducing gas costs by exposing fewer public inputs.

## 7. credentialAtomicQueryV3-beta.1

**Circuit Purpose:**  
An enhanced version of `credentialAtomicQueryV2` that supports:

- Optional revocation checks.
- Credential expiration checks.
- Selective disclosure of specific credential fields.
- Computation of nullifiers for one-time or limited-use proofs.

This circuit combines the verification of BabyJubJub signatures and Iden3SparseMerkleTreeProof in a single circuit, ideal for advanced credential scenarios where flexible issuance (signature- or Merkle-based) and partial data disclosure are required.

- **Supports Nullifiers:** The proof can only be used once for the same verifier, credential, user identity, and nullifier session id.
- Supports linkage between proofs.

**Usage Notes:**

- Supports more comparison operators.
- Can be integrated with on-chain or off-chain verifiers; if on-chain, the V3OnChain variant is typically used to reduce public inputs.

## 8. credentialAtomicQueryV3Onchain-beta.1

**Circuit Purpose:**  
Designed for smart contract verifiers, this circuit builds on `credentialAtomicQueryV3` by adding two major enhancements:

1. It can check that the Prover controls the identity, similar to how `authV2` works (if authentication is enabled).
2. It computes a hash of all query-related inputs (e.g., `claimSchema`, `slotIndex`, `operator`, `claimPathKey`, `claimPathNotExists`, and any field values) so they don’t need to be exposed individually as public inputs on-chain.

**Usage Notes:**

- Ideal for on-chain verification where minimizing public inputs is crucial to reduce gas costs.
- Retains all capabilities of `credentialAtomicQueryV3`, such as selective disclosure, expiration checks, and optional revocation checks.
- If authentication is enabled, the Prover must demonstrate identity ownership in the same way as `authV2` before the proof is accepted.
- The reduced set of public inputs lowers the overhead for smart contract verification, making it more efficient for complex or frequent credential proofs on Ethereum.

## 9. linkedMultiQuery10-beta.1

**Circuit Purpose:**  
Generates a single proof capable of verifying up to **10 parameters** in a single query. This allows multiple credential attributes or conditions (e.g., age, location, graduation) to be checked together, simplifying and streamlining multi-parameter verifications.

**Usage Notes:**

- Batching multiple parameter checks into one proof reduces overhead and improves efficiency compared to issuing separate queries.
- Ideal for composite credential checks (e.g., age, residence, and education) in a single proof step.
- Should be used by verifiers **only in conjunction with** the `credentialAtomicV3` circuit to ensure all checks (including signatures) are properly performed.
- Supports integration with both on-chain and off-chain verifiers, providing flexibility for a range of identity and credential scenarios.

## Source Code:

[Circuits Github link](https://github.com/iden3/circuits)

## Public Verification Keys

All public verification keys for the Iden3 circuits, generated following the [trusted setup](https://github.com/0xPolygonID/phase2ceremony), are available at [this link](https://github.com/0xPolygonID/verifier-backend/tree/develop/keys). This resource ensures transparency and makes it easier to verify proofs.