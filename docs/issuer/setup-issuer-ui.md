---
id: setup-issuer-ui
title: Set up the Issuer UI
sidebar_label: Setup Guide
description: Learn how to set up an Issuer UI API and a user interface.
keywords:
  - docs
  - privado id
  - issuer node
  - claim
  - verifiable credentials
  - UI
  - API
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This article provides comprehensive instructions for implementing full integration of the Issuer Node with the Privado ID APIs, including deployment of an intuitive user interface for credential management.

:::caution

The content of the QR code provided by the Issuer or Verifier has changed since the <ins>[release 2.3.0 of the Issuer node](https://github.com/0xPolygonID/issuer-node/releases/tag/v2.3.0)</ins>. Instead of sending the JSON information through the QR code, now we provide an embedded link to a page where this JSON is hosted, which improves the application performance. Please check the <ins>[IDEN3MESSAGE_PARSER.md](https://github.com/0xPolygonID/polygonid-flutter-sdk/blob/main/IDEN3MESSAGE_PARSER.md)</ins> file for more information on how to parse the new QR code content.

:::

## Docker Mode Guide

**Prerequisites: Complete the repository cloning process before proceeding [GitHub](https://github.com/0xPolygonID/issuer-node).**


### Requirements

- Successful completion of the [Core-API Standalone Mode Guide](setup-issuer-core.md#standalone-mode-guide).

### Setup

1. Environment Configuration, copy `ui.env.sample` as `.env-ui`:

2. Deploy the Issuer Node UI:

```bash
make run-all
```

> **Access Point** - http://localhost:8088

Upon launching the UI for the first time, you'll be prompted to enter the name and details of the identity for your issuer node. Please note that you can create and manage multiple identities for your issuer node through the UI at a later stage.

<div align="center">
<img src= "/img/issuer_node_first_install_screen.png" align="center" />
</div>

---

### Related guides:

[How to Set Up Issuer Node  API Guide](setup-issuer-core.md)

[Advanced Issuer Node Configuration](issuer-configuration.md)

[Quick Start Demo](../quick-start-demo.md)
