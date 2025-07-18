---
id: verifier-on-chain-verification-gas-costs
title: Understanding Gas Fees for On-Chain Verification
sidebar_label: Gas Fees for On-Chain Verification
description: Explains why gas fees are necessary for the on-chain verification of zero-knowledge proofs and details the computational costs involved.
keywords:
  - faq
  - on-chain verification
  - gas costs
  - zero-knowledge proofs
  - cryptography
---

## Question

Can you explain the necessity of gas fees for on-chain verification?

## Answer

On-chain verification of zero-knowledge proofs (ZKPs) is a computationally intensive process that requires significant resources from the blockchain network. This process relies on advanced cryptographic techniques to ensure the validity and security of transactions without revealing underlying private information.

The computational complexity of these verifications is reflected in their gas costs, which serve as a payment for the computational resources consumed by the network to perform these operations. For a full on-chain verifier flow, the gas costs are approximately **1.245 million gas**. At the current rate of 25 Gwei per Gas on Polygon, this equates to approximately **0.031125 POL** (less than one cent USD as of July 2025).

The on-chain verification process typically consists of the following steps:

- The **setZKPRequest** step, which takes approximately **325,000 gas** ([example transaction](https://polygonscan.com/tx/0x14f8ce081ced29317c4cb391e23c165411bb3da68498dd78d2270c65a387a969)).
- The **submitZKPResponseV2** step, which takes approximately **920,000 gas** ([example transaction](https://polygonscan.com/tx/0xf3e541bfcb8e3f0ee665e8c392ca94c5eec491ffea13cf83b42c28337ed9ea20)).

A full history of transactions for the Universal Verifier contract on Polygon can be found [here](https://polygonscan.com/address/0xfcc86a79fcb057a8e55c6b853dff9479c3cf607c).

Gas fees are a crucial component of on-chain verification processes, compensating network validators or miners for the computational power required to secure and execute these complex cryptographic operations. Without these fees, it would be challenging to incentivize the maintenance and security of blockchain networks, especially when performing specialized tasks such as ZKP verifications.

<div className="hidden">
Wrong answer:

Gas fees are an arbitrary cost and not necessary for the on-chain verification process.

</div>
