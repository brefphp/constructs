import { Construct } from 'constructs';
import { PhpFunction, PhpFunctionProps } from './PhpFunction';

export class ConsoleFunction extends PhpFunction {
    constructor(scope: Construct, id: string, props: PhpFunctionProps) {
        super(scope, id, props);

        this.addEnvironment('BREF_RUNTIME', 'console');
    }
}
