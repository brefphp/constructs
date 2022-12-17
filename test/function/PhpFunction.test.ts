import { describe, expect, it } from 'vitest';
import { PhpFunction } from '../../src';
import { compileTestStack } from '../helper';

describe('PhpFunction', () => {
    it('builds', () => {
        const template = compileTestStack((stack) => {
            new PhpFunction(stack, 'Function', {
                handler: 'index.php',
            });
        }).toJSON();
        // Remove random data that changes every time
        delete template.Resources.Function76856677?.Properties?.Code?.S3Key;

        expect(template.Resources).toMatchSnapshot();
    });
});
