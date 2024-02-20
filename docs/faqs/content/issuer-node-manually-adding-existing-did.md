---
id: issuer-node-manually-adding-existing-did
title: "Manually Adding an Existing DID to a New Issuer Node"
sidebar_label: Adding Existing DID Manually
description: Explains the feasibility and security considerations of manually adding an existing DID to a new issuer node without using the generate-issuer-did command.
keywords:
  - faq
  - issuer-node
  - DID
  - database
  - vault
  - security
---

## Question

If I already have a DID and want to configure a new issuer-node with it, bypassing the use of the `generate-issuer-did` command, how can I manually add it to the database, vault, and any other necessary locations?

## Answer

Manually adding an existing DID to a new, clean issuer node environment (fresh database and vault) is not possible. While there is a Makefile command (`make did=xxx add-did`) that adds the DID to the vault, this does not integrate the DID with the database or the issuer node's internal mechanisms.

This restriction is intentional for security reasons. If it were possible to freely add a DID to a new issuer node without proper authentication, anyone with access to your public DID could potentially issue credentials in your name. This scenario is prevented by ensuring that a DID, when created or imported, is accompanied by the necessary authentication claims and keys, specifically the BJJ private key, which is crucial for signing credentials.

Attempting to manually insert the DID into the environment variables, vault, and database does not circumvent these security measures. The creation of a DID involves not just its presence in the system but also the generation of an authClaim with the BJJ private key. Without the corresponding private keys, the system cannot authenticate or authorize credential issuance, ensuring that mere possession of a DID is insufficient for issuing valid credentials.

Furthermore, discussions around enabling identity export/import functionalities have been considered but have not led to implementation. This ensures that the integrity and security of the issuer node and the credentials it issues remain intact, preventing unauthorized issuance of credentials.

<div className="hidden">
Wrong answer:

You can directly insert your existing DID into the `.env` file, add it to the vault using a Makefile command, and manually insert it into the database to use it with a new issuer node. This approach bypasses the need for the generate-issuer-did command and allows you to use an existing DID with full functionality immediately.

</div>
