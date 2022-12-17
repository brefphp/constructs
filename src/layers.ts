import { ILayerVersion, LayerVersion } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { functionLayerArn, fpmLayerArn, consoleLayerArn } from '@bref.sh/layers';

export function functionLayer(
    scope: Construct,
    region: string,
    phpVersion: string,
    platform: 'x86' | 'arm'
): ILayerVersion {
    return LayerVersion.fromLayerVersionArn(
        scope,
        'BrefFunctionLayer',
        functionLayerArn(region, phpVersion, platform)
    );
}

export function fpmLayer(
    scope: Construct,
    region: string,
    phpVersion: string,
    platform: 'x86' | 'arm'
): ILayerVersion {
    return LayerVersion.fromLayerVersionArn(
        scope,
        'BrefFpmLayer',
        fpmLayerArn(region, phpVersion, platform)
    );
}

export function consoleLayer(scope: Construct, region: string): ILayerVersion {
    return LayerVersion.fromLayerVersionArn(scope, 'BrefConsoleLayer', consoleLayerArn(region));
}
