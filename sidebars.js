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
          label: "Install the Issuer Node",
          link: {
            type: "generated-index",
          },
          items: [
            "issuer-node/install-gcm",
            "issuer-node/install-kubernets"
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
        "wallet/wallet-overview",
        {
          type: "category",
          label: "Wallet SDK",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [
            {
              type: "category",
              label: "Flutter SDK",
              link: {
                type: "generated-index",
              },
              collapsed: true,
              items: [
                "wallet/wallet-sdk/polygonid-sdk/polygonid-sdk-overview",
                "wallet/wallet-sdk/flutter-sdk/install-flutter-sdk",
                "wallet/wallet-sdk/flutter-sdk/build-app-with-flutter-sdk",
                "wallet/wallet-sdk/polygonid-sdk/polygonid-sdk-plugin",
                "wallet/wallet-sdk/polygonid-sdk/example-app"
              ]
            },
            {
              type: "category",
              label: "Android SDK",
              link: {
                type: "generated-index",
              },
              collapsed: true,
              items: [
                "wallet/wallet-sdk/android-sdk/install-android-sdk",
                "wallet/wallet-sdk/android-sdk/example-app"
              ]
            },
          ]
        },
        {
          type: "category",
          label: "Wallet APIs",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [
            {
              type: "category",
              label: "Identity",
              link: {
                type: "generated-index",
                description:"An Identity Wallet creates and stores identities for a user. A user can have more than one identity and can have several credentials linked to each identity. An Identity is represented with an Identifier which allows the user's wallet to interact with an Issuer by authenticating itself first (before the credential can be issued)."
              },
              collapsed: true,
              items: [
                "wallet/wallet-sdk/polygonid-sdk/identity/create-identity",
                "wallet/wallet-sdk/polygonid-sdk/identity/get-identity",
                "wallet/wallet-sdk/polygonid-sdk/identity/get-identities",
                "wallet/wallet-sdk/polygonid-sdk/identity/backup-identity",
                "wallet/wallet-sdk/polygonid-sdk/identity/get-did-identifier",
                "wallet/wallet-sdk/polygonid-sdk/identity/get-state",
                "wallet/wallet-sdk/polygonid-sdk/identity/sign",
                "wallet/wallet-sdk/polygonid-sdk/identity/remove-identity",
                "wallet/wallet-sdk/polygonid-sdk/identity/restore-identity"
              ]
            },
            {
              type: "category",
              label: "Credential",
              link: {
                type: "generated-index",
                description:"The Credential Wallet lets a user fetch credentials from the Issuer and save these credentials in their wallet. These credentials are later used to prove thier identification to a Verifier. Once the credentials have been fetched and stored, a user can then retrieve them from the database, and update or delete them altogether. The credentials have unique IDs that let a user access them seamlessly."
              },
              collapsed: true,
              items: [
                "wallet/wallet-sdk/polygonid-sdk/credential/fetch-and-save",
                "wallet/wallet-sdk/polygonid-sdk/credential/get-claims",
                "wallet/wallet-sdk/polygonid-sdk/credential/update-claims",
                "wallet/wallet-sdk/polygonid-sdk/credential/remove-claims"
              ]
            },
            {
              type: "category",
              label: "Iden3comm",
              link: {
                type: "generated-index"
              },
              collapsed: true,
              items: [
                "wallet/wallet-sdk/polygonid-sdk/iden3comm/overview",
                "wallet/wallet-sdk/polygonid-sdk/iden3comm/auth-requests",
                "wallet/wallet-sdk/polygonid-sdk/iden3comm/jwz",
                {
                  type: "category",
                  label: "APIs",
                  link: {
                    type: "generated-index"
                  },
                  items:[
                    "wallet/wallet-sdk/polygonid-sdk/iden3comm/api/authenticate",
                    "wallet/wallet-sdk/polygonid-sdk/iden3comm/api/get-proofs",
                    "wallet/wallet-sdk/polygonid-sdk/iden3comm/api/get-vocabs",
                    "wallet/wallet-sdk/polygonid-sdk/iden3comm/api/get-iden3-msg"
                  ]
                }
              ]
            },
            {
              type: "category",
              label: "Proof",
              link: {
                type: "generated-index"
              },
              collapsed: true,
              items: [
                "wallet/wallet-sdk/polygonid-sdk/proof/overview",
                "wallet/wallet-sdk/polygonid-sdk/proof/proof-generation-api"
              ]
            },
            {
              type: "category",
              label: "Profile",
              link: {
                type: "generated-index",
                description: "The profiles feature allows users to have greater control over their digital identity and privacy. By default, the wallet provides a general profile (based on genesis ID), which generates a reusable identifier that can be used to create multiple connections. Apart from the general profile, users can utilize “private” profiles that generate a unique identifier to be used for creating connections."
              },
              collapsed: true,
              items: [
                "wallet/wallet-sdk/polygonid-sdk/profile/get-profiles",
                "wallet/wallet-sdk/polygonid-sdk/profile/add-profile",
                "wallet/wallet-sdk/polygonid-sdk/profile/remove-profile"
              ]
            }
          ]
        },
        {
          type: "category",
          label: "Polygon ID App",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [
            "wallet/wallet-sdk/polygonid-app",
            "wallet/features"
          ]
        },
        "wallet/push-notification"
      ],
    },
    "smart-contracts",
    {
      type: "category",
      label: "JS-SDK",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        "js-sdk/js-sdk-overview",
        {
          type: "category",
          label: "Components",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [
            "js-sdk/js-sdk-components/identity-wallet",
            "js-sdk/js-sdk-components/credential-wallet",
            "js-sdk/js-sdk-components/iden3comm",
            "js-sdk/js-sdk-components/proof"
          ],
        },
        "js-sdk/js-sdk-example",
        "js-sdk/js-sdk-browser-wallet-demo",
      ],
    },
    "releases"
  ],
}