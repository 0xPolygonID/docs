---
id: overview
title: Overview
sidebar_label: Overview
description: Overview of refresh service
keywords:
  - docs
  - polygon id
  - issuer node
  - claim
  - verifiable credentials
  - refresh service
  - refresh credential
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Description

Sometimes, it's useful to have a way to renew the credentials you've been given. A refresh service lets you update your credentials yourself. This way, you always have the latest info from the issuer, like your account balance, game score, or other data that changes often.

## Example

Consider an example of balance credentials, where a user proves his balance to get some benefits. The balance can be changed a lot during a short period. In this case, the user needs to interact with the issuer every time they need to use the credential. This is where the refresh service comes in handy. The refresh service can handle necessary data updates on the background of the user client without additional interaction between the issuer and the user.

## Refresh service current implementation:

Example of refresh service implementation can be found [here](https://github.com/0xPolygonID/refresh-service)

<details>
  <summary>Schema</summary>
  <div align="center">
    <img src= {useBaseUrl("img/refresh-service.svg")} align="center" />
  </div>
</details>

1. The user initiates a Zero-Knowledge Proof (ZKP) refresh process by sending a refresh message through the [iden3comm protocol](https://iden3-communication.io/credentials/1.0/refresh/) to the refresh service.
2. This message contains essential information, including the ID of the credential requiring refresh.
3. The refresh service performs an HTTP request to the `GET /v1/{issuerDID}/claims/{credentialID}` endpoint to retrieve information about the credential that requires an update.
4. Issuer validates whether the user is the owner of this credential.
5. The refresh service seeks current information for the user and their credential from the data provider.
6. The refresh service must now assess whether refreshed data is suitable for refreshing the credential, considering the following scenarios:

   ◦ If the credential was **merklized**, and its merkle tree root was stored in the index part, it is eligible for a refresh.

   ◦ If the credential was **NOT merklized**, a check is necessary to determine whether the data stored in the index were updated during the refreshing flow. If the data has not been updated, adding identical indexes to the issuer’s tree will result in an error. An example of how to perform this check can be found [here](https://github.com/0xPolygonID/refresh-service/blob/e9c310fc3808e1f58ce108523b4fd07dd67800ed/service/refresh.go#L175).

   ◦ In other cases, the refresh service should return an error.

7. With the new data from the data provider, the refresh service generates a credential request and sends it to the issuer node via the `POST /v1/{issuerDID}/claims` endpoint.
8. Using this new credential identifier, the refresh service obtains a new credential through the `GET /v1/{issuerDID}/claims/{newCredentialID}` endpoint.
9. Pack the new refreshed credential into an iden3comm message and sent back to the user.

### Modules

1. **[HTTP Server](https://github.com/0xPolygonID/refresh-service/tree/main/server)**: the http server is a base layer for [iden3comm protocol](https://iden3-communication.io/).
2. **[Provider Module](https://github.com/0xPolygonID/refresh-service/tree/main/providers)**: this module receives information from external data providers. By itself, it is very flexible in settings, but you can always add your own implementation.
3. **[Package Manager](https://github.com/0xPolygonID/refresh-service/blob/main/packagemanager/packagemanager.go)**: the package manager handles ZWZ token within the iden3comm protocol.
4. **[Integration with the Issuer Node](https://github.com/0xPolygonID/refresh-service/blob/main/service/issuer.go)**: this module responsibles for communication with [issuer node](https://github.com/0xPolygonID/issuer-node/).

### Authentication module for setup iden3comm handler

To be sure whether a user is the owner of the credentials they want to refresh, it is essential to implement an authentication module. To initiate the process, you should initialize the [Iden3comm package manager](https://github.com/0xPolygonID/refresh-service/blob/main/packagemanager/packagemanager.go).

In the context of a refresh service where JWZ tokens are verified, you will require the verification_key.json for the authV2 circuit. Additionally, to confirm the existence of the user in the issuer's state, one needs to know the issuer's state contract [addresses](https://docs.iden3.io/contracts/state/).

To authorise the user’s JWZ token, it is necessary to define a function that verifies proof and the issuer’s state. Once the authorization is complete, the refresh service will be aware of the user’s DID from the JWZ token. Now you can ensure that the credential being refreshed contains the same DID in the credential subject.

> **NOTE:** It is crucial to verify whether a user is the owner of the credential that potentially will be refreshed. Without this verification, an attacker could refresh and obtain a third-party credential.

### Integration with issuer node

The refresh service acts as a 'proxy' between the data provider and the issuer node, facilitating communication between them. The refresh service must possess the capability to communicate with the issuer node through open endpoints. These endpoints should be secured using various methods, such as JWT tokens, Basic Auth, etc. On the issuer-node side, only two open endpoints should be accessible:

1. `GET /v1/{{IssuerDID}}/claims/{{credentialID}}` - This endpoint is designed to return a credential based on the provided credentialID. Refer to the Issuer node example for implementation details.
2. `POST /v1/{{IssuerDID}}/claims` - This endpoint accepts a JSON body from which a new credential will be created. The IssuerDID is a crucial parameter for this operation. See the Issuer node example for reference on how this endpoint can be implemented.

## Example of client interaction with refresh service

To implement credential refreshing in a client side, need to follow next algorithm to look up for the credentials when a proof request is received:

<details>
  <summary>Schema</summary>
  <div align="center">
    <img src= {useBaseUrl("img/auto-refresh.drawio.svg")} align="center"/>
  </div>
</details>

**Select all credentials that satisfy context + type**

- Looking for credentials based on a specified context and type. If found, go to the next step. Otherwise, return an error.

**Credentials are found, check the skipRevocation flag**

- Check the value of the `skipRevocation` flag from the proof request. **true**, skip the revocation check and move to the next step. If **false**, process the revocation check.

**Check revocation for selected credentials**

- `skipRevocation` flag is false, verify whether the selected credentials have been revoked. If all credentials are revoked - return an error.

**Select all credentials that are non-expired and matched to the proof request**

- This step involves filtering out credentials that are expired and(or) don't match the proof request. If non-expired and matched to proof request credentials were found. Generate a proof.

**Valid credentials are not found, filter all credentials that have a refresh service**

- The algorithm filters out credentials that have a refresh service.

**Select credential**

- From the credentials with refresh services, select one and initiates a refresh. After refreshing, save new credential.

**Check if the refreshed credential satisfies the proof request**

- After refreshing the credential, checks if the updated credential satisfies the proof request. If it does, generate a proof. If the credential still doesn't meet the proof request, the process repeats, selecting another credential with a refresh service and refreshing it.

> 💡 **NOTE:** If expired credentials are revoked, the current recommended algorithm will not process or update such credentials.

### Client behavior depending on the type of proof in a proof request

**Signature (SIG):**

1. Client keeps connection with refresh service.
1. The `refreshService` provides the refreshed credential to the holder.
1. The holder can generate a proof for the signature request.

**Merkle tree proof (MTP):**

> **NOTE:** The workflow for MTP is in development. However, you still can receive notifications about MTP proof on the mobile application after refreshing credential(-s) that have MTP proof are performed.

1. The holder should decline the proof request. This is because generating an MTP proof might require a significant amount of time to become ready
1. The `refreshService` informs the holder about the `pending` status.
1. The holder monitors the credential status for a certain duration.

---

## Links:

- [Iden3comm refresh protocol](https://iden3-communication.io/credentials/1.0/refresh)
- [W3C Refresh service](https://iden3-communication.io/w3c/refresh-service/overview)
