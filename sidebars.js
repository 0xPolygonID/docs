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
      collapsed: false,
      items: [
        "issuer/overview",
        "issuer/issuer-demo",
        "issuer/custom-schema",
      ],
    },
    {
      type: "category",
      label: "Verifier",
      link: {
        type: "generated-index",
      },
      collapsed: false,
      items: [
        "verifier/overview",
        "verifier/demo-verifier",
        {
          type: "category",
          label: "Off-chain Verification",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [
            "verifier/off-chain-verification",
            "verifier/verifier-setup",
            {
              type: "category",
              label: "API",
              link: {
                type: "generated-index",
              },
              collapsed: true,
              items: [
                "verifier/config",
                "verifier/request-api",
                "verifier/verification-api",
              ],
            },
          ],
        },
        "verifier/on-chain-verification",
        "verifier/zk-query-language",
      ],
    },
    {
      type: "category",
      label: "Wallet",
      link: {
        type: "generated-index",
      },
      collapsed: false,
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
      collapsed: false,
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