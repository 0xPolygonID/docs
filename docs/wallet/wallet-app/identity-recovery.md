---
id: identity-recovery
title: Identity backup and recovery for Local Accounts
sidebar_label: Identity backup and recovery
description: Procedure for Identity backup and recovery for Local Accounts
keywords:
  - docs
  - privado id
  - holder
  - issuer
  - verifier
  - wallet
  - recovery
  - backup
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Privado ID Wallet app offers an identity backup and recovery feature using your private key, allowing users to securely restore their identity and credentials if they lose access to their original device. To back up your identity, follow these steps to export your locally generated private key and import it into a crypto wallet, such as MetaMask, for recovery.

### Steps to Export Your Private Key:
1. Open the Privado ID Wallet app and navigate to Settings.
<div align="center">
<img src={useBaseUrl("img/recovery-1.png")}  width="300" align="center" />
</div>

2. Select Backup Private Key.
<div align="center">
<img src={useBaseUrl("img/recovery-2.png")}  width="300" align="center" />
</div>

3. Click on Reveal Private Key.
<div align="center">
<img src={useBaseUrl("img/recovery-3.png")}  width="300" align="center" />
</div>

4. Enter your PIN to confirm.

5. Click Copy to Clipboard to copy your private key.
<div align="center">
<img src={useBaseUrl("img/recovery-4.png")}  width="300" align="center" />
</div>

### Steps to Import Your Private Key into a Crypto Wallet: 
1. Install a crypto wallet such as MetaMask.

2. After installation, open MetaMask and click Get Started.

3. Select Create a New Wallet.
<div align="center">
<img src={useBaseUrl("img/recovery-5.png")}  width="300" align="center" />
</div>

4. Set a strong password for your new wallet and backup your Secret Recovery Phrase as per MetaMask's instructions.

5. Once the wallet is created, MetaMask will automatically create a default Account 1. Click on Account 1 in MetaMask.
<div align="center">
<img src={useBaseUrl("img/recovery-6.png")}  width="300" align="center" />
</div>

6. Select Add Account or Hardware Wallet and choose Import Account.
<div align="center">
<img src={useBaseUrl("img/recovery-7.png")}  width="300" align="center" />
</div>

7. Paste the private key copied from the Privado ID Wallet app and click IMPORT. This will create a second account labeled as Account 2 (Imported).
<div align="center">
<img src={useBaseUrl("img/recovery-8.png")}  width="300" align="center" />
</div>

Now, if you ever lose access to your device or the Privado ID Wallet app, you can log back into the Privado ID Wallet app using this imported account and regain access to your identity and credentials.

### Steps to Recover Your Identity and Credentials
1. Open the Privado ID Wallet app and click Connect via crypto wallet.
<div align="center">
<img src={useBaseUrl("img/recovery-9.png")}  width="300" align="center" />
</div>

2. Select Metamask
<div align="center">
<img src={useBaseUrl("img/recovery-10.png")}  width="300" align="center" />
</div>

3. MetaMask will open; ensure you select the same account you imported earlier, then click Connect.
<div align="center">
<img src={useBaseUrl("img/recovery-11.png")}  width="300" align="center" />
</div>

4. You will be redirected back to the Privado ID Wallet app. Click Sign Message.
<div align="center">
<img src={useBaseUrl("img/recovery-12.png")}  width="300" align="center" />
</div>

5. In the MetaMask app, read the message and click Sign.
<div align="center">
<img src={useBaseUrl("img/recovery-13.png")}  width="300" align="center" />
</div>

6. This will successfully recover your identity and credentials within the Privado ID Wallet app.
<div align="center">
<img src={useBaseUrl("img/recovery-14.png")}  width="300" align="center" />
</div>
