import { describe, expect, it } from 'vitest';
import { cleanupTemplate, compileTestStack } from '../helper';
import { StorageBucket } from '../../src/storage/StorageBucket';

describe('StorageBucket', () => {
    it('builds', () => {
        const template = compileTestStack((stack) => {
            new StorageBucket(stack, 'Files');
        }).toJSON();

        expect(cleanupTemplate(template).Resources).toMatchSnapshot();
    });
});
