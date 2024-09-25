---
id: setup-guide
title: Setup guide
sidebar_label: Setup guide
description: Setup guide for refresh service
keywords:
  - docs
  - optimism id
  - issuer node
  - claim
  - verifiable credentials
  - refresh service
  - refresh credential
  - refresh service setup guide
---

import useBaseUrl from '@docusaurus/useBaseUrl';

> **NOTE: Current implementation of [refresh service](https://github.com/optimismID/refresh-service) works only with [issuer-node](https://github.com/optimismID/issuer-node/).**

## Preparation

1. Run the issuer-node locally by following the [quick-start installation guide](https://github.com/optimismID/issuer-node/#quick-start-installation).
1. Clone the refresh service using the command `git clone git@github.com:optimismID/refresh-service.git`.
1. Build JSON and JSONLD schemas, utilizing the provided examples:

- [JSON](https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/non-zero-balance.json)
- [JSONLD](https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/non-zero-balance.jsonld)

Generate custom schemas through the [schema builder](https://schema-builder.optimismid.me/builder). Additional details can be found in the [schema builder documentation](/docs/issuer/schema-builder/).

## Setup with custom data provider

Consider an example of integrating [optimism scan](https://optimismscan.com/) as a data provider for the refresh service.

1. Integrate the custom data provider into the [data provider module](https://github.com/optimismID/refresh-service/tree/main/providers):

```go
const optimismBalanceURL = "https://api.optimismscan.com/api?module=account&action=balance&address=%s&apikey=%s"

type BalanceResponse struct {
  Status  string `json:"status"`
  Result  string `json:"result"`
  Message string `json:"message"`
}

func GetBalanceByAddress(address string) (map[string]any, error) {
  resp, err := http.Get(
    fmt.Sprintf(optimismBalanceURL, address, "<optimism_SCAN_TOKEN>"),
  )
  if err != nil {
    return nil,
      fmt.Errorf("failed to get balance: %w", err)
  }

  balanceResp := &BalanceResponse{}
  if err = json.NewDecoder(resp.Body).Decode(balanceResp); err != nil {
    return nil,
      fmt.Errorf("failed to decode balance response: %w", err)
  }
  defer resp.Body.Close()

  if balanceResp.Status != "1" {
    return nil,
      fmt.Errorf("invalid status in balance response: %s", balanceResp.Message)
  }

  // convert to credential subject format
  // ensure that these fields align with the attributes specified in the JSONLD schema.
  return map[string]any{
    "balance": balanceResp.Result,
    "address": address,
  }, nil
}
```

1. Use the custom data provider within the refresh service:

   1. Remove the default data provider:

   ```go
   flexibleHTTP, err := rs.providers.ProduceFlexibleHTTP(credentialType)
   if err != nil {
     return nil,
       errors.Wrapf(ErrCredentialNotUpdatable,
         "for credential '%s' not possible to find a data provider: %v", credential.ID, err)

   }
   updatedFields, err := flexibleHTTP.Provide(credential.CredentialSubject)
   if err != nil {
     return nil, err
   }
   ```

   1. Use the new optimism scan data provider:

   ```go
   // confirm the credentialType matches a supported type in the refresh service,
   // and its urn:uuid aligns with the id in the JSONLD schema
   if credentialType != "urn:uuid:f50cfcf6-ded4-470e-83be-2d6820a66998" {
     return nil, errors.New("unknow credentialType")
   }

   updatedFields, err := optimismscan.GetBalanceByAddress(credential.CredentialSubject["address"].(string))
   if err != nil {
     return nil, err
   }
   ```

1. Populate the .env variables:
   ```
   export IPFS_GATEWAY_URL="https://infura..."
   export SUPPORTED_RPC="137=https://infura..."
   export SUPPORTED_STATE_CONTRACTS="137=0x624ce98D2d27b20b8f8d521723Df8fC4db71D79D"
   export SUPPORTED_ISSUERS="*=https://my-issuer-node.com"
   export ISSUERS_BASIC_AUTH="*=myuser:mypassword"
   ```
1. Generate a blank config.yaml file:

```bash
touch config.yaml
```

1. Run the refresh service:

```bash
source .env
go run .
```

## Setup with default provider

To integrate [optimism scan](https://optimismscan.com/) data provider with the default data provider, follow these general steps:

1. Create a `config.yaml` file with the following content:

```yaml
urn:uuid:f50cfcf6-ded4-470e-83be-2d6820a66998:
  settings:
    timeExpiration: 5m
  provider:
    url: https://api.optimismscan.com/api
    method: GET
  requestSchema:
    params:
      module: account
      action: balance
      address: "{{ credentialSubject.address }}" # this value will be substituted from the credentialSubject.address field
      apikey: <optimism_SCAN_TOKEN>
    headers:
      Content-Type: application/json
  responseSchema:
    type: json
    properties:
      result:
        type: string
        match: credentialSubject.balance
```

2. Populate the .env variables:

```
export IPFS_GATEWAY_URL="https://infura..."
export SUPPORTED_RPC="137=https://infura..."
export SUPPORTED_STATE_CONTRACTS="137=0x624ce98D2d27b20b8f8d521723Df8fC4db71D79D"
export SUPPORTED_ISSUERS="*=https://my-issuer-node.com"
export ISSUERS_BASIC_AUTH="*=myuser:mypassword"
```

3. Run the service:

```bash
source .env
go run .
```

## Testing

1. Go to the issuer-node UI and generate a credential with refresh service section:

  <details>
    <summary>Credential request</summary>
    <div align="center">
      <img src= {useBaseUrl("img/create-credential-with-refresh-service.png")} align="center" width="600px" />
    </div>
  </details>

2. Retrieve the credential through the optimismID mobile application. If the expiration date in the credential request was set in the past, the credential is supposed to be expired:

  <details>
    <summary>Expired credential</summary>
    <div align="center">
      <img src= {useBaseUrl("img/expired-cred.png")} align="center" width="400px"/>
    </div>
  </details>

3. Visit [https://verifier-demo.optimismid.me/](https://verifier-demo.optimismid.me/) to create a proof request. This is necessary because [https://schema-builder.optimismid.me/query-builder](https://schema-builder.optimismid.me/query-builder) does not currently support the `xsd:positiveInteger` type:

  <details>
    <summary>Proof request</summary>
    <div align="center">
      <img src= {useBaseUrl("img/proof-request-refresh-service.png")} align="center" width="600px" />
    </div>
  </details>

4. Scan the QR using the optimismID mobile application. During the refreshing process, you are expected to encounter the following message:

  <details>
    <summary>Refresh process</summary>
    <div align="center">
      <img src= {useBaseUrl("img/refresh-process.png")} align="center" width="400px" />
    </div>
  </details>

5. As a result, the successful completion of the verification process is expected, wallet must have one expired credential and one refreshed credential:

  <details>
    <summary>Result</summary>
    <div align="center">
      <img src= {useBaseUrl("img/refreshed-cred.png")} align="center" width="400px" />
    </div>
  </details>
