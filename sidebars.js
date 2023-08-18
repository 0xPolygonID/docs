/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  polygonid: [
    {
      type: 'html',
      value: 'Polygon ID',
      className: 'sidebar-title',
    },
    "introduction",
    "quick-start-demo",
    {
      type: "category",
      label: "Issuer",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        "issuer/issuer-overview",
        {
          type: "category",
          label: "Issuer Node Core API",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [
            "issuer/issuer-core",
            "issuer/setup-issuer-core",
            {
              type: "category",
              label: "API Reference",
              link: {
                type: "generated-index",
              },
              collapsed: true,
              items: [
                "issuer-node/issuer-node-api/introduction",
                "issuer-node/issuer-node-api/identity/apis",
                "issuer-node/issuer-node-api/claim/apis",
                "issuer-node/issuer-node-api/agent/apis",
              ],
            }
          ],
        },
        {
          type: "category",
          label: "Issuer Node UI",
          link: {
            type: "generated-index",
          },
          items: [
            "issuer/issuer-node-ui",
            "issuer/setup-issuer-ui",
            "issuer-node/issuer-node-guide",
          ]
        },
        {
          type: "category",
          label: "On-chain Issuer",
          link: {
            type: "generated-index",
          },
          items: [
            "issuer/on-chain-issuer/on-chain-overview",
            "issuer/on-chain-issuer/on-chain-tutorial"
          ]
        },
        {
          type: "category",
          label: "Schemas",
          link: {
            type: "generated-index",
          },
          items: [
            "issuer/schema-builder",
            "issuer/schema",
            "issuer/schema-exs",
          ]
        },
        "contracts/credential-linkage",
        "issuer/cred-issue-methods",
        "issuer-node/issue-credential-cli",
        "issuer/source-code",
      ],
    },
    {
      type: "category",
      label: "Verifier",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        "verifier/verifier-overview",
        "verifier/demo-verifier",
        "verifier/features",
        {
          type: "category",
          label: "Off-chain Verification",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [
            "verifier/verification-library/verifier-library-intro",
            {
              type: "category",
              label: "API",
              link: {
                type: "generated-index",
              },
              collapsed: true,
              items: [
                "verifier/verification-library/config",
                "verifier/verification-library/request-api",
                "verifier/verification-library/verification-api",
              ],
            },
            "verifier/verification-library/verifier-setup",
          ],
        },
        "verifier/on-chain-verification/overview",
        "verifier/query-builder",
        "verifier/verification-library/zk-query-language",
      ],
    },
    {
      type: "category",
      label: "Wallet",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        "wallet/overview",
      ],
    },
    "smart-contracts"
  ],

  nodes: [
    {
      type: 'html',
      value: 'Issuer Node',
      className: 'sidebar-title',
    },
    "node/overview",
    "node/id-integration",
    {
      type: "category",
      label: "Issuer Node API",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        "node/identity-apis",
        "node/claim-apis",
        "node/agent-apis",
      ],
    },
  ],

  sdk: [
    {
      type: 'html',
      value: 'Polygon ID SDK',
      className: 'sidebar-title',
    },
    "wallet-sdk/overview",
    "wallet-sdk/flutter-sdk",
    "wallet-sdk/install-polygonid-sdk",
    "wallet-sdk/example-app",
    "wallet-sdk/proof/proof-generation-api",
    {
      type: "category",
      label: "Identity Wallet",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        "wallet-sdk/identity/identity-wallet",
        {
          type: "category",
          label: "API",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [
            "wallet-sdk/identity/backup-identity",
            "wallet-sdk/identity/get-did-identifier",
            "wallet-sdk/identity/get-identity",
            "wallet-sdk/identity/get-identities",
            "wallet-sdk/identity/remove-identity",
            "wallet-sdk/identity/restore-identity",
            "wallet-sdk/identity/sign",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Credential Wallet",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        "wallet-sdk/credential/overview",
        {
          type: "category",
          label: "API",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [
            "wallet-sdk/credential/fetch-and-save",
            "wallet-sdk/credential/get-claims",
            "wallet-sdk/credential/update-claims",
            "wallet-sdk/credential/remove-claims",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Iden3comm Protocol",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        "wallet-sdk/iden3comm/overview",
        "wallet-sdk/iden3comm/auth-requests",
        "wallet-sdk/iden3comm/jwz",
        {
          type: "category",
          label: "API",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [
            "wallet-sdk/iden3comm/authenticate",
            "wallet-sdk/iden3comm/get-proofs",
            "wallet-sdk/iden3comm/get-vocabulary",
            "wallet-sdk/iden3comm/get-iden3-msg",
          ],
        },
      ],
    },
  ],
};