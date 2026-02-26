import { Architecture, ILayerVersion, LayerVersion } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { layerArn } from '@bref.sh/layers';

export function phpLayer(
    scope: Construct,
    id: string,
    region: string,
    phpVersion: string,
    architecture: Architecture
): ILayerVersion {
    const platform = architecture === Architecture.X86_64 ? 'x86' : 'arm';

    return LayerVersion.fromLayerVersionArn(
        scope,
        id,
        layerArn(region, phpVersion, platform)
    );
}
