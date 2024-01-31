---
id: js-sdk-dynamic-did
title: Dynamic dids
sidebar_label: Support of custom networks and dids
description: Ecosystem extension.
keywords:
  - did
  - polygon id
  - ID holder
  - network
  - custom
  - registerDid
---

## How to use custom did methods or networks with js-sdk 

1. Deploy contracts on custom chain.

StateV2.sol - mandatory contract to transit identities states and getting global identity state root (GIST) during the authentication. repository: https://github.com/iden3/contracts/tree/master/contracts/state 
more information: https://docs.iden3.io/contracts/state/


IdentityTreeStore.sol - optional, this contract is responsible for storing revocation tree nodes and tree roots of Identity. Only needed in case onchain RHS (Iden3OnchainSparseMerkleTreeProof2023 credential status) will be used fro credentials.

repository: https://github.com/iden3/contracts/blob/master/contracts/identitytreestore/IdentityTreeStore.sol

Onchain Validators: optional, only in case you work on use cases with onchain verification.

repository: https://github.com/0xPolygonID/contracts

2. Register you network for PolygonID did method in the following way:

```javascript
 core.
 ethodNetwork({
    method: core.DidMethod.PolygonId,
    blockchain: "linea",
    chainId: 59140,
    network: "testnet",
    networkFlag: 0b0100_0000 | 0b0000_0001,
    });
```

Also, eth provider must be defined for given network.
```javascript
  const conf: EthConnectionConfig = defaultEthConnectionConfig;
  conf.contractAddress = contractAddress;
  conf.url = rpcUrl;
```


Where `networkFlag` is two bytes which will be used for generation of type of identity. It must be different from existing network flags.
ChainId is identifier of network in ethereum ecosystem


:::info

Check an  <ins>[extension demo](https://github.com/0xPolygonID/extension-demo/blob/e6f85b4c6671de52b515e265b22c3a300c95e193/src/pages/index.js#L7)</ins>.
or  <ins> [sdk examples](https://github.com/0xPolygonID/js-sdk-examples/blob/cd586330c7079a26d9bdad6cfdf9025283eb1981/index.ts#L211)

:::

3. Extend the setup of the verifier in the same way - by registering the supported did.


<Tabs>
<TabItem value="Golang">

```bash
go get github.com/iden3/go-iden3-auth/v2
```

```go
import (
	core "github.com/iden3/go-iden3-core/v2"
)


func registerDIDMethods() error {
	var err error

	params := core.DIDMethodNetworkParams{
		Method:      core.DIDMethodPolygonID,
		Blockchain:  "linea",
		Network:     "testnet",
		NetworkFlag: 0b0100_0000 | 0b0000_0001,
	}
	err = core.RegisterDIDMethodNetwork(params, core.WithChainID(59140))

	return err
}

```

</TabItem>
<TabItem value="Javascript">

```bash
npm i @iden3/js-iden3-auth --save
```

```js
const { auth, resolver, protocol , core  } = require("@iden3/js-iden3-auth");

 core.registerDidMethodNetwork({
    method: core.DidMethod.PolygonId,
    blockchain: "linea",
    chainId: 59140,
    network: "testnet",
    networkFlag: 0b0100_0000 | 0b0000_0001,
    });

```

</TabItem>
</Tabs>
