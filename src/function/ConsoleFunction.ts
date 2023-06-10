import {Duration, Stack} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {consoleLayer, functionLayer} from '../layers';
import {Function, FunctionProps, Runtime} from "aws-cdk-lib/aws-lambda";
import {IVpc} from "aws-cdk-lib/aws-ec2";
import {VpcForServerlessApp} from "../vpc/VpcForServerlessApp";
import {functionDefaults, vpcDefaults} from "./defaults";
import {packagePhpCode} from "../package";

export type PhpConsoleFunctionProps = Partial<FunctionProps> & {
    phpVersion?: '8.0' | '8.1' | '8.2';
    handler: string;
    vpc?: IVpc | VpcForServerlessApp;
};

export class ConsoleFunction extends Function {
    constructor(scope: Construct, id: string, props: PhpConsoleFunctionProps) {
        const defaults = {
            runtime: Runtime.PROVIDED_AL2,
            code: props.code ?? packagePhpCode(),
            timeout: Duration.seconds(6),
            memorySize: functionDefaults.memorySize,
        };

        const layers = props.layers ?? [];

        super(scope, id, {
            ...props,
            ...vpcDefaults(props.vpc),
            layers: [],
            ...defaults,
        });

        this.addLayers(
            ...layers,
            consoleLayer(
                this,
                Stack.of(scope).region
            ),
            // Adds the function layer last so that others(in this case console depends on it) can override it
            functionLayer(
                this,
                Stack.of(scope).region,
                props.phpVersion ?? functionDefaults.phpVersion,
                props.architecture ?? functionDefaults.architecture)
        );
    }
}
