import { describe, expect, it } from 'vitest';
import { PhpFpmFunction } from '../../src';
import { cleanupTemplate, compileTestStack } from '../helper';

describe('PhpFpmFunction', () => {
    it('builds', () => {
        const template = compileTestStack((stack) => {
            new PhpFpmFunction(stack, 'Function', {
                handler: 'index.php',
            });
        }).toJSON();

        expect(cleanupTemplate(template).Resources).toMatchSnapshot();
    });
});
