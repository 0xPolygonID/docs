export const contentData = {
  headText:
    '<span class="white-text">Integrate</span> Self-Sovereign Identity Solution <span class="white-text">with Zero Knowledge Proofs!</span>',
  headButtons: [
    {
      title: "Build",
      link: "docs/introduction",
      target: "",
    },
    {
      title: "Quick start guide",
      link: "docs/quick-start-demo",
      target: "",
      type: "secondary",
    },
  ],
  headVideoLink:
    "https://www.youtube.com/embed/i3exuUa65sE?autoplay=1&controls=0&cc_load_policy=0&showinfo=0&rel=0&modestbranding=1",
  linksCard: [
    {
      iconSrc: "/images/verify-credential.png",
      title: "Verify credentials",
      cardLink: "/docs/verifier/verifier-overview",
      blockInfo: [
        "Seamless onboarding,",
        "User authentication,",
        "Gated access control,",
        "Passwordless login,",
        "Reveal selective data,",
        "Off-chain and on-chain verification.",
      ],
      tutorialsInfo: [
        {
          title: "Verify data off-chain with Verifier SDK",
          link: "/docs/category/off-chain-verification",
        },
        {
          title: "Verify data on-chain with Verifier SDK",
          link: "/docs/verifier/on-chain-verification/overview",
        },
        {
          title: "Build specific queries",
          link: "/docs/verifier/query-builder",
        },
        {
          title: "Set verification conditions",
          link: "/docs/verifier/verification-library/zk-query-language",
        },
      ],
    },
    {
      iconSrc: "/images/issue-credentials.png",
      title: "Issue credentials",
      cardLink: "/docs/issuer/issuer-overview",
      blockInfo: [
        "Data portability,",
        "KYC,",
        "Reputation,",
        "Identification,",
        "Age,",
        "Sybil resistance,",
        "Proof of personhood.",
      ],
      tutorialsInfo: [
        {
          title: "Quick start",
          link: "/docs/issuer/setup-issuer-core",
        },
        {
          title: "Issue credentials via Issuer Node API & UI",
          link: "/docs/issuer/setup-issuer-ui",
        },
        {
          title: "Create identity wallets, browser extensions and nodes via JS SDK",
          link: "/docs/js-sdk/js-sdk-overview",
        },
        {
          title: "Create or reuse credential schemas",
          link: "/docs/issuer/schema-builder",
        },
        {
          title: "Link credentials to different blockchains",
          link: "/docs/contracts/credential-linkage",
        },
      ],
    },
    {
      iconSrc: "/images/identity-wallet.png",
      title: "Identity wallet",
      cardLink: "/docs/wallet/wallet-overview",
      blockInfo: [
        "User controls their data,",
        "Data management,",
        "Wallet integration,",
        "Public and private profiles,",
        "Switch networks,",
        "Identity recovery,",
        "Reference application.",
      ],
      tutorialsInfo: [
        {
          title: "Build an app with Flutter SDK",
          link: "/docs/wallet/wallet-sdk/flutter-sdk/build-app-with-flutter-sdk",
        },
        {
          title: "Build an app with Android SDK",
          link: "/docs/wallet/wallet-sdk/android-sdk/install-android-sdk",
        },
        {
          title: "Wallet APIs",
          link: "/docs/category/wallet-apis",
        },
        {
          title: "Polygon ID Wallet app: SDK reference implementation",
          link: "/docs/wallet/wallet-sdk/polygonid-app",
        },
        {
          title: "Web wallet via JS SDK",
          link: "/docs/js-sdk/js-sdk-browser-wallet-demo",
        },
      ],
    },
  ],
  eventCreation: {
    head: {
      title: "Hackathon creations",
      description:
        "Explore the creations of hackers who made incredible things using Polygon ID stack.",
    },
    events: [
      {
        name: "LocalPro",
        info: "ETH Lisbon",
        description: "Niccolò Prada",
        link: "https://ethglobal.com/showcase/localpro-xckra",
      },
      {
        name: "Decentral Coach",
        info: "ETH San Francisco",
        description: "Jeffrey Wang",
        link: "https://ethglobal.com/showcase/decentral-couch-g1xtk",
      },
      {
        name: "Contingent",
        info: "ETH San Francisco",
        description: "Campbellb",
        link: "https://ethglobal.com/showcase/contingent-vwx0b",
      },
    ],
  },
  noEvents: {
    iconSrc: "/images/no-events.png",
    text: "No events planned in the near-term. Please check at a later time for events and hackatons.",
  },
  eventHackathon: {
    type: "dateEvent",
    head: {
      title: "Events & Hackathons",
      description: "Events Polygon ID is joining or related to.",
    },
    events: [
      {
        name: "EthGlobal Brussels",
        info: "June 12 - 14, 2024",
        description: "Brussels, Belgium",
        link: "https://ethglobal.com/events/brussels",
      },
      {
        name: "EthGlobal Bangkok",
        info: "November 15 - 17, 2024",
        description: "Bangkok, Thailand",
        link: "https://ethglobal.com/events/bangkok",
      },
      {
        name: "EthIndia",
        info: "TBD, 2024",
        description: "TBD",
        link: "https://ethindia.co/",
      },
    ],
  },
  learnSection: {
    head: {
      title: "Learn about Polygon ID",
      description:
        "Gain the knowledge and confidence to leverage the\n full potential of Polygon ID.",
    },
    videos: [
      {
        title: "Fundamentals",
        info: "Watch on Youtube",
        link: "https://www.youtube.com/playlist?list=PLRD3rkREa7mLLJ6jfUTygXV1iK_AvsDdw",
      },
      {
        title: "Architecture",
        info: "Watch on Youtube",
        link: "https://www.youtube.com/playlist?list=PLRD3rkREa7mLjDB1qL4KkCtob6kPJIvhS",
      },
      {
        title: "Inside Polygon ID",
        info: "Watch on Youtube",
        link: "https://www.youtube.com/playlist?list=PLRD3rkREa7mIgx_RHZdin74vEb2A1Evek",
        //                coming: '(coming soon)'
      },
    ],
  },
  ecosystem: {
    head: {
      title: "Success stories & Ecosystem",
      description:
        "Watch the cases studies of successful Polygon ID integrations and explore its vast ecosystem.",
      link: "https://marketplace.polygonid.me/ecosystem",
      linkText: "Explore ecosystem",
    },
    tabs: [
      {
        name: "WallID",
        contentText:
          "First ever browser wallet with zero knowledge protocol that allows users to verify credentials in their web browser.",
        contentListTitle: "Products used:",
        contentList: ["JS SDK"],
        link: "https://www.youtube.com/embed/I6fqJfH8dyk?si=mR5GKg5iDwfWADf",
      },
      {
        name: "Synaps",
        contentText:
          "Synaps provides a Proof of Life solution enabling individuals to prove their humanity when interacting with dApps and protocols.",
        contentListTitle: "Products used:",
        contentList: ["Issuer Node"],
        link: "https://www.youtube.com/embed/ZK0fXk2X_mE?si=PklySL1YTrXxVMhe",
      },
      {
        name: "Gatekeeper",
        contentText:
          "GateKeeper is a no-code credential issuance and verification platform that enables easy access control management via an intuitive dashboard. GateKeeper aggregates multiple identity data points such as Verifiable Credentials, NFT's, on-chain data and more to simplify and customize the different requirements for gating content.",
        contentListTitle: "Products used:",
        contentList: ["JS SDK"],
        link: "https://www.youtube.com/embed/LRs62z8qCnc?si=MR4njeNJCPyM-mGE",
      },
    ],
  },
  faq: {
    head: {
      title: "FAQ",
      description: "Can’t find an answer? Contact our always helpful support.",
      link: "https://support.polygon.technology/support/solutions/82000473421",
      linkText: "Contact support",
    },
    faqList: [
      {
        title: "What is Polygon ID?",
        content:
          "Polygon ID is a set of tools for developers that can be used to facilitate trusted and secure relationships between apps and users. Developers can use Polygon ID to enable the exchange of verifiable credentials secured by cryptography and the blockchain. Polygon ID is designed for developers with a strong focus on privacy, decentralization and user data self-sovereignty.",
      },
      {
        title: "How to set up Polygon ID and start using it?",
        content:
          "We created a comprehensive quick start quide on devs.polygonid.com/docs/quick-start-demo/ where you can understand each of the roles in Polygon ID in practice.",
      },
      {
        title: "What main aspects make Polygon ID unique?",
        content:
          "<ul><li>Private by default solution, as a result of the ZK native protocol used.</li><li>There is no direct communication between issuer and verifiers.<li>Offering a scalable and self-sovereign digital identity solution.</li><li>Allows on-chain and off-chain verification, facilitating the deployment of both Web2 and Web3 use cases.</li><li>Supports bulk issuance of claims with a highly efficient on-chain storage at a minimum transactional cost.</li><li><ul>It enables a wide range of use cases to settle the foundation for a transformative impact with:</li><li>protection against Sybil attacks while preserving privacy. This is achieved using nullifier techniques that assure that an identity (human being) can undertake an action only once. This becomes a key feature for specific use cases such as voting processes.<li>non-reusable proofs: guaranteeing the verifier that the proof presented by the user was not a copy of a proof generated by another identity, and allowing the verifier to check its validity.</li><li>protection against digital footprint tracking.</ul></ul>",
      },
      {
        title: "How do I use the Polygon ID wallet?",
        content:
          "To use the Polygon ID wallet, you will need to download the app and create a wallet account. You can then use the wallet to manage your digital identity, claims, and other assets.",
      },
      {
        title: "How is the zero-knowledge technology used in Polygon ID?",
        content:
          "The main two uses of zero-knowledge technology used in Polygon ID are:<ol><li>Preserve privacy: the user (Identity Holder) can send a proof of any information inside a credential to the Verifier (dApp) without revealing the information inside the credential. In the Selective Disclosure mode, the user can also select which information inside the credential he wants to share (without having to select the whole credential). While sharing this information, he also sends a proof about this information so the Verifier can check its correctness.</li><li>Verification of computation:  zero-knowledge proofs can be used to prove that a computation has been performed correctly without the Verifier having to recompute it. For example, within Polygon ID, it is used to prove that an identity is performing a state transition correctly.</li></ol>",
      },
      {
        title: "How is blockchain used in Polygon ID?",
        content:
          "There are two main uses of the blockchain for Polygon ID: <ol><li>Issuing a Merkle Tree Proof (MTP) signature to a credential: the Issuer can issue a credential with an MTP which holds information about the Issuer state tree published on-chain.</li><li>On-chain verification: The Verifier can use an on-chain smart contract to verify credentials. In the future, additional uses of blockchain will be built for Polygon ID, such as to enable revocation of credentials, where the Issuer publishes the revocation tree on-chain so the user (Identity Holder) can include the revocation (or non-revocation) information inside the zero-knowledge proof they send to the Verifier.</li></ol>",
      },
      {
        title: "Is there any Polygon ID wallet browser extension link like MetaMask?",
        content:
          "There is a mobile application available for Polygon ID, but no public browser extension. However, we do have a sample browser wallet extension built on our JS SDK. Read more on https://devs.polygonid.com/docs/js-sdk/js-sdk-browser-wallet-demo/. You can also check out, for example, the browser extension from Wallid.io which supports Polygon ID, https://wallid.io/.",
      },
      {
        title: "How to get Test MATIC to test Polygon ID?",
        content:
          "Go to https://faucet.polygon.technology/, select 'AMOY', add your wallet address, and press 'Submit'.",
      },
    ],
  },
  stayUpToDate: {
    title: "STAY UP TO DATE",
    link: "https://polygondeveloperstudio.substack.com",
    linkText: "subscribe to our newsletter",
  },
};
