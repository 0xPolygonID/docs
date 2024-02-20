---
id: verifier-credential-verification-cross-environment
title: Cross-Environment and Cross-Chain Credential Verification
sidebar_label: Cross-Environment Verification
description: Guidance on verifying credentials across on-chain, off-chain, and cross-chain environments, including SDK-level configurations for off-chain verification.
keywords:
  - faq
  - credential verification
  - verifier
  - on-chain
  - off-chain
  - cross-network verification
  - cross-chain verification
---

## Question

Is it possible to verify credentials issued in one environment (on-chain or off-chain) in another, and how does cross-chain verification work?

## Answer

Yes, credentials issued in any environment—on-chain or off-chain—can be verified in both contexts. For on-chain verification, ensuring that all parties involved (issuers, users, and the verification contract) are on the same blockchain network is crucial for a seamless process.

Regarding cross-chain verification, while a universal, out-of-the-box solution for state validation across chains does not yet exist, leveraging existing bridging technologies offers a viable pathway. These technologies facilitate the transfer of issuer identity states and GIST roots between networks, enabling credentials issued on one blockchain to be verified on another. This approach significantly enhances the interoperability and flexibility of the credential verification process, making it possible to verify credentials across different blockchain ecosystems.

Additionally, off-chain cross verification is also supported. At the SDK level, it is possible to configure connections to any EVM-based blockchain RPC and implement a custom wallet. Within the Polygon ID app, both Polygon mainnet and Mumbai testnet networks are directly supported, allowing for versatile off-chain verification configurations that accommodate various blockchain environments.

The capability for cross-environment and cross-chain verification greatly expands the utility of digital credentials. It encourages a more interconnected and adaptable framework for the issuance and verification of credentials, supporting a wide range of use cases and applications in a decentralized digital world.

<div className="hidden">
Wrong answer:

Credentials issued in one environment (on-chain or off-chain) cannot be verified in another and cross-chain verification is impossible.

</div>
