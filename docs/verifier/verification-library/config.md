---
id: config
title: Configuration
sidebar_label: Configuration
description: Learn how to configure the API
keywords: 
  - docs
  - polygon id
  - ID holder
  - issuer
  - verifier
  - API
  - golang
  - javascript
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configuration

The set of APIs included in the verification library is comprised of two steps:

- [Request APIs](./request-api-guide.md) allow designing the request to be presented to the user in order to authenticate.
- [Verification APIs](./verification-api-guide.md) allow verifying the proof sent by the user. The proof is generated as a response to the request. 

:::note

Check the <ins>[workflow](./verifier-library-intro.md)</ins> to disambiguate between these two processes.

:::

Both the APIs are available either in Golang or Javascript:

<Tabs>
<TabItem value="Golang">

```bash
go get github.com/iden3/go-iden3-auth
```

```go
import (
    "github.com/iden3/go-circuits"
    auth "github.com/iden3/go-iden3-auth"
    "github.com/iden3/go-iden3-auth/loaders"
    "github.com/iden3/go-iden3-auth/pubsignals"
    "github.com/iden3/go-iden3-auth/state"
    "github.com/iden3/iden3comm/protocol"
)
```

</TabItem>
<TabItem value="Javascript">

```bash
npm i @iden3/js-iden3-auth --save
```

```js
const {auth, resolver, protocol, loaders, circuits} = require('@iden3/js-iden3-auth')
```

</TabItem>
</Tabs>
