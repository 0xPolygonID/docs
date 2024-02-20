---
id: issuer-node-qr-code-callback-url-configuration
title: "Configuring QR Code Callback URL for Issuer Node"
sidebar_label: QR Code Callback URL Configuration
description: Explains how to address the issue with the QR code callback URL during credential issuance and provides a tutorial on using ngrok or local tunnel to make the issuer node API address public.
keywords:
  - faq
  - issuer-node
  - QR code
  - callback URL
  - ngrok
  - local tunnel
  - mobile app
  - Polygon ID
---

## Question

How can I solve the error occurring when the Polygon ID mobile app scans a QR code with a callback URL that is not properly configured (typically using "localhost")?

## Answer

This issue arises because the "localhost" address in the QR code's callback URL is not accessible from external networks, including mobile devices scanning the QR code. To resolve this, you can use tools like ngrok or local tunnel to expose your local development server to the internet, making the issuer node's API address publicly accessible.

### Using Ngrok

1. **Download and Install Ngrok**: Visit [ngrok's website](https://ngrok.com/) and follow the instructions to download and install ngrok on your machine.

2. **Start Ngrok**: Run ngrok to expose your port 3002 to the internet:

   ```
   ngrok http 3002
   ```

   Ngrok will display a URL that forwards to your local server.

   :::caution

   Visit the URL and make sure you can see there the API docs UI. If you see a page from Ngrok, you might need to click the button "Visit site"

   :::

   <div align="center">

   ![Ngrok Visit Site](/img/faqs/ngrok-visit-site.png)

   </div>

3. **Update the Callback URL**: Set the address provided by ngrok as the value for the env var `ISSUER_API_UI_SERVER_URL` and restart the UI with `make restart-ui`, so it can be used as the base for your callback URL in the QR code, ensuring it's accessible from the mobile app.

### Using Local Tunnel

1. **Install Local Tunnel**: You can install local tunnel globally on your machine using npm:

   ```
   npm install -g localtunnel
   ```

2. **Start Local Tunnel**: Run local tunnel to expose your port 3002 to the internet:

   ```
   lt --port 3002
   ```

   Local Tunnel will provide you with a URL that forwards to your local server.

   :::caution

   Visit the URL and make sure you can see there the API docs UI. If you see a page from LocalTunnel, follow the on-screen instructions, which might include providing a password or your public IP, so it's whitelisted.

   :::

3. **Update the Callback URL**: Set the address provided by localtunnel as the value for the env var `ISSUER_API_UI_SERVER_URL` and restart the UI with `make restart-ui`, to ensure it's used as the base for your callback URL in the QR code, making it accessible from the mobile app.

   :::note

   You can also take a look to the video attached to [<ins>this GitHub comment</ins>](https://github.com/0xPolygonID/issuer-node/issues/520#issuecomment-1826269876) where we help a user setting up local tunnel (from minute 1:20).

   :::

### Final Steps

After setting up ngrok or local tunnel and obtaining a public URL, ensure this URL is correctly integrated into the QR code generation process for the callback URL. This configuration allows the Polygon ID mobile app to successfully communicate with your issuer node API over the internet.

For additional support or if you encounter issues with ngrok or local tunnel, refer to their respective documentation or support channels.

<div className="hidden">
Wrong answer:

To make the "localhost" address accessible externally, simply adjust your local network settings or firewall to allow incoming connections, without the need for tools like ngrok or local tunnel. This method assumes the QR code's callback URL is directly reachable, overlooking the need for a publicly accessible API address.

</div>
