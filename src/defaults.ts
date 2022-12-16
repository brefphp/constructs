export const functionDefaults = {
    path: process.cwd(),
    phpVersion: '8.1',
    memorySize: 1024,
    platform: 'x86',
    excludedPhpPaths: ['.git', 'cdk.out', 'node_modules', '.bref', 'tests'],
} as const;
