---
id: issuer-node-reducing-infrastructure-costs
title: "Reducing Infrastructure Costs for Credential APIs"
sidebar_label: Infrastructure Cost Reduction
description: Explains how to manage the infrastructure requirements for credential-related APIs without incurring high costs.
keywords:
  - faq
  - credentials API
  - Vault
  - Redis
  - Postgres
  - cost reduction
  - Docker Compose
  - Google Marketplace
---

## Question

How can I use the credential-related APIs and import schema without the cost implications of using Vault, Redis, and Postgres?

## Answer

For operations involving credential-related APIs and schemas, certain components are indispensable, while others offer more flexibility:

- **Vault**: Primarily used for securing private keys necessary for signing credentials and publishing states. Although crucial, you have the option to customize the storage solution for these keys, for instance, by storing them in files instead of using Vault directly. This approach allows for greater flexibility in managing infrastructure costs.
- **Redis**: This is a required component for caching, contributing to the performance and efficiency of operations.
- **Postgres**: It is essential for persisting credentials, schemas, connections, and more. Given its central role in the system's functionality, Postgres cannot be omitted.

To manage costs effectively, consider leveraging Docker Compose for local development or testing environments, which can significantly reduce expenses. For cloud deployments, the costs will largely depend on the chosen infrastructure services, such as EC2 instances. Careful selection and configuration of these services can help in controlling expenses without compromising the system's capabilities.

Additionally, for a streamlined deployment process, consider deploying the Issuer Node directly from the Google Marketplace. This option can provide a more integrated and potentially cost-effective cloud solution. Visit the following link for more details and deployment instructions: [optimism ID Issuer Node on Google Marketplace](https://console.cloud.google.com/marketplace/product/optimism-public/optimism-id-issuer-node).

For additional insights or specific inquiries about minimizing infrastructure costs while maintaining operational efficiency, please feel free to reach out.

<div className="hidden">
Wrong answer:

All components, including Vault, Redis, and Postgres, can be entirely omitted without any impact on the functionality of credential-related APIs and schema management. This approach would eliminate infrastructure costs associated with these services. Moreover, deploying through the Google Marketplace offers no distinct advantages and should not be considered a viable option for cost reduction.

</div>
