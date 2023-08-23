---
id: js-sdk-browser-wallet-demo
title: JS SDK Browser Wallet Demo
sidebar_label: Browser Wallet Demo
description: Check out a sample of a JS SDK browser application implementation.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet
  - js sdk
  - credential
  - proof
  - browser
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Demo for Polygon ID JS SDK Browser Wallet Extension

Polygon ID has created a [sample browser wallet extension](https://github.com/0xPolygonID/extension-demo) based on our JS SDK that lets its user fetch credentials from an Issuer and generate proof for these credentials to be presented to a Verifier. 

You need to [manually install the browser wallet extension](https://github.com/0xPolygonID/extension-demo#how-deploy-project-as-chrome-extension) on your machine. This wallet works like a common crypto wallet such as the MetaMask Wallet but differs in functionality. 

:::note

Some of the content on this page is still to be updated. Please note that the "Polygon Verify" service mentioned in the screenshots has been eliminated. The screenshots illustrate the general process of how the JS SDK wallet extension works.

:::

## Demo for JS SDK Browser Extension Wallet

1. Install the Polygon ID JS SDK browser wallet extension on your machine and open it. 

2. When you open the extension for the first time, it prompts you to create a new wallet or import an existing wallet. Click **Create a New Wallet**. 

    <div align="center">
    <img src={useBaseUrl("/img/create-new-wallet.png")} align="center" border="1" width="500"/>
    </div>
    <br />

3. This shows the ***Create Password*** screen. Enter your password and confirm it. Click **Create**. 

    <div align="center">
    <img src={useBaseUrl("/img/create-password.png")}  align="center" border="1" width="500" />
    </div>
    <br />

4. This displays the Polygon Account window on your browser wallet. 

    <div align="center">
    <img src={useBaseUrl("/img/polygon-account.png")}  align="center" border="1" width="300" />
    </div>
    <br />

5. Open the Polygon Verify website (this is like an Issuer site that issues credentials to its users). Click **Sign Up**. 

    <div align="center">
    <img src={useBaseUrl("/img/polygon-verify-signup.png")} align="center" width="1000" />
    </div>
    <br />

6. A QR Code is displayed. Click on the ***Polygon ID*** icon to open your browser wallet.

    <div align="center">
    <img src={useBaseUrl("/img/qr-code-polygonid-symbol.png")} align="center" width="1000" />
    </div>
    <br />

7. Your wallet shows the ***Authorization*** window. Click **Approve**. 

    <div align="center">
    <img src={useBaseUrl("/img/approve.png")} align="center" border="1" width="300" />
    </div>
    <br />

    This shows auth info and claims list on the Polygon Verify site. 

    <div align="center">
    <img src={useBaseUrl("/img/auth-info-claim-list.png")} align="center" border="1" width="1000" />
    </div>
   

## Steps to Create and Fetch Credentials

1. On the website, click **Create Claim**. 

    <div align="center">
    <img src={useBaseUrl("/img/create-claim-on-site.png")} align="center" width="1000" />
    </div>
    <br/>

2. This displays the screen to create claims.

    <div align="center">
    <img src={useBaseUrl("/img/create-claim-window.png")} align="center" border="1" width="800" />
    </div>
    <br />

3. Select **Schema** which you need to create credentials. Enter **Schema URL**, type of credential required, date of expiration of the credential, and other information related to the credential. For example, for a KYCAgeCredential, we can enter **birthdate** and **DocumentType**. Click **Submit**. 

    <div align="center">
    <img src={useBaseUrl("/img/schema-details.png")} align="center" border="1" width="1000" />
    </div>
    <br />

4. After some moment, the credential is created successfully. 

    <div align="center">
    <img src={useBaseUrl("/img/claim-created-successfully.png")} align="center" width="1000" />
    </div>
    <br />

5. As the credential is now created, the user needs to fetch it to his/her browser wallet. The website displays the QR code. Click the ***Polygon ID*** icon to open your browser wallet. On the wallet, click **Receive**.

    <div align="center">
    <img src={useBaseUrl("/img/receive-claim.png")}  align="center" width="500" />
    </div>
    <br/>

    The credential is now saved on your browser wallet.
    <br />

    <div align="center">
    <img src={useBaseUrl("/img/claim-received.png")} align="center" width="500" />
    </div>

## Steps to Create KYCAgeCredential Signature Proof

1. On the Polygon Verify website, select the ***KYCAgeCredential(less than 2000/01/01)- sig*** type of credential. 

    <div align="center">
    <img src={useBaseUrl("/img/kycage-signature.png")} align="center" border="1" width="1000" />
    </div>
    <br />

2. Click **Sign In**. This shows the QR code for the credential type you selected in the step above. Click the ***Polygon ID*** icon to open your browser wallet.

    <div align="center">
    <img src={useBaseUrl("/img/qr-code-polygonid-symbol.png")} align="center" border="1" width="1000" />
    </div>
    <br /> 

3. The browser wallet shows the ***Proof Request*** window. Here, you can see the type of credential and proof requested. As you have selected the credential based on signature proof, the ***Proof Type*** shown here is type ***credentialAtomicQuerySigV2***. Click **Continue**.

    <div align="center">
    <img src={useBaseUrl("/img/proof-request-window.png")}  align="center" width="500" />
    </div>
    <br />
     
4. The website verifies your membership successfully.

    <div align="center">
    <img src={useBaseUrl("/img/membership-verified.png")} align="center" border="1" width="1000" />
    </div>
    <br />

5. On the wallet, click **KYCAgeCredential** to view its details including ***birthday***, ***documentType***, ***Issuer*** (DID of Issuer), ***Issued On*** (Date of Issuance), ***Expiration Date***, and ***Proof types*** (in this case, it is BJJSignature2021).

    <div align="center">
    <img src={useBaseUrl("/img/kycage-credential-details.png")} align="center" border="0.5" width="500" />
    </div>
    <br /> 

6. On the Polygon Verify website, click **Auth Info** to view details of the ***Auth Request*** (authorization requested by the user). 

    <div align="center">
    <img src={useBaseUrl("/img/authorization-request.png")} align="center" border="1" width="1000" />
    </div>
    <br />

    Scroll down the page to view ***Auth Response***. Here, you can see the proof and the public signals (used to generate the proof), and the JWZ token. Copy the JWZ token and paste it on the [Polygon ID JWZ Validator](https://jwz.polygonid.me) site. Click **Validate**.

    <br />

    <div align="center">
    <img src={useBaseUrl("/img/authorization-response.png")}  align="center" border="1" width="1000" />
    </div>
    <br />

    Upon validation, the JWZ token is broken down into three parts: ***Header***, ***Payload***, and ***Auth Proof***.  

    Header and Payload:
    <div align="center">
    <img src={useBaseUrl("/img/jwz-validated.png")} align="center" border="1" width="1000" />
    </div>
    <br /> 

    Auth Proof:
    <div align="center">
    <img src={useBaseUrl("/img/jwz-proofs.png")} align="center" border="1" width="1000" />
    </div>
    <br />
    
    You can see proof along with other data including ***from*** and ***to*** fields. The ***from*** field shows the DID that sent the proof request. It must match your wallet's DID. The ***to*** represents the Verifier DID to whom the proof request has been sent. 

7. Wait for the proof to get published on-chain. After that, on the website, you can view the credential details that show ***state*** information such as ***txId*** (ID of the transaction done from a wallet to complete publishing of the state on-chain), ***blockTimestamp*** (time at which block was created), ***blockNumber***, ***rootofRoots*** (Roots tree), ***claimsTreeRoot*** (Claims tree), ***revocationTreeRoot***(Revocation tree): 
    
    <div align="center">
    <img src={useBaseUrl("/img/credential-detail-icon.png")}  align="center" width="1000" />
    </div>

    Credential details:
    <div align="center">
    <img src={useBaseUrl("/img/credential-details.png")}  align="center" width="1000" />
    </div>
 
8. Below the QR code, click the ***Polygon ID*** icon to open your browser wallet. On your wallet, click **Receive** to fetch and save the credential to your wallet. 

    <div align="center">
    <img src={useBaseUrl("/img/receive-kycage-credential.png")} align="center" border="1" width="1000" />
    </div>
    <br />

    Click on your ***KYCAgeCredential*** to view its details. You can now see that you have two types of proofs in your wallet: ***BJJSignature2021*** and ***iden3SparseMerkleTreeProof*** 

    <div align="center">
    <img src={useBaseUrl("/img/proof-types.png")} align="center" width="500" />
    </div>
    <br />
 
## Steps to Create KYCAgeCredential Merkle Tree Proof

1. On the Polygon Verify website, select the ***KYCAgeCredential(less than 2000/01/01)- mtp*** credential type. 
    <div align="center">
    <img src={useBaseUrl("/img/kycage-mtp.png")} align="center" width="1000" />
    </div>
    <br />

2. Click **Sign In**. This shows the QR code for the credential type you selected in the step above. Click the ***Polygon ID*** icon to open your browser wallet.

    <div align="center">
    <img src={useBaseUrl("/img/qr-code-polygonid-symbol.png")}  align="center" width="1000" />
    </div>
    <br />

3. The browser wallet shows the ***Proof Request*** window. Here, you can see the type of credential and proof requested. As you have selected the credential based on MTP proof, the ***Proof Type*** shown here is ***credentialAtomicQueryMTPV2***. Click **Continue**.

    <div align="center">
    <img src={useBaseUrl("/img/proof-request-mtp.png")} align="center" border="1" width="500" />
    </div>
    <br />

4. The website verifies your membership successfully.
    <br />

    <div align="center">
    <img src={useBaseUrl("/img/membership-verified.png")} align="center" width="1000" />
    </div>
    <br />

5. On the Polygon Verify website, click **Auth Info** to view details of the ***Auth Request*** (authorization requested by the user). 

    Scroll down the page to view ***Auth Response***. Here, you can see the proof, the public signals (used to generate the proof), and the JWZ token. Copy the JWZ token and paste it on the [Polygon ID JWZ Validator](https://jwz.polygonid.me) site. Click **Validate**. 

    Upon validation, the JWZ token is broken down into three parts: ***Header***, ***Payload***, and ***Auth Proof***.  

    <div align="center">
    <img src={useBaseUrl("/img/jwz-validation.png")} align="center" border="1" width="1000" />
    </div>

    <br />

    Header and Payload:
    <div align="center">
    <img src={useBaseUrl("/img/jwz-validated.png")}  align="center" border="1" width="1000" />
    </div>

    <br /> 

    Auth Proof:
    <div align="center">
    <img src={useBaseUrl("/img/jwz-proofs-mtp.png")} align="center" border="1" width="1000" />
    </div>
    <br />

    You can see proof (***CredentialAtomicQueryMTPV2***) along with the other data including ***from*** and ***to*** fields. The ***from***  field shows the DID that sent the proof request. It must match your wallet's DID. The ***to*** represents the Verifier DID to whom the proof request has been sent. 

6. Wait for the proof to get published on-chain. After that, on the website, you can view the credential details that show ***state*** information such as ***txId*** (ID of the transaction done from a wallet to complete publishing of the state on-chain), ***blockTimestamp*** (time at which block was created), ***blockNumber***, ***rootofRoots*** (Roots tree), ***claimsTreeRoot*** (Claims tree), ***revocationTreeRoot***(Revocation tree): 

    <div align="center">
    <img src={useBaseUrl("/img/credential-detail-icon.png")}  align="center" width="1000" />
    </div>

    Credential details:
    <div align="center">
    <img src={useBaseUrl("/img/credential-details.png")}  align="center" width="1000" />
    </div>

7. Below the QR code, click the ***Polygon ID*** icon to open your browser wallet. On your wallet, click **Receive** to fetch and save the credential to your wallet. 

    <div align="center">
    <img src={useBaseUrl("/img/receive-kycage-credential.png")} align="center" width="1000" />
    </div>

