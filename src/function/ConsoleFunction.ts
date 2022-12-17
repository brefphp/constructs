import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { consoleLayer } from '../layers';
import { PhpFunction, PhpFunctionProps } from './PhpFunction';

export class ConsoleFunction extends PhpFunction {
    constructor(scope: Construct, id: string, props: PhpFunctionProps) {
        const layers = props.layers ?? [];
        layers.unshift(consoleLayer(scope, Stack.of(scope).region));
        super(scope, id, {
            ...props,
            layers,
        });
    }
}
