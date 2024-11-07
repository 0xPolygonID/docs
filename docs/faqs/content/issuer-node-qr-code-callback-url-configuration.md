---
id: issuer-node-qr-code-callback-url-configuration
title: "Configuring QR Code or Universal Link Callback URL for Issuer Node"
sidebar_label: QR Code or Universal Link Callback URL Configuration
description: Explains how to resolve issues with QR code or Universal Link callback URLs during credential issuance, including a tutorial on using ngrok or local tunnel to make the issuer node API address accessible.
keywords:
  - faq
  - issuer-node
  - QR code
  - callback URL
  - ngrok
  - local tunnel
  - mobile app
---

## Question

How can I resolve the error that occurs when the mobile app wallet or web wallet scans a QR code or opens a Universal Link with a callback URL that is not properly configured (e.g., using "localhost")?

## Answer

This issue arises when the "localhost" address in the QR code’s or Universal Link’s callback URL isn’t accessible from external networks, preventing mobile devices or our [web wallet](https://wallet.privado.id) from connecting to it. To make the issuer node's API address publicly accessible during development, you can use tools like ngrok or local tunnel to expose your local server to the internet.

:::caution
These tools are intended only for testing or development environments. In production, ensure that required ports are securely opened in your proxy or router.
:::

### Using Ngrok

1. **Download and Install Ngrok**: Visit [ngrok's website](https://ngrok.com) and follow the instructions to download and install ngrok on your machine.

2. **Start Ngrok**: Use ngrok to expose your local server’s port 3001 to the internet:

   ```bash
   ngrok http 3001
   ```

   Ngrok will provide a public URL forwarding to your local server.

   :::caution
   Visit the provided URL to ensure it displays your API docs UI. If you see a page from ngrok, click "Visit site" if prompted.
   :::

   <div align="center">

   ![Ngrok Visit Site](/img/faqs/ngrok-visit-site.png)

   </div>

3. **Update the Callback URL**: Use the URL provided by ngrok as the value for the `ISSUER_SERVER_URL` environment variable, then restart the services to apply it as the base URL for your callback. This ensures external accessibility.

### Using Local Tunnel

1. **Install Local Tunnel**: Install local tunnel globally on your machine using npm:

   ```bash
   npm install -g localtunnel
   ```

2. **Start Local Tunnel**: Use local tunnel to expose your local server’s port 3001 to the internet:

   ```bash
   lt --port 3001
   ```

   Local tunnel will generate a URL forwarding to your local server.

   :::caution
   Visit the generated URL to confirm it displays your API docs UI. Follow any additional prompts from local tunnel, such as entering a password or whitelisting your IP if required.
   :::

   <div align="center">

   ![Local Tunnel Visit Site](/img/faqs/local-tunnel-visit-site.png)

   </div>

3. **Update the Callback URL**: Set the URL provided by local tunnel as the value for `ISSUER_SERVER_URL`, then restart your services. This makes the callback URL accessible externally.

   :::note
   For a visual guide, refer to [this GitHub comment](https://github.com/0xPolygonID/issuer-node/issues/520#issuecomment-1826269876), where a setup demonstration begins at minute 1:20.
   :::

### Final Steps

Once you've set up ngrok or local tunnel and obtained a public URL, integrate it into the QR code and Universal Link generation process as the callback URL. This configuration will enable seamless communication between your issuer node API and the mobile app or web wallet.

For additional assistance or troubleshooting, consult the documentation for ngrok or local tunnel.

<div className="hidden">
Wrong answer:

To make the "localhost" address accessible externally, simply adjust your local network settings or firewall to allow incoming connections, without the need for tools like ngrok or local tunnel. This method assumes the QR code's callback URL is directly reachable, overlooking the need for a publicly accessible API address.

</div>
