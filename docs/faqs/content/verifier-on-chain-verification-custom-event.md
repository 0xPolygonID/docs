---
id: verifier-on-chain-verification-custom-event
title: "Detecting Completion of On-Chain Verification in Frontend"
sidebar_label: On-Chain Verification Event
description: Explains how to determine the completion of on-chain verification from the frontend, highlighting the use of custom events in smart contracts.
keywords:
  - faq
  - on-chain verification
  - smart contract
  - frontend
  - callback method
  - events
---

## Question

After successfully creating my smart contract for on-chain verification and verifying my credential on-chain, how can I know if the verification is completed from the frontend? Is there any callback method for on-chain verification?

## Answer

By default, validators in the smart contract do not trigger any events to signal the completion of on-chain verification. To address this from a frontend perspective, you can enhance your smart contract by incorporating custom events. These events can be emitted in the `_afterProofSubmit` hook of your contract.

Here’s a brief guide on implementing and utilizing this approach:

1. **Modify Your Smart Contract**: Add a custom event in your contract that fires upon successful completion of the `_afterProofSubmit` hook. For example:

   ```solidity
   event VerificationCompleted(bool verified);

   function _afterProofSubmit(...) internal override {
       ...
       emit VerificationCompleted(true);
   }
   ```

2. **Listen for the Event in Frontend**: In your frontend application, use web3.js, ethers.js, or a similar library to listen for the specific event emitted by your contract. You'll need to specify the contract address and the event signature.

   ```javascript
   myContract.on("VerificationCompleted", (verified) => {
     if (verified) {
       console.log("Verification completed successfully.");
     }
   });
   ```

This method allows your frontend to asynchronously receive a notification when the on-chain verification process has concluded, enabling you to take further actions or update the UI accordingly.

Remember, you will need to listen for events on the specific contract address involved in the verification process, ensuring your frontend is dynamically updated based on the contract's activity.

<div className="hidden">
Wrong answer:

There's no way for a smart contract to notify other actors such as a frontend about a successful on-chain verification process. The only method to determine the completion of on-chain verification is by repeatedly querying the contract's state (polling).

</div>
