export type menuDataType = {
    name: string;
    isOpen?: boolean;
    content: string | menuDataType[];
};

export const menuData: menuDataType[] = [
    {
        name: 'Home',
        content: '/',
    },
    {
        name: 'System',
        isOpen: true,
        content: [
            {
                name: 'Joke',
                content: '/system/joke',
            },
            {
                name: 'Peak',
                content: '/system/peak',
            },
        ],
    },
    {
        name: 'Function',
        isOpen: true,
        content: [
            {
                name: 'Algorithm',
                isOpen: false,
                content: [
                    {
                        name: 'Get SHA',
                        content: '/function/algorithm/getSecureHashAlgorithm',
                    },
                ],
            },
            {
                name: 'Creation',
                isOpen: false,
                content: [
                    {
                        name: 'Calc BPM',
                        content: '/function/creation/calcBeatsPerMinute',
                    },
                ],
            },
        ],
    },
    {
        name: 'Work',
        isOpen: true,
        content: [
            {
                name: 'Novel',
                isOpen: false,
                content: [
                    {
                        name: 'Nest Minus Zero',
                        isOpen: true,
                        content: [
                            {
                                name: 'Summary',
                                content: '/work/novel/post-NestMinusZero/summary',
                            },
                            {
                                name: '00 → 0F',
                                isOpen: false,
                                content: [
                                    {
                                        name: '00 肇の世界',
                                        content: '/work/novel/post-NestMinusZero/00',
                                    },
                                    {
                                        name: '01 海の世界',
                                        content: '/work/novel/post-NestMinusZero/01',
                                    },
                                    {
                                        name: '02 森の世界',
                                        content: '/work/novel/post-NestMinusZero/02',
                                    },
                                    {
                                        name: '03 沌の世界',
                                        content: '/work/novel/post-NestMinusZero/03',
                                    },
                                    {
                                        name: '04 梵の世界',
                                        content: '/work/novel/post-NestMinusZero/04',
                                    },
                                    {
                                        name: '05 秋の世界',
                                        content: '/work/novel/post-NestMinusZero/05',
                                    },
                                    {
                                        name: '06 鉄の世界',
                                        content: '/work/novel/post-NestMinusZero/06',
                                    },
                                    {
                                        name: '07 白の世界',
                                        content: '/work/novel/post-NestMinusZero/07',
                                    },
                                    {
                                        name: '08 戦の世界',
                                        content: '/work/novel/post-NestMinusZero/08',
                                    },
                                    {
                                        name: '09 舎の世界',
                                        content: '/work/novel/post-NestMinusZero/09',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Illustration',
                isOpen: false,
                content: [
                    {
                        name: 'Summer with an Unknown Girl',
                        content: '/work/illustration/post-SummerWithAnUnknownGirl',
                    },
                    {
                        name: 'Oh My Chars!',
                        content: '/work/illustration/post-OhMyChars',
                    },
                ],
            },
            {
                name: 'Video',
                isOpen: false,
                content: [
                    {
                        name: 'Tripolid',
                        content: '/work/video/post-Tripolid',
                    },
                ],
            },
            {
                name: 'Music',
                isOpen: false,
                content: [
                    {
                        name: 'Silence in the world of 1MHz',
                        content: '/work/music/post-SilenceInTheWorldOf1MHz_PleaseDeleteThisWord',
                    },
                ],
            },
            {
                name: 'Software',
                isOpen: false,
                content: [
                    {
                        name: 'E=CS',
                        content: '/work/software/post-E_CS',
                    },
                ],
            },
        ],
    },
    {
        name: 'Note',
        isOpen: true,
        content: [
            {
                name: 'Bash',
                isOpen: false,
                content: [
                    {
                        name: 'Utility',
                        content: '/note/bash/post-Utility',
                    },
                    {
                        name: 'Set Automatic Execution Bash Script',
                        content: '/note/bash/post-SetAutomaticExecutionBashScript',
                    },
                    {
                        name: 'Set My Proxy',
                        content: '/note/bash/post-SetMyProxy',
                    },
                    {
                        name: 'Generate Noise',
                        content: '/note/bash/post-GenerateNoise',
                    },
                    {
                        name: 'Extract Zip Files',
                        content: '/note/bash/post-ExtractZipFiles',
                    },
                    {
                        name: 'Backup Volume',
                        content: '/note/bash/post-BackupVolume',
                    },
                    {
                        name: 'Clean Volume',
                        content: '/note/bash/post-CleanVolume',
                    },
                    {
                        name: 'Play Minecraft Using GPU',
                        content: '/note/bash/post-PlayMinecraftUsingGPU',
                    },
                    {
                        name: 'Run AquesTalk Pi on x64',
                        content: '/note/bash/post-RunAquesTalkPiOnX64',
                    },
                ],
            },
            {
                name: 'Git',
                isOpen: false,
                content: [
                    {
                        name: 'Setup Profile',
                        content: '/note/git/post-SetupProfile',
                    },
                    {
                        name: 'Setup Proxy Environment',
                        content: '/note/git/post-SetupProxyEnvironment',
                    },
                    {
                        name: 'Overwrite Commit',
                        content: '/note/git/post-OverwriteCommit',
                    },
                    {
                        name: 'Copy Repository',
                        content: '/note/git/post-CopyRepository',
                    },
                ],
            },
            {
                name: 'Deno / Fresh',
                isOpen: false,
                content: [
                    {
                        name: 'Get Client',
                        content: '/note/deno_fresh/post-GetClient',
                    },
                    {
                        name: 'Convert Markdown to JSX Element',
                        content: '/note/deno_fresh/post-ConvertMarkdownToJsxElement',
                    },
                ],
            },
            {
                name: 'Blender',
                isOpen: false,
                content: [
                    {
                        name: 'How to Paste the Correct Material',
                        content: '/note/blender/post-HowToPasteTheCorrectMaterial',
                    },
                ],
            },
            {
                name: 'Other',
                isOpen: false,
                content: [
                    {
                        name: 'How to Draw My Style',
                        content: '/note/other/post-HowToDrawMyStyle',
                    },
                    {
                        name: 'Decoding the Video Posted by ngethoma (Failed)',
                        content: '/note/other/post-DecodingTheVideoPostedByNgethoma',
                    },
                ],
            },
        ],
    },
    {
        name: 'Profile',
        content: '/profile',
    },
    {
        name: 'Terms of Use',
        content: '/terms',
    },
];

export const menuDataDraft: menuDataType[] = [
    {
        name: 'Work',
        isOpen: true,
        content: [
            {
                name: 'Illustration',
                isOpen: false,
                content: [
                    {
                        name: 'Touhou Geometry',
                        isOpen: true,
                        content: [
                            {
                                name: 'Summary',
                                content: '/work/illustration/post-TouhouGeometry/summary',
                            },
                            {
                                name: '0001 → 0010',
                                isOpen: false,
                                content: [
                                    {
                                        name: '0001 Hakurei Reimu',
                                        content: '/work/illustration/post-TouhouGeometry/0001',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export const menuDataSample: menuDataType[] = [
    {
        name: 'Home',
        content: '/',
    },
    {
        name: 'Page 1',
        content: '',
    },
    {
        name: 'Page 2',
        content: '',
    },
    {
        name: 'Page 3',
        content: '',
    },
    {
        name: 'Directory 1',
        isOpen: true,
        content: [
            {
                name: 'Page 1',
                content: '',
            },
            {
                name: 'Page 2',
                content: '',
            },
            {
                name: 'Page 3',
                content: '',
            },
        ],
    },
    {
        name: 'Directory 2',
        isOpen: false,
        content: [
            {
                name: 'Page 1',
                content: '',
            },
            {
                name: 'Page 2',
                content: '',
            },
            {
                name: 'Page 3',
                content: '',
            },
            {
                name: 'Directory 2-1',
                isOpen: false,
                content: [
                    {
                        name: 'Page 1',
                        content: '',
                    },
                    {
                        name: 'Page 2',
                        content: '',
                    },
                    {
                        name: 'Page 3',
                        content: '',
                    },
                ],
            },
            {
                name: 'Directory 2-2',
                isOpen: false,
                content: [
                    {
                        name: 'Page 1',
                        content: '',
                    },
                    {
                        name: 'Page 2',
                        content: '',
                    },
                    {
                        name: 'Page 3',
                        content: '',
                    },
                ],
            },
            {
                name: 'Directory 2-3',
                isOpen: false,
                content: [
                    {
                        name: 'Page 1',
                        content: '',
                    },
                    {
                        name: 'Page 2',
                        content: '',
                    },
                    {
                        name: 'Page 3',
                        content: '',
                    },
                ],
            },
        ],
    },
    {
        name: 'Directory 3',
        isOpen: false,
        content: [
            {
                name: 'Page 1',
                content: '',
            },
            {
                name: 'Page 2',
                content: '',
            },
            {
                name: 'Page 3',
                content: '',
            },
            {
                name: 'Directory 3-1',
                isOpen: false,
                content: [
                    {
                        name: 'Page 1',
                        content: '',
                    },
                    {
                        name: 'Page 2',
                        content: '',
                    },
                    {
                        name: 'Page 3',
                        content: '',
                    },
                    {
                        name: 'Directory 3-1-1',
                        isOpen: false,
                        content: [
                            {
                                name: 'Page 1',
                                content: '',
                            },
                            {
                                name: 'Page 2',
                                content: '',
                            },
                            {
                                name: 'Page 3',
                                content: '',
                            },
                        ],
                    },
                    {
                        name: 'Directory 3-1-2',
                        isOpen: false,
                        content: [
                            {
                                name: 'Page 1',
                                content: '',
                            },
                            {
                                name: 'Page 2',
                                content: '',
                            },
                            {
                                name: 'Page 3',
                                content: '',
                            },
                        ],
                    },
                    {
                        name: 'Directory 3-1-3',
                        isOpen: false,
                        content: [
                            {
                                name: 'Page 1',
                                content: '',
                            },
                            {
                                name: 'Page 2',
                                content: '',
                            },
                            {
                                name: 'Page 3',
                                content: '',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Directory 3-2',
                isOpen: false,
                content: [
                    {
                        name: 'Page 1',
                        content: '',
                    },
                    {
                        name: 'Page 2',
                        content: '',
                    },
                    {
                        name: 'Page 3',
                        content: '',
                    },
                    {
                        name: 'Directory 3-2-1',
                        isOpen: false,
                        content: [
                            {
                                name: 'Page 1',
                                content: '',
                            },
                            {
                                name: 'Page 2',
                                content: '',
                            },
                            {
                                name: 'Page 3',
                                content: '',
                            },
                        ],
                    },
                    {
                        name: 'Directory 3-2-2',
                        isOpen: false,
                        content: [
                            {
                                name: 'Page 1',
                                content: '',
                            },
                            {
                                name: 'Page 2',
                                content: '',
                            },
                            {
                                name: 'Page 3',
                                content: '',
                            },
                        ],
                    },
                    {
                        name: 'Directory 3-2-3',
                        isOpen: false,
                        content: [
                            {
                                name: 'Page 1',
                                content: '',
                            },
                            {
                                name: 'Page 2',
                                content: '',
                            },
                            {
                                name: 'Page 3',
                                content: '',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Directory 3-3',
                isOpen: false,
                content: [
                    {
                        name: 'Page 1',
                        content: '',
                    },
                    {
                        name: 'Page 2',
                        content: '',
                    },
                    {
                        name: 'Page 3',
                        content: '',
                    },
                    {
                        name: 'Directory 3-3-1',
                        isOpen: false,
                        content: [
                            {
                                name: 'Page 1',
                                content: '',
                            },
                            {
                                name: 'Page 2',
                                content: '',
                            },
                            {
                                name: 'Page 3',
                                content: '',
                            },
                        ],
                    },
                    {
                        name: 'Directory 3-3-2',
                        isOpen: false,
                        content: [
                            {
                                name: 'Page 1',
                                content: '',
                            },
                            {
                                name: 'Page 2',
                                content: '',
                            },
                            {
                                name: 'Page 3',
                                content: '',
                            },
                        ],
                    },
                    {
                        name: 'Directory 3-3-3',
                        isOpen: false,
                        content: [
                            {
                                name: 'Page 1',
                                content: '',
                            },
                            {
                                name: 'Page 2',
                                content: '',
                            },
                            {
                                name: 'Page 3',
                                content: '',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
