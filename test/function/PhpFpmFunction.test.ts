import { describe, expect, it } from 'vitest';
import { PhpFpmFunction } from '../../src';
import { cleanupTemplate, compileTestStack } from '../helper';

describe('PhpFpmFunction', () => {
    it('builds', () => {
        const template = compileTestStack((stack) => {
            new PhpFpmFunction(stack, 'Function');
        }).toJSON();

        expect(cleanupTemplate(template).Resources).toMatchSnapshot();
    });

    // https://github.com/brefphp/constructs/issues/1
    it('can build multiple functions in the same stack', () => {
        const template = compileTestStack((stack) => {
            new PhpFpmFunction(stack, 'Function1');
            new PhpFpmFunction(stack, 'Function2');
        });

        template.resourceCountIs('AWS::Lambda::Function', 2);
    });
});
