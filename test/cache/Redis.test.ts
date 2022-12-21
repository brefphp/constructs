import { describe, expect, it } from 'vitest';
import { cleanupTemplate, compileTestStack } from '../helper';
import { Redis, VpcForServerlessApp } from '../../src';

describe('Redis', () => {
    it('builds', () => {
        const template = compileTestStack((stack) => {
            new Redis(stack, 'Redis', {
                vpc: new VpcForServerlessApp(stack, 'Vpc'),
            });
        }).toJSON();

        expect(cleanupTemplate(template).Resources).toMatchSnapshot();
    });
});
