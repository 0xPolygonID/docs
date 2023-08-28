const math = require('remark-math');
const katex = require('rehype-katex');

module.exports = {
  title: "Polygon ID Documentation",
  tagline: "The official developer documentation hub for Polygon ID.",
  url: "https://id.polygon.technology",
  baseUrl: "/",
  favicon: "/img/logo-round-purple.png",
  organizationName: "maticnetwork",
  projectName: "id-docs",
  trailingSlash: true,
  customFields: {
    description: "Build your next blockchain dApp using Polygon ID.",
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
    },
  },

  onBrokenLinks: 'log',
  themeConfig: {
    announcementBar: {
      id: 'learn_more',
      content:
          'New release: On-chain issuer, Schema repository & builder <a class="announcement-link" target="_blank" rel="noopener noreferrer" href="https://0xpolygonid.github.io/tutorials/"> Learn more</a>',
      backgroundColor: '#20232a',
      textColor: '#fff',
      isCloseable: false,
    },
    metadata: [{name: 'description', content: 'Welcome to Polygon ID Documentation, the official documentation for Polygon ID.'}],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: "Polygon Labs",
          items: [
            {
              label: "About Us",
              href: "https://polygon.technology/about/"
            },
            {
              label: "Blog",
              href: "https://blog.polygon.technology/"
            },
            {
              label: "Careers",
              href: "https://polygon.technology/careers"
            },
            {
              label: "Matic Token",
              href: "https://polygon.technology/matic-token"
            },
            {
              label: "Contact Us",
              href: "https://polygon.technology/contact-us/"
            },
          ]
        },
        {
          title: "Solutions",
          items: [
            {
              label: "Polygon PoS",
              href: "https://polygon.technology/polygon-pos"
            },
            {
              label: "Polygon zkEVM",
              href: "https://polygon.technology/polygon-zkevm"
            },
            {
              label: "Polygon Supernets",
              href: "https://polygon.technology/polygon-supernets"
            },
            {
              label: "Polygon Miden",
              href: "https://polygon.technology/polygon-miden"
            },
            {
              label: "Polygon ID",
              href: "https://polygon.technology/polygon-id"
            },
          ]
        },
        {
          title: "Use Polygon",
          items: [
            {
              href: 'https://wallet.polygon.technology',
              label: 'Polygon Wallet Suite',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://staking.polygon.technology/',
              label: 'Staking',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://polygonscan.com/',
              label: 'Polygon Scan',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://mapper.polygon.technology/',
              label: 'Token Mapper',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://polygon.technology/ecosystem',
              label: 'Ecosystem dApps',
              target: '_blank',
              rel: null,
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              href: 'https://support.polygon.technology/support/home',
              label: 'Polygon Support',
            },
            {
              label: "Advocate Program",
              href: "https://polygon.technology/advocate-program/"
            },
            {
              label: "Polygon Funds",
              href: "https://polygon.technology/funds/"
            },
            {
              label: "Bug Bounty",
              href: "https://immunefi.com/bounty/polygon/"
            },
            {
              href: 'https://www.dappstorekit.io/',
              label: 'Build your own dApp',
            },
          ]
        },
        {
          title: "Community",
          items: [
            {
              href: 'https://twitter.com/0xPolygonLabs',
              label: 'Twitter',
            },
            {
              href: 'https://discord.com/invite/0xPolygon',
              label: 'Discord',
            },
            {
              href: 'https://forum.polygon.technology/',
              label: 'Forum',
            },
            {
              href: 'https://www.reddit.com/r/0xPolygon/',
              label: 'Reddit',
            },
            {
              href: 'https://t.me/polygonofficial',
              label: 'Telegram',
            },
          ]
        },
        {
          title: "Legal",
          items: [
              {
                href: 'https://polygon.technology/terms-of-use',
                label: 'Terms of Use',
              },
              {
                label: "Privacy Policy",
                href: "https://polygon.technology/privacy-policy"
              },
              {
                label: "Cookie Policy",
                href: "https://polygon.technology/cookie-policy"
              },
          ]
        },
      ],
    },
    image: 'img/thumbnail.png',
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
      defaultLanguage: "javascript",
      additionalLanguages: ['solidity']
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: "Polygon logo",
        src: "img/polygon-id.svg",
        srcDark: "img/polygon-id.svg",
        href: 'https://id.polygon.technology',
        target: "_self",
       },
      items: [
        {
          position: 'left',
          label: 'Build',
          items: [
            {
              href: '/docs/issuer/issuer-node-ui',
              label: 'Issuer API+UI',
              rel: null,
            },
            {
              href: 'https://0xpolygonid.github.io/tutorials/verifier/verifier-overview/',
              label: 'Verifier SDK',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://0xpolygonid.github.io/tutorials/wallet/wallet-overview/',
              label: 'Wallet SDK',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://0xpolygonid.github.io/tutorials/js-sdk/js-sdk-overview/',
              label: 'JS-SDK',
              target: '_blank',
              rel: null,
            }
          ]
        },
        {
          position: 'left',
          label: 'Tools',
          items: [
            {
              href: 'https://schema-builder-dev.polygonid.me/',
              label: 'Schema Builder',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://schema-builder-dev.polygonid.me/query-builder',
              label: 'Query builder',
              target: '_blank',
              rel: null,
            },
            {
              href: '/fakeurl',
              label: 'JWZ (coming soon)',
              target: '_blank',
              className: "disabled",
            },
          ]
        },
        {
          position: 'left',
          label: 'Learn',
          items: [
            {
              href: 'https://www.youtube.com/watch?v=6octwuwi4Gs&list=PLslsfan1R_z2PW_cRkBumQiUJs4tPc455&index=1',
              label: 'Fundamentals',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://www.youtube.com/watch?v=V7xggL4msB4&list=PLslsfan1R_z2PW_cRkBumQiUJs4tPc455&index=5',
              label: 'Architecture',
              target: '_blank',
              rel: null,
            },
            {
              href: '/fakeurl',
              label: 'Inside Polygon ID (coming soon)',
              target: '_blank',
              className: "disabled",
            },
          ]

        },
        {
          position: 'left',
          label: 'Releases',
          href: 'https://0xpolygonid.github.io/tutorials/',
          target: '_blank',
        },
        {
          position: 'left',
          label: 'Support',
          href: 'https://support.polygon.technology/support/solutions/82000473421',
          target: '_blank',
        },
        {
          position: 'left',
          label: 'Protocol (Iden3)',
          href: 'https://docs.iden3.io/',
          target: '_blank',
        },
        {
          href: "https://github.com/0xPolygonID",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
        {
          href: "https://twitter.com/0xPolygonID",
          position: "right",
          className: "header-twitter-link",
        },
        {
          href: "https://discord.com/invite/0xPolygon",
          position: "right",
          className: "header-discord-link",
        },
      ],
    },
  },
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: '/docs',
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/maticnetwork/id-docs/tree/main/",
          path: "docs",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [math],
          rehypePlugins: [[katex, {strict: false, throwOnError: true,globalGroup: true}]],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          // Need to create new tags for zkEVM docs
           trackingID: 'GTM-5TKTB44',
           anonymizeIP: true,
        },
      },
    ],
  ],
};
