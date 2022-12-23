import { Function, FunctionProps, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Duration, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { functionDefaults, vpcDefaults } from './defaults';
import { functionLayer } from '../layers';
import { packagePhpCode } from '../package';
import { IVpc } from 'aws-cdk-lib/aws-ec2';
import { VpcForServerlessApp } from '../vpc/VpcForServerlessApp';

export type PhpFunctionProps = Partial<FunctionProps> & {
    phpVersion?: '8.0' | '8.1' | '8.2';
    handler: string;
    vpc?: IVpc | VpcForServerlessApp;
};

export class PhpFunction extends Function {
    constructor(scope: Construct, id: string, props: PhpFunctionProps) {
        const defaults = {
            runtime: Runtime.PROVIDED_AL2,
            code: props.code ?? packagePhpCode(),
            timeout: Duration.seconds(6),
            memorySize: functionDefaults.memorySize,
        };

        // Put the layers aside for now, we set them after `super()`
        const layers = props.layers ?? [];

        super(scope, id, {
            ...defaults,
            ...vpcDefaults(props.vpc),
            // Provided props override defaults
            ...props,
            // But we force the layers to an empty array because we define them below
            layers: [],
        });

        // Add layer afterwards so that we can use `this` to resolve the region
        const region = Stack.of(this).region;
        if (region.startsWith('${')) {
            throw new Error(
                'Cannot detect the AWS region. Bref needs the AWS region to know which AWS layer to use. In order to use Bref layers, you must explicitly set the region for the stack. See https://gist.github.com/mnapoli/7c7eab49444637426ce66a24df715a63'
            );
        }
        const phpVersion = props.phpVersion ?? functionDefaults.phpVersion;
        this.addLayers(
            // Add the function layer first so that other layers can override it
            functionLayer(scope, region, phpVersion, functionDefaults.platform),
            ...layers
        );
    }
}
