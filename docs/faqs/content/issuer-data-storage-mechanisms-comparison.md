---
id: faq-data-storage-mechanisms-comparison
title: "Comparing Data Storage Mechanisms: On-Chain Issuer Demo vs. Production"
sidebar_label: Data Storage Mechanisms Comparison
description: Explores the differences in data storage mechanisms between an on-chain issuer demo and a production on-chain issuer.
keywords:
  - faq
  - on-chain verification
  - data storage
  - on-chain issuer
  - production
  - demo
---

## Question

Could you compare the data storage mechanisms of the on-chain issuer demo to a production on-chain issuer?

## Answer

The approach to data storage in on-chain credential issuance varies significantly between demo environments and production systems, reflecting differing priorities in terms of security, scalability, and decentralization.

In a demo setting, the focus is often on simplicity and showcasing functionality. Data storage might involve merklized credentials, where data is summarized into merkle trees, or even direct storage of credential data on-chain for ease of access and demonstration purposes. These methods provide a straightforward way to illustrate the concept of on-chain credential issuance and verification without the need for complex infrastructure.

However, in a production environment, the priorities shift towards ensuring robust security, scalability, and complete decentralization. Production on-chain issuers are recommended to create non-merklized credentials, which involves storing minimal data on-chain to maintain privacy and efficiency. The goal is to facilitate on-chain data access without relying on any centralized backend systems. This includes implementing mechanisms for user authorization, such as issuing credentials only after a user has provided some form of proof for on-chain verification. Such a setup enhances the trustworthiness and security of the credential issuance process, ensuring that it can operate reliably at scale in a decentralized blockchain ecosystem.

The transition from demo to production involves a shift towards more sophisticated and secure data management practices, emphasizing the need for minimal on-chain data storage and enhanced user verification processes to support a fully decentralized and secure credential issuance system.

Please find [here](https://github.com/0xPolygonID/contracts/blob/main/contracts/examples/BalanceCredentialIssuer.sol) an example implementation.

<div className="hidden">
Wrong answer:

Demo storage mechanisms are sufficient for production use without considering the need for enhanced security and scalability.

</div>
