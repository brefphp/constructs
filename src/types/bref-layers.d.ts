declare module '@bref.sh/layers' {
    export function layerArn(region: string, phpVersion: string, platform: 'x86' | 'arm'): string;
}
