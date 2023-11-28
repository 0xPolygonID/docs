---
id: install-gcm
title: Google Cloud Marketplace Installation
sidebar_label: Using the Google Cloud Marketplace
description: Learn how to install the Issuer Node via Google Cloud Marketplace .
keywords: 
  - docs
  - polygon id
  - ID holder
  - issuer
  - verifier
  - google cloud marketplace
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Prerequisites

To install the issuer node through the [Google Cloud Marketplace](https://console.cloud.google.com/marketplace/product/polygon-public/polygon-id-issuer-node), you will need:

- A running Kubernetes cluster (in standard mode).
- **[EXTERNAL IP ADDRESSES](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address)**.

:::note

In the following examples, you will see a checkbox labeled "Issuer Network". If this checkbox is selected, the issuer node will be configured for the **Polygon Main network**, and in the Ethereum URL field, you should enter the RPC URL for that network. If you do not select this checkbox, the issuer node will be deployed on the Mumbai network, and the Ethereum URL field should contain the RPC URL for the **Polygon Mumbai network**.

:::


## Install the Application resource definition

An Application resource is a collection of individual Kubernetes components, such as Services, Deployments, and so on, that you can manage as a group.

To set up your cluster to understand Application resources, run the following command:

```bash
kubectl apply -f "https://raw.githubusercontent.com/GoogleCloudPlatform/marketplace-k8s-app-tools/master/crd/app-crd.yaml"
```

## Install Issuer Node without domain names

If you don't own domain names, you can deploy the issuer node through the Google Cloud Marketplace and access the APIs and frontend through a domain name that Google Cloud will generate using the public IP that you provide.

<div align="center">
<img src={useBaseUrl("img/gcm/no-domain-name.png")} height="400" width="400" />
</div>


You should pay attention to the `The Name of the Reserved External IP` field; this field should be filled in with the name of the external IP you have. Then, in the fields related to domain names, you can enter names following the pattern domain-name.XXX.nip.io, where XXX is the number of the IP associated with the name entered in the `The Name of the Reserved External IP` field. In this example, that IP number is 34.160.87.138.
After pressing "deploy," you should wait a few minutes, and the issuer node will be ready.

## Install Issuer Node with domain names

If you have domain names, the installation process is similar and very simple. You only have to enter the domain names in the corresponding fields. Here is an example:

<div align="center">
<img src={useBaseUrl("img/gcm/with-domain-name.png")} height="400" width="400" />
</div>

After a few minutes, you will be able to enter the registered domains. 
