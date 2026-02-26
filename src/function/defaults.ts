import { Architecture } from 'aws-cdk-lib/aws-lambda';

export const functionDefaults = {
    path: process.cwd(),
    phpVersion: '8.4',
    memorySize: 1024,
    architecture: Architecture.X86_64,
    excludedPhpPaths: ['.git', '.idea', 'cdk.out', 'node_modules', '.bref', '.serverless', 'tests'],
} as const;
