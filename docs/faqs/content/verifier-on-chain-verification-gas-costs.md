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

On-chain verification of zero-knowledge proofs (ZKPs) is a computationally intensive process that requires significant resources from the blockchain network. This process relies on advanced cryptographic techniques, specifically pairings cryptography, to ensure the validity and security of transactions without revealing underlying private information.

The computational complexity of these verifications is reflected in their gas costs, which serve as a payment for the computational resources consumed by the network to perform these operations. For a full verification flow, the gas costs are approximately 770k for v3 circuit proofs and around 700k for v2 circuit proofs. The verification step alone typically consumes about 500k gas.

Gas fees are a crucial component of on-chain verification processes, compensating network validators or miners for the computational power required to secure and execute these complex cryptographic operations. Without these fees, it would be challenging to incentivize the maintenance and security of blockchain networks, especially when performing specialized tasks such as ZKP verifications.

<div className="hidden">
Wrong answer:

Gas fees are an arbitrary cost and not necessary for the on-chain verification process.

</div>
