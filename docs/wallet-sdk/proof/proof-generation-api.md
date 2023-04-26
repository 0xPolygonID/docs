---
id: proof-generation-api
title: Proof Generation API
sidebar_label: Proof Generation API
description: Proof Generation API.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---
 
Proof Generation starts with the Wallet scanning the QR code on the Verifier website/app. This is worth mentioning that the proof-generation process initiates on the Verifier side first with the Verifier generating a [Query Request](/guides/verifier/request-api.md#query-based-request).
 
## Steps of Proof Generation
 
1. Integrator selects the type of credential for which it seeks verification.
 
2. Verifier website/app displays the QR code depending on the credential type selected by the Integrator.
 
3. Integrator scans the QR code. By scanning, the Wallet parses the query-based authentication request shown by the Verifier. Read more about auth requests [here](/wallet-sdk/iden3comm/auth-requests.md#type-of-authorization-requests).
 
4. Before the Wallet can generate a proof, it needs to authenticate itself first. Upon successful authentication (a pin or biometrics), the Wallet starts the process of generating either a signature-based proof or a merkle-tree-based proof to be presented to the Verifier. The circuit sends back its response to the Verifier via `callbackUrl`. 
 
6. After the proof is sent to the Verifier, it analyzes this proof for its authenticity and based on its analysis, verifies the proof.
 
7. The Verifier shows both the authorization request and the proof information to the Integrator.
 
8. As the verification is complete, an Integrator can now use the services of the Verifier. For example, if the Verifier is a DAO, the Integrator, upon successful verification, becomes a DAO member and can participate in the voting activities. 
 

![](/img/proof-generation.png)

Read more about the circuits used for proof generation [here](https://docs.iden3.io/protocol/main-circuits/).

The `prove()` function generates zero-knowledge proof using the valid credentials requested from the Identity.

## Prove

The prove() method passes `did`, `profileNonce`, `claim`, `circuitData`, `request`, and `challenge` as input parameters. and generates a JWZ proof. 

```
Future<JWZProof> prove(
      {required String did,
      int? profileNonce,  
      required ClaimEntity claim,
      required CircuitDataEntity circuitData, required ProofScopeRequest request, String? privateKey, String? challenge});
   
   Future<Stream<DownloadInfo>> get initCircuitsDownloadAndGetInfoStream;

  Future<bool> isAlreadyDownloadedCircuitsFromServer(); 
  }
```

`did` is the unique ID of the identity
`profileNonce` is the nonce of the profile of the identity
`claim` is the Verifiable Credential 
`circuitData` are the circuits used for generating a proof
`request` is the proof request information that comes from the Verifier
`challenge` is a message the Verifier requires an Integrator to sign with its identity so that an Integrator can verify its identity

`initCircuitsDownloadAndGetInfoStream()` and `isAlreadyDownloadedCircuitsFromServer()` methods above are used for downloading the circuit files as these circuits are too big to be stored on the SDK. 

The `prove()` function generates a `JWZProof` that fulfills the proof query parameters with valid identity and credentials. This proof is shared by an Integrator with a Verifier. The `prove()` returns a `JWZProof` object so that the Integrator is able to verify the requested information (requested from Identity) with the Verifier. 
