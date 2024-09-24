---
id: switch-stacktrace
title: Switch Stack Trace
sidebar_label: Switch Stack Trace
description: "Enable stacktrace by calling the Switch Stack Trace method, which will allow the stacktrace
to be saved."
keywords:
  - docs
  - optimism id
  - holder
  - issuer
  - verifier
  - wallet sdk
  - error handling
  - stacktrace
---

:::caution Encryption Key

In order to use the Stack Trace, integrators need to provide a 32-char-long key in the .env file as the Stack Trace is actually encrypted:

```
"stacktraceEncryptionKey":"key32charlong"
```

:::

Enable the Stack Trace.

```dart
void switchStacktrace({bool enabled = false});
```
