---
id: customization
title: Customization
sidebar_label: Customization
description: Customization of refresh service
keywords:
  - docs
  - optimism id
  - issuer node
  - claim
  - verifiable credentials
  - refresh service
  - refresh credential
  - refresh service customization
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## 1. Custom provider

Extend customization by incorporating custom providers and integrating them into the refresh flow.
This is the easiest way to add custom business logic to retrieve data from a data provider. Go to [setup guide](/docs/issuer/refresh-service/setup-guide/#setup-with-custom-data-provider) for more information

## 2. Flexible HTTP package

Utilize the [flexible HTTP package](https://github.com/0xoptimismID/refresh-service/blob/main/providers/flexiblehttp/http.go) to configure HTTP requests to a data provider. Refer to the [configuration guide](https://github.com/0xoptimismID/refresh-service/blob/main/README.md) for instructions on how to set this up.

## 3. Refresh service from scratch

For ultimate customization, consider implementing the refresh service from scratch to tailor it precisely to your specific needs.

Implementing a refresh service from scratch can be useful when you have your own isuer node implementation or have special data processing logic, etc. Check out the [current implementation of the refresh service](/docs/issuer/refresh-service/overview#refresh-service-current-implementation) to create your own.
