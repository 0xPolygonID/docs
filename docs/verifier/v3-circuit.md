---
id: v3-circuit
title: V3 circuit (Beta)
sidebar_label: V3 circuit (Beta)
description: Verifier main features.
keywords:
  - docs
  - polygon id
  - ID holder
  - circuit
  - v3
---

## New circuits available

We want to introduce new circuits - СredentialAtomicQueryV3 and CredentialAtomicQueryV3Onchain

:::warning

    Circuits are in the beta version. Trusted setup will be performed in the next release.
    Newest version is СredentialAtomicQueryV3-beta.1

  <details><summary>Changelog from beta.0 to beta.1</summary>
 

    1. ValueArrSize input is introduced, which fixes behaviour for IN / NIN operations. 
    2. Exists / Noop / Less Than Or Equal / Greater Than or Equal /  Not between / Between operators support.
    3. Query hash calculation algorithm changes.
    4. Constraints and security optimizations.
    
  </details>


:::

More about new supported operators [here](./verification-library/zk-query-language.md#exists---operator-11).

Link to latest sdk circuit wrappers: [js](https://github.com/0xPolygonID/js-sdk/pull/181) / [go](https://github.com/iden3/go-circuits/releases/tag/v2.1.0)



In general it's an improved version of V2 circuits with several important key features:

1. SIG and MTP checks are united in single circuit. Now you can use only one circuit without sig/mtp suffixes. Proof will be taken from user wallet and authorization response will contain information about verifiable credential proof type which has been used. It is possible to request the needed proof from user by using `proofType` property in the authorization request message. Possible values are `Iden3SparseMerkleTreeProof` and `BJJSignature2021`. If `proofType` is not provided - available proof will be used. In case there are two proofs available - MTP will be used as more prior.

```json
...
"scope": [
        {
          "id": 1,
          "circuitId": "credentialAtomicQueryV3-beta.1",
          "query": {
            ...
            "proofType": "BJJSignature2021 | Iden3SparseMerkleTreeProof"
          }
          ...
]
...
```

2. Support of new type of operators modifiers: now selective disclosed value will be present in the output value - this will give a possibility for onchain verification to work with selective disclosure workflows. The format of the request hasn't been changed.

3. Support of nullifiers generation for proof of uniqueness use cases. Imagine the scenario when verifier needs to make sure that credential can be used only once for the proof generation from specific user. Now it's possible. If credential is issued on profile, verifier id is present and nullifier session id is provided - unique value for such credential will be generated and persist in the proof outputs.

```json
...
"scope": [
        {
          "id": 1,
          "circuitId": "credentialAtomicQueryV3-beta.1",
          "params": {
            "nullifierSessionId" : "123443290439234342342423423423423"
          },
          "query": {
            ...
          }
          ...
]
...
```

4. For onchain circuit now it is possible to disable default authentication. Ethereum-based identities can generate zero-knowledge proofs without having the bjj keys, and verification will be successful.
   In this scenario user id myst be derived from the sender address. Bellow is an example of V3 circuit.

```js

    function _checkAuth(uint256 userID, address ethIdentityOwner) internal view {
        require(
            userID == GenesisUtils.calcIdFromEthAddress(state.getDefaultIdType(), ethIdentityOwner),
            "UserID does not correspond to the sender"
        );
    }
```

Beta Validator is also deployed :<ins> [Repository](https://github.com/0xPolygonID/contracts)</ins>

5. Possibility to use linked proofs. This means that verifier can be sure that user used the same credential to proof different queries. This is achievable by using `groupId` property in the proof request.

```json
...
"scope": [
         {
          "id": 1,
          "circuitId": "credentialAtomicQueryV3-beta.1",
          "query": {
            "groupId": 1
            ...
          },
         {
          "id": 2,
          "circuitId": "credentialAtomicQueryV3",
          "query": {
            "groupId": 1
            ...
          }
          ...
]
...
```

6. Multiple performance and security optimization.

:::info

Check a circuit codebase and algorithm of work <ins>[here](https://docs.iden3.io/protocol/main-circuits/#credentialatomicqueryv3)</ins>.

:::

Example of complex request with v3 circuit proof request:

```json
{
  "id": "f8aee09d-f592-4fcc-8d2a-8938aa26676c",
  "typ": "application/iden3comm-plain-json",
  "type": "https://iden3-communication.io/authorization/1.1/request",
  "thid": "f8aee09d-f592-4fcc-8d2a-8938aa26676c",
  "from": "did:polygonid:polygon:mumbai:2qFroxB5kwgCxgVrNGUM6EW3khJgCdHHnKTr3VnTcp",
  "body": {
    "callbackUrl": "https://test.com/callback",
    "reason": "age verification",
    "message": "test message",
    "scope": [
      {
        "id": 1,
        "circuitId": "credentialAtomicQueryV3-beta.1",
        "params": {
          "nullifierSessionId": "123443290439234342342423423423423"
        },
        "query": {
          "groupId": 1,
          "proofType": "BJJSignature",
          "allowedIssuers": ["*"],
          "context": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v101.json-ld",
          "type": "KYCEmployee",
          "credentialSubject": {
            "position": {
              "$eq": "developer"
            }
          }
        }
      },
      {
        "id": 2,
        "circuitId": "credentialAtomicQueryV3-beta.1",
        "query": {
          "allowedIssuers": ["*"],
          "groupId": 1,
          "context": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v101.json-ld",
          "type": "KYCEmployee",
          "credentialSubject": {
            "documentType": {
              "$in": [1, 2]
            }
          }
        }
      }
    ]
  }
}
```
