import { Architecture, ILayerVersion, LayerVersion } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { functionLayerArn, fpmLayerArn, consoleLayerArn } from '@bref.sh/layers';

export function functionLayer(
    scope: Construct,
    region: string,
    phpVersion: string,
    architecture: Architecture
): ILayerVersion {
    const platform = architecture === Architecture.X86_64 ? 'x86' : 'arm';

    return LayerVersion.fromLayerVersionArn(
        scope,
        'Bref001FunctionLayer',
        functionLayerArn(region, phpVersion, platform)
    );
}

export function fpmLayer(
    scope: Construct,
    region: string,
    phpVersion: string,
    architecture: Architecture
): ILayerVersion {
    const platform = architecture === Architecture.X86_64 ? 'x86' : 'arm';

    return LayerVersion.fromLayerVersionArn(
        scope,
        'Bref101FpmLayer',
        fpmLayerArn(region, phpVersion, platform)
    );
}

export function consoleLayer(scope: Construct, region: string): ILayerVersion {
    return LayerVersion.fromLayerVersionArn(scope, 'Bref201ConsoleLayer', consoleLayerArn(region));
}
