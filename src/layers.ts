import { ILayerVersion, LayerVersion } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { fpmLayerArn } from '@bref.sh/layers';

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
