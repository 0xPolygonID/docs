---
id: iden3comm
title: Iden3comm
sidebar_label: Iden3comm
description: Iden3comm components and capabilities.
keywords:
  - docs
  - privado id
  - holder
  - issuer
  - verifier
  - wallet
  - js sdk
  - authetication
  - credential
  - proof
  - revocation
---

Iden3comm is the reference implementation for message handling within the Iden3 protocol. It processes various protocol message types, including authentication requests, credential operations, proof generation, and revocation management.

## Packers

Iden3comm uses packers to encapsulate payload data into protocol-specific message envelopes. These components transform raw data into standardized message formats for secure transmission.

The Iden3 protocol supports packers for messages of 2 media types: - **Plain messages**: Standard unencrypted message format
- **Zero-knowledge proof (ZKP) messages**: Cryptographically secured messages with privacy-preserving properties

These packers let you generate tokens.

### ZKP Packer

For the messages of the type **ZKP**, the packer receives a payload (a serialized message) and ZKP parameters (the sender's DID and profile nonce) as input parameters and generates a JSON Web Zero-knowledge (JWZ) Token.

```typescript
 async pack(payload: Uint8Array, params: ZKPPackerParams): Promise<Uint8Array> {
    const provingMethod = await getProvingMethod(params.provingMethodAlg);
    const { provingKey, wasm, dataPreparer } = this.provingParamsMap.get(
      params.provingMethodAlg.toString()
    );

    const token = new Token(
      provingMethod,
      byteDecoder.decode(payload),
      (hash: Uint8Array, circuitID: CircuitId) => {
        return dataPreparer.prepare(hash, params.senderDID, circuitID);
      }
    );
    token.setHeader(Header.Type, MediaType.ZKPMessage);
    const tokenStr = await token.prove(provingKey, wasm);
    return byteEncoder.encode(tokenStr);
  }
```

## Handler

In Iden3, a handler manages the packers and orchestrate message processing workflows. There are two types of handlers that the protocol supports: Authentication Handler and Fetch Handler.

### Authentication Handler

The following steps show how the Authorization Handler works:

1. Before the token generation, the handler can unpack the authorization message, so the user can choose the DID to log in with (it can be a private profile or public identity).

   ```typescript
   parseAuthorizationRequest(request: Uint8Array): Promise<AuthorizationRequestMessage>;
   ```

   Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.authhandler.parseauthorizationrequest#authhandlerparseauthorizationrequest-method" target="_blank">API Reference</a>.

1. Then, it handles authorization request protocol messages and generates a token.

   ```typescript
   handleAuthorizationRequest(
       did: DID,
       request: Uint8Array,
       opts?: AuthHandlerOptions
     ): Promise<{
       token: string;
       authRequest: AuthorizationRequestMessage;
       authResponse: AuthorizationResponseMessage;
     }
   ```

It gets the payload and an identity (that can handle that request) as the input parameters, and returns a token, authorization request, and authorization response.

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.authhandler.handleauthorizationrequest" target="_blank">API Reference</a>.

:::note **Privacy Consideration**

When a user logs into a Verifier, it does not have to share its identity. Instead, it can share with it the profile as the user does not receive a credential on his/her identifier but on his/her profile. Sharing one's profile instead of his/her identity prevents the possible identity tracking by a Verifier.

:::

### Fetch Handler

The Fetch Handler handles the Credential Offer message and returns the fetched credential.

```typescript
handleCredentialOffer(
    offer: Uint8Array,
    opts?: FetchHandlerOptions
  ): Promise<W3CCredential[]>
```

**Parameters:**
- `offer` is the offer message that the Fetch handler receives.

**Process:**
- Automatically determines the target DID from the offer message content
- Processes the offer and retrieves the credential from the issuer
- Returns verifiable credentials in W3C standard format

Read more about iden3comm [here](https://github.com/iden3/iden3comm/tree/main/protocol).

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.fetchhandler.handlecredentialoffer#fetchhandlerhandlecredentialoffer-method" target="_blank">API Reference</a>.

## Alternative Message Formats

For applications requiring JSON Web Signature (JWS) instead of JSON Web Zero-knowledge (JWZ) technology, you can specify alternative packer parameters:

```typescript
const params = {
  mediaType: MediaType;
  packerOptions?: JWSPackerParams;
}
```

**Configuration:**
- `mediaType`: Specifies the iden3comm protocol media type
- `packerOptions`: JWS-specific parameters for signature-based authentication

## Additional Resources

For comprehensive protocol specifications and implementation details, refer to the [Iden3comm Protocol Documentation](https://github.com/iden3/iden3comm/tree/main/protocol).
