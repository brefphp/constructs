import { describe, expect, it } from 'vitest';
import { cleanupTemplate, compileTestStack } from '../helper';
import { VpcForServerlessApp } from '../../src';

describe('VpcForServerlessApp', () => {
    it('builds', () => {
        const template = compileTestStack((stack) => {
            new VpcForServerlessApp(stack, 'Vpc');
        }).toJSON();

        expect(cleanupTemplate(template).Resources).toMatchSnapshot();
    });
});
