export const contentData = {
    headText: '<span class="white-text">Integrate</span> Self-Sovereign Identity Solution <span class="white-text">with Zero Knowledge Proofs!</span>',
    headButtons: [
        {
            title: 'Build',
            link: 'docs/introduction',
        },
        {
            title: 'Quick start guide',
            link: 'docs/quick-start-demo',
            type: 'secondary'
        }
    ],
    headVideoLink: 'https://www.youtube.com/embed/i3exuUa65sE?autoplay=1&controls=0&cc_load_policy=0&showinfo=0&rel=0&modestbranding=1',
    linksCard: [
        {
            iconSrc:'/images/verify-credential.png',
            title: 'Verify credentials',
            cardLink: 'https://0xpolygonid.github.io/tutorials/verifier/verifier-overview/',
            blockInfo: [
                'Seamless onboarding,',
                'User authentication,',
                'Gated access control,',
                'Passwordless login,',
                'Reveal selective data,',
                'Off-chain and on-chain verification.',
            ],
            tutorialsInfo: [
                {
                    title: 'Quick start',
                    link: 'https://0xpolygonid.github.io/tutorials/verifier/demo-verifier/'
                },
                {
                    title: 'Verify data off-chain with Verifier SDK',
                    link: 'https://0xpolygonid.github.io/tutorials/verifier/verification-library/verifier-library-intro/'
                },
                {
                    title: 'Verify data on-chain with Verifier SDK',
                    link: 'https://0xpolygonid.github.io/tutorials/verifier/on-chain-verification/overview/'
                },
                {
                    title: 'Integrate to a smart contract',
                    link: 'https://0xpolygonid.github.io/tutorials/contracts/overview/'
                },
                {
                    title: 'Set verification conditions',
                    link: 'https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/'
                }
            ]
        },
        {
            iconSrc:'/images/issue-credentials.png',
            title: 'Issue credentials',
            cardLink: 'https://0xpolygonid.github.io/tutorials/issuer/issuer-overview/',
            blockInfo: [
                'Data portability,',
                'KYC,',
                'Reputation,',
                'Identification,',
                'Age,',
                'Sybil resistance,',
                'Proof of personhood.',
            ],
            tutorialsInfo: [
                {
                    title: 'Quick start',
                    link: 'https://0xpolygonid.github.io/tutorials/issuer/setup-issuer-core/'
                },
                {
                    title: 'Issue credentials via Issuer Node API & UI',
                    link: 'https://0xpolygonid.github.io/tutorials/issuer/issuer-node-ui/'
                },
                {
                    title: 'Create identity wallets, browser extensions and nodes via JS SDK',
                    link: 'https://0xpolygonid.github.io/tutorials/js-sdk/js-sdk-overview/'
                },
                {
                    title: 'Create or reuse credential schemas',
                    link: 'https://0xpolygonid.github.io/tutorials/issuer/schema-builder/'
                },
                {
                    title: 'Link credentials to different blockchains',
                    link: 'https://0xpolygonid.github.io/tutorials/contracts/credential-linkage/#credential-linkage-to-different-blockchains'
                }
            ]
        },
        {
            iconSrc:'/images/identity-wallet.png',
            title: 'Identity wallet',
            cardLink: 'https://0xpolygonid.github.io/tutorials/wallet/wallet-overview/',
            blockInfo: [
                'User controls their data,',
                'Data management,',
                'Wallet integration,',
                'Public and private profiles,',
                'Switch networks,',
                'Identity recovery,',
                'Reference application.',
            ],
            tutorialsInfo: [
                {
                    title: 'Quick start',
                    link: 'https://0xpolygonid.github.io/tutorials/wallet/wallet-overview/'
                },
                {
                    title: 'Build app with Flutter SDK',
                    link: 'https://0xpolygonid.github.io/tutorials/wallet/wallet-sdk/flutter-sdk/flutter-sdk-overview/'
                },
                {
                    title: 'Build app with Android SDK',
                    link: 'https://0xpolygonid.github.io/tutorials/wallet/wallet-sdk/android-sdk/install-android-sdk/'
                },
                {
                    title: 'Polygon ID SDK and reference application',
                    link: 'https://0xpolygonid.github.io/tutorials/wallet/wallet-sdk/polygonid-sdk/polygonid-sdk-overview/'
                },
                {
                    title: 'Web wallet via JS SDK',
                    link: 'https://0xpolygonid.github.io/tutorials/js-sdk/js-sdk-browser-wallet-demo/#demo-for-js-sdk-browser-extension-wallet'
                }
            ]
        },
    ],
    eventCreation: {
        head: {
            title: 'Hackathon creations',
            description: 'Explore the creations of hackers who made incredible things using Polygon ID stack.',
        },
        events: [
            {
                name: 'LocalPro',
                info: 'ETH Lisbon',
                description: 'Niccolò Prada',
                link: 'https://ethglobal.com/showcase/localpro-xckra'
            },
            {
                name: 'Decentral Coach',
                info: 'ETH San Francisco',
                description: 'Jeffrey Wang',
                link: 'https://ethglobal.com/showcase/decentral-couch-g1xtk'
            },
            {
                name: 'Contingent',
                info: 'ETH San Francisco',
                description: 'Campbellb',
                link: 'https://ethglobal.com/showcase/contingent-vwx0b'
            }
        ]
    },
    noEvents: {
        iconSrc: '/images/no-events.png',
        text: 'No events planned in the near-term. Please check at a later time for events and hackatons.'
    },
    eventHackathon: {
        type: 'dateEvent',
        head: {
            title: 'Events & Hackathons',
            description: 'Events Polygon ID is joining or related to.',
        },
        events: [
            {
                name: 'EthCC 6',
                info: 'July 17-20, 2023',
                description: 'Paris, France',
                link: 'https://www.ethcc.io/'
            },
            {
                name: 'ETHGlobal Istanbul',
                info: 'November 17–19, 2023',
                description: 'Istanbul, Turkey',
                link: 'https://ethglobal.com/events/istanbul'
            },
            {
                name: 'ETHSingapore',
                info: 'December 17–19, 2023',
                description: 'Singapore',
                link: ''
            }
        ]
    },
    learnSection: {
        head: {
            title: 'Learn about Polygon ID',
            description: 'Ggain the knowledge and confidence to leverage the\n full potential of Polygon ID.',
            link: 'https://ecosystem.polygon.technology/PolygonID',
            linkText: 'Explore ecosystem',
        },
        videos: [
            {
                title: 'Fundamentals',
                info: 'Watch on Youtube',
                link: 'https://www.youtube.com/watch?v=6octwuwi4Gs&list=PLslsfan1R_z0Fq9olucMTEOeHunoBX58h'
            },
            {
                title: 'Architecture',
                info: 'Watch on Youtube',
                link: 'https://www.youtube.com/watch?v=V7xggL4msB4&list=PLslsfan1R_z3-COvNH6FhBJCDrWNGNdZL'
            },
            {
                title: 'Inside Polygon ID',
                info: 'Watch on Youtube (coming soon)',
                link: ''
            }
        ]
    },
    ecosystem: {
        head: {
            title: 'Success stories & Ecosystem',
            description: 'Watch the cases studies of successful Polygon ID integrations and explore its vast ecosystem.',
            link: 'https://ecosystem.polygon.technology/PolygonID',
            linkText: 'Explore ecosystem',
        },
        tabs: [
            {
                name: 'WallID',
                contentText: 'First ever browser wallet with zero knowledge protocol that allows users to verify credentials in their web browser. Products used:',
                contentListTitle: 'Products used:',
                contentList: [
                    'JS SDK'
                ],
                link: 'https://www.youtube.com/embed/3noHXFVdiKE'
            },
            {
                name: 'IDfy',
                contentText: 'IDfy builds technology solutions to help companies accurately identify people, run background checks, conduct KYC, mitigate lending risks, and onboard associates. IDfy issues credentials around Personhood, Uniqueness, KYC, KYB which can be consumed to build sybil resistance and regulatory compliant Web3 platforms.',
                contentListTitle: 'Products used:',
                contentList: [
                    'JS SDK'
                ],
                link: 'https://www.youtube.com/embed/Yz0UVs5B6Wk'
            },
            {
                name: 'Gatekeeper',
                contentText: 'GateKeeper is a no-code credential issuance and verification platform that enables easy access control management via an intuitive dashboard. GateKeeper aggregates multiple identity data points such as Verifiable Credentials, NFT\'s, on-chain data and more to simplify and customize the different requirements for gating content.',
                contentListTitle: 'Products used:',
                contentList: [
                    'JS SDK'
                ],
                link: 'https://www.youtube.com/embed/Mj5YivAiIWE'
            }
        ]
    },
    faq: {
        head: {
            title: 'FAQ',
            description: 'Can’t find an answer? Contact our always helpful support.',
            link: '/sup',
            linkText: 'Contact support',
        },
        faqList: [
            {
                title: 'How is zero-knowledge technology used in Polygon ID?',
                content: 'How is zero-knowledge <b>tech</b> used in Polygon ID? How is zero-knowledge technology used in Polygon ID?'
            }
        ]
    },
    stayUpToDate: {
        title: 'STAY UP TO DATE',
        link: 'https://polygondeveloperstudio.substack.com',
        linkText: 'subscribe to our newsletter'
    }
};