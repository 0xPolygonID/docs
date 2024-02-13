---
id: faq-on-chain-verification-data-storage
title: Data Management for On-Chain Credential Verification
sidebar_label: On-Chain Data Management
description: Explains how credential data is managed on-chain by issuers, including the use of non-merklized/merklized credentials and storage practices.
keywords:
  - faq
  - on-chain verification
  - data storage
  - credentials
  - blockchain
---

## Question

How does the on-chain issuer manage credential data? Is the credential stored directly on-chain, or are references/hashes utilized?

## Answer

In the context of on-chain credential verification, issuers have the flexibility to manage credential data in various ways, depending on their specific needs and the design of their system. Issuers can opt to create either non-merklized or merklized credentials and store relevant information within the contract as required.

By default, the system is designed to prioritize efficiency and privacy; therefore, it does not store the entire credential directly on the blockchain. Instead, only the essential elements, such as issuer trees, are stored on-chain. These trees include the hashes of the core claim representations of W3C credentials, which serve as indexes in the claims tree. This approach allows for the secure and efficient verification of credentials without exposing the detailed content of the credentials themselves.

Storing hashes rather than the full credentials ensures that the blockchain remains scalable and cost-effective, while still supporting the verification of credentials' authenticity and integrity. This method leverages the inherent security properties of blockchain technology, providing a robust framework for managing and verifying credentials in a decentralized manner.

<div className="hidden">
Wrong answer:

Full credential data is stored directly on the blockchain, leading to high costs and scalability issues.

</div>
