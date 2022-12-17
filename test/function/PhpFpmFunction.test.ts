import { describe, expect, it } from 'vitest';
import { PhpFpmFunction, PhpFunction } from '../../src';
import { compileTestStack } from '../helper';

describe('PhpFpmFunction', () => {
    it('builds', () => {
        const template = compileTestStack((stack) => {
            new PhpFpmFunction(stack, 'Function', {
                handler: 'index.php',
            });
        }).toJSON();
        // Remove random data that changes every time
        delete template.Resources.Function76856677?.Properties?.Code?.S3Key;

        expect(template.Resources).toMatchSnapshot();
    });
});
