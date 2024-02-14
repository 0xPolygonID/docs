---
id: install-kubernets
title: Installing the Issuer Node in Kubernetes
sidebar_label: Using Kubernets
description: Learn how to install the Issuer Node using Kubernets.
keywords:
  - docs
  - polygon id
  - ID holder
  - issuer
  - verifier
  - kubernets
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

In this article, we will see how to install the Issuer Node on a Kubernetes cluster. We will demonstrate how to install both APIs and the web frontend. Due to the number of components and configurations required, we will use Helm for the installation.

It's important to clarify that the cluster we will be using is not recommended for production environments. Furthermore, this installation does not include the use of certificates or HTTPS domains.

If you desire a production deployment of the Issuer Node, we recommend using the version available in the Google Marketplace, which is straightforward to configure and deploy:

**[Google Marketplace Issuer Node](https://console.cloud.google.com/marketplace/product/polygon-public/polygon-id-issuer-node)**

We will then show you how to configure the Issuer Node on a cluster for a demonstration environment.

Before we begin, please ensure that you have the following software installed:

- **[Kubectl](https://kubernetes.io/docs/reference/kubectl/overview/)**
- **[Docker](https://docs.docker.com/install/)**
- **[Helm](https://helm.sh/)**

Additionally, to follow this tutorial, you must have:

- **[K3D](https://k3d.io/v5.6.0/#installation)** installed.

## Creating the Kubernetes Cluster With K3D

There are different ways to create a Kubernetes cluster using K3D. Since we will be using domain names in this example (without certificates and over HTTP), one straightforward way to create it is with the following terminal command:

```bash
k3d cluster create issuernode --api-port 6550 --agents 1 --volume "/tmp/data:/data@agent:*" --volume "/tmp/data:/data@server:*" -p "80:80@loadbalancer"
```

With the above command, a cluster that "listens" to port 80 is created, which means the domains should point to the public IP of the host and port 80.

That's it, now we're going to install the Issuer Node.

## How to install the Issuer Node using domains names

In the `k8s/helm/` folder of the GitHub project, you will find all the necessary files for the deployment. The first step involves defining some environment variables:

```bash
export APP_INSTANCE_NAME=polygon-id-issuer
export NAMESPACE=default
export APP_DOMAIN=app.example.com
export UI_DOMAIN=ui.example.com
export API_DOMAIN=api.example.com
export PRIVATE_KEY="YOUR PRIVATE KEY"
export MAINNET=false
export UIPASSWORD="my ui password"
export ISSUERNAME="My Issuer"
export ISSUER_ETHERUM_URL="https://polygon-mumbai.XXXX"
export INGRESS_ENABLED=true
export VAULT_PWD=password
export RHS_MODE=None                                    
export RHS_URL="https://reverse-hash-service.com"
```

where…

`APP_INSTANCE_NAME` is the name for the Helm application.

`NAMESPACE` is where you want to deploy the application.

`APP_DOMAIN` is the domain for the API UI. To use this, `INGRESS_ENABLED` must be true.

`UI_DOMAIN` is the domain name for the UI. To use this, `INGRESS_ENABLED` must be true.

`API_DOMAIN` is the domain for the API. To use this `INGRESS_ENABLED` must be true.

`PRIVATE_KEY` is the private key of the wallet (Metamask private key wallet).

`MAINNET` Specify if the network is main; if this value is false, the issuer node will use Mumbai.

`UIPASSWORD` is the password for the user: ui-user. This password is used when the user visits the UI.

`ISSUERNAME` Issuer Name. This value is shown in the UI.

`ISSUER_ETHERUM_URL` is the blockchain RPC.

`INGRESS_ENABLED` If this value is false you must provide a PUBLIC_IP.

`VAULT_PWD` is the vault password.

`RHS_MODE` Reverse Hash Service mode. Options: None, OnChain, OffChain.

`RHS_URL` Reverse Hash Service URL. Required if `RHS_MODE` is OffChain.

After assigning values to the environment variables, you should run the following command using Helm:

```bash
helm install "$APP_INSTANCE_NAME" . \
--create-namespace --namespace "$NAMESPACE" \
--set appdomain="$APP_DOMAIN" \
--set uidomain="$UI_DOMAIN" \
--set apidomain="$API_DOMAIN" \
--set privatekey="$PRIVATE_KEY" \
--set mainnet="$MAINNET" \
--set uiPassword="$UIPASSWORD" \
--set issuerName="$ISSUERNAME" \
--set issuerEthereumUrl="$ISSUER_ETHERUM_URL" \
--set ingressEnabled="$INGRESS_ENABLED" \
--set privateKey="$PRIVATE_KEY" \
--set vaultpwd="$VAULT_PWD" \
--set rhsMode="$RHS_MODE" \
--set rhsUrl="$RHS_URL"
```

**After a few minutes, the ingress should be ready, and you can access the domains you specified.**

## How to install the Issuer Node using the Public IP (not recommended for production env)

If you don't have domain names, you can install the Issuer Node by leveraging a public IP address. First, we need to create a cluster that allows access to the Issuer Node through the public IP and specific ports. We will create the cluster named `issuernode2`:

```bash
k3d cluster create issuernode2 --api-port 6550 --agents 1 --volume "/tmp/data:/data@agent:*" --volume "/tmp/data:/data@server:*" -p "30000-30010:30000-30010@server:0"
```

With the cluster created and running, we need to assign values to some environment variables:

```bash
export APP_INSTANCE_NAME=polygon-id-issuer
export NAMESPACE=default
export PUBLIC_IP="your public ip"
export PRIVATE_KEY="YOUR PRIVATE KEY"
export MAINNET=false
export UIPASSWORD="my ui password"
export ISSUERNAME="My Issuer"
export ISSUER_ETHERUM_URL="https://polygon-mumbai.XXXX"
export INGRESS_ENABLED=false
export VAULT_PWD=password
export RHS_MODE=None                                    
export RHS_URL="https://reverse-hash-service.com"
```

where…

`APP_INSTANCE_NAME` is the name for the Helm application.

`NAMESPACE` is where you want to deploy the application.

`PUBLIC_IP` is your public IP.

`PRIVATE_KEY` is the private key of the wallet (Metamask private key wallet).

`MAINNET` Specify if the network is main; if this value is false,, the issuer node will use mumbai.

`UIPASSWORD` is the password for user: ui-user. This password is used when the user visits the UI.

`ISSUERNAME` Issuer Name. This value is shown in the UI.

`ISSUER_ETHERUM_URL` is the blockchain RPC.

`INGRESS_ENABLED`: if this value is false, you must provide a PUBLIC_IP (in this case must be false).

`VAULT_PWD` is the vault password.

`RHS_MODE` Reverse Hash Service mode. Options: None, OnChain, OffChain.

`RHS_URL` Reverse Hash Service URL. Required if `RHS_MODE` is OffChain.

After assigning values to the environment variables, you should run the following command using Helm:

```bash
helm install "$APP_INSTANCE_NAME" . \
--create-namespace --namespace "$NAMESPACE" \
--set publicIP="$PUBLIC_IP" \
--set privatekey="$PRIVATE_KEY" \
--set mainnet="$MAINNET" \
--set uiPassword="$UIPASSWORD" \
--set issuerName="$ISSUERNAME" \
--set issuerEthereumUrl="$ISSUER_ETHERUM_URL" \
--set ingressEnabled="$INGRESS_ENABLED" \
--set privateKey="$PRIVATE_KEY" \
--set vaultpwd="$VAULT_PWD" \
--set rhsMode="$RHS_MODE" \
--set rhsUrl="$RHS_URL"
```

After a few minutes, you can access the app by visiting:

- http://`$PUBLIC_IP`:30001 for the API
- http://`$PUBLIC_IP`:30002 for the API UI
- http://`$PUBLIC_IP`:30003 for the UI
