import { describe, expect, it } from 'vitest';
import { ConsoleFunction } from '../../src';
import { compileTestStack } from '../helper';

describe('ConsoleFunction', () => {
    it('adds the console layer', () => {
        const template = compileTestStack((stack) => {
            new ConsoleFunction(stack, 'Console', {
                handler: 'index.php',
            });
        });

        const consoleFunction = template.findResources('AWS::Lambda::Function');
        const layers = consoleFunction.Console63CA37A7.Properties.Layers;
        expect(layers).length(2);
        expect(layers[0]).to.match(/arn:aws:lambda:us-east-1:534081306603:layer:php-81:\d+/);
        expect(layers[1]).to.match(/arn:aws:lambda:us-east-1:534081306603:layer:console:\d+/);
    });

    // https://github.com/brefphp/constructs/issues/1
    it('can build multiple functions in the same stack', () => {
        const template = compileTestStack((stack) => {
            new ConsoleFunction(stack, 'Function1', {
                handler: 'index.php',
            });
            new ConsoleFunction(stack, 'Function2', {
                handler: 'index.php',
            });
        });

        template.resourceCountIs('AWS::Lambda::Function', 2);
    });
});
