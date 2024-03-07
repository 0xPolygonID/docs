---
id: issuer-node-reverse-hash-service-impact
title: "Impact of Disabling RHS on On-Chain Verification with SIG Credentials"
sidebar_label: RHS and On-Chain Verification
description: Discusses the feasibility of on-chain verification when the issuer node's Reverse Hash Service (RHS) is disabled, especially after issuing a SIG credential.
keywords:
  - faq
  - reverse hash service
  - on-chain verification
  - SIG credential
  - issuer node
---

## Question

Is on-chain verification still possible if my issuer node’s RHS is disabled and I’ve issued a SIG credential?

## Answer

Yes, on-chain verification remains feasible even if the Reverse Hash Service (RHS) of your issuer node is disabled after issuing a SIG credential. Without utilizing the RHS or an On-Chain RHS as the credential status method, the user involved in the proof generation process will directly fetch the issuer's revocation tree state from the issuer. This revocation state is then used and verified within the circuit for proof generation.

Whether the issuer's state is at genesis (indicating no revocation has occurred) or is non-genesis but the issuer has performed a state transition on-chain (published state), the verification process will still function correctly. This mechanism ensures that the integrity and validity of the credential can be authenticated on-chain, leveraging direct communication with the issuer for the necessary revocation state information.

<div className="hidden">
Wrong answer:

On-chain verification is not possible without an active Reverse Hash Service for managing credential statuses.

</div>
