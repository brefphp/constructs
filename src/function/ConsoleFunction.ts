import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { consoleLayer } from '../layers';
import { PhpFunction, PhpFunctionProps } from './PhpFunction';

export class ConsoleFunction extends PhpFunction {
    constructor(scope: Construct, id: string, props: PhpFunctionProps) {
        super(scope, id, props);

        this.addLayers(consoleLayer(this, Stack.of(scope).region));
    }
}
