---
id: push-notification
title: Push Notifications
sidebar_label: Push Notifications
description: Implement push notifications on your app.
keywords:
  - docs
  - privado id
  - wallet
  - push notification
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Push Notifications Implementation Guide

Push notifications in the Privado ID ecosystem enable real-time communication between verifiers and wallet applications while maintaining privacy and security standards. This guide provides comprehensive instructions for implementing secure push notification functionality in your applications.

## Overview

Currently, to be able to implement a notification flow for a certain app, the app must be registered in the push gateway config. This can result in a centralization point for developers who want to use such feature and some expenses and efforts on support of the current gateway.

For the Privado ID wallet, this push service is used: [https://push-staging.polygonid.com/api/v1](https://push-staging.polygonid.com/api/v1).

Current notification flow:

![push](/img/wallet/push.png)

1. The user creates a device push token and prepares an authorization response that includes a DID document containing the user's DID and push notification service information. The device push token is encrypted using the Push Gateway's public encryption key and embedded in the DID document.

2. The verifier sends a message to the PG using information extracted from the user's DID document, including the encrypted device token and service endpoint.

3. The PG decrypts the push token, stores the message securely, and sends the push notification to the registered wallet application.

4. The wallet receives the notification containing a message ID and PG URL, fetches the complete message from the service, processes the protocol message, and prompts the user for appropriate action (e.g., credential retrieval).

**Glossary:**

- _wallet_ - mobile application published by Privado.
- _verifier_ - backend for Privado Verify application that verifies user documents.
- _Push Gateway (PG)_ - service to deliver push notifications to the wallet app.
- _Push notification_ - notification that contains a link to protocol message or protocol message itself that is delivered through the notification provider.

## How to run a server

1. Go to [this link](https://github.com/iden3/notification-service) and follow the instructions to run your own push notification service.
   1. For a Push Gateway service a sygnal is used. Sygnals can send notifications to Android and Apple devices. For Android devices, a sygnal has integration with FCM; for Apple devices, the sygnal has APNS integration. Also, we can add any other provider like SNS. For this we must implement the next flow.
   2. Default algorithm for encryption is `RSA-OAEP-512`
2. Register your application on a Firebase provider and update config.
3. Get public key of notification service for further encryption actions.

## How to send an AuthorizationResponse from mobile with push information

1. Create a simple DID document

```json
{
  "@context": ["https://www.w3.org/ns/did/v1"],
  "id": "did:polygonid:polygon:amoy:2qDj9EDytmvtQP1or3FxykXGEaqSA1ss479MYHDMJc"
}
```

You can add information about keys / authentication info optionally. Follow [this specification](https://github.com/0xPolygonID/did-polygonid/blob/main/did-polygonid-method-draft.md)

2. Create encrypted device information.
   Device information must be a valid JSON and encrypted with the public key of the Push Gateway. Apply base64 encoding to encrypted byte array.
   An encryption key must be used from the notification service.

```json
{
  "app_id": "...",
  "pushkey": "push key"
}
```

3. Add push service for DID document to service section

   ```json
   {
     "@context": [
       "https://www.w3.org/ns/did/v1",
       "https://schema.iden3.io/core/jsonld/auth.jsonld"
     ],
     "id": "did:polygonid:polygon:amoy:2qDj9EDytmvtQP1or3FxykXGEaqSA1ss479MYHDMJc",
     "service": {
       "id": "did:polygonid:polygon:amoy:2qDj9EDytmvtQP1or3FxykXGEaqSA1ss479MYHDMJc#push",
       "type": "push-notification",
       "serviceEndpoint": "https://push-staging.polygonid.com/api/v1",
       "metadata": {
         "devices": [
           {
             "ciphertext": "sIyhw8MsRzFTMXnPvvPnjpj38vVHK9z7w/DvHzX+i/68hSjWfSDjXUA49KopWexyoVsAhenS+AS7+JkatJ3+OTlNxUD+lFrAIJUE51qBiM7l7mmkAuryybUQmOgWJCbuUU2nsWFKzIvk2ZTxcMh5EoUxYV2/0HaTmYYTDkzCKQr/oVePlHbiKwG6XjjMCuNaooSAO7UlLduEZY9CjCWBahiJ7LPHq5+SMCSpA9DdxlYe5IDY7ZT0Yg8fmEAq5+ZGvPVDzk1SdXvZNtG/2yygb3ILrSHXN81ztJRPdsEjzctqWwIhP1zEncSMnNEY4vtxEc1red4PuNT6QX0EoP/aX4LdSGIgfM3KB6yjqKBOqgIGoTFih0h/YzcC42lv4oJw0t5obX+32FM8pzQBUoXMvV0F9WpNgDcN04F3/Su9GGRLFNLXApCtj2Mh4H0qnkjMzRMO42RTd3258HYH7U8xK48hpO0Wolt+rn3jrk/JXrVQqO/9EnhCu/PJL1+AoeVtTYL0zp57OWnIAXbW98MGg0pm0MpYwH51hmHx0YLH+4Fkqj30ydcZQhV3xtAVgvKfxQOwwNz2WhIefm+fwYLVAQB4SjUMOrRQYAos7PWgoc21I0QFu52dIA4IvYYBws2Vjb1LvssdFnrd4kUYbC7THdlWONfunbp9xgofzXTrj2g=",
             "alg": "RSA-OAEP-512"
           }
         ]
       }
     }
   }
   ```

4. Include the DID document as a `did_doc` field in the authorization response message [https://iden3-communication.io/authorization/1.0/response/](https://iden3-communication.io/authorization/1.0/response/)
   Notification message format that is expected to be sent to mobile. URL field is a valid URL to fetch a message. Fetch request must be HTTP GET request with no authorization required. The message is available for 24 hours on Push gateway or deleted after the fetch request.

```json
{
  "id": "...",
  "url": "..."
}
```

## How to send a push from verifier

1. Parse a DID document from the authorization response
2. Proxy device info to push service using serviceEndpoint using the following format

   1. Message is the protocol message that is meant to be delivered to users
   2. Devices is an object from the push notification service from user DID document

   ```json
   {
     "message": "JSON stringified message",
     "metadata": {
       "devices": [
         {
           "ciphertext": "...",
           "alg": "..."
         }
       ]
     }
   }
   ```


## Conclusion

Implementing push notifications in the Privado ID ecosystem requires careful attention to security, privacy, and performance. By following this guide, you can create a robust notification system that maintains the principles of self-sovereign identity while providing excellent user experience.
