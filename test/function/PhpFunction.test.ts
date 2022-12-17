import { describe, expect, it } from 'vitest';
import { PhpFunction } from '../../src';
import { cleanupTemplate, compileTestStack } from '../helper';

describe('PhpFunction', () => {
    it('builds', () => {
        const template = compileTestStack((stack) => {
            new PhpFunction(stack, 'Function', {
                handler: 'index.php',
            });
        }).toJSON();

        expect(cleanupTemplate(template).Resources).toMatchSnapshot();
    });
});
