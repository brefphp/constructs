export const functionDefaults = {
    path: process.cwd(),
    phpVersion: '8.1',
    memorySize: 1024,
    platform: 'x86',
    excludedPhpPaths: ['.git', '.idea', 'cdk.out', 'node_modules', '.bref', '.serverless', 'tests'],
} as const;
