import { describe, expect, it } from 'vitest';
import { PhpFpmFunction } from '../../src';
import { cleanupTemplate, compileTestStack } from '../helper';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import { mapValues } from 'lodash';

describe('PhpFpmFunction', () => {
    it('builds', () => {
        const template = compileTestStack((stack) => {
            new PhpFpmFunction(stack, 'Function');
        }).toJSON();

        expect(cleanupTemplate(template).Resources).toMatchSnapshot();
    });

    it('supports ARM', () => {
        const template = compileTestStack((stack) => {
            new PhpFpmFunction(stack, 'Function', {
                architecture: Architecture.ARM_64,
            });
        });

        mapValues(template.findResources('AWS::Lambda::Function'), (resource) => {
            expect(resource.Properties.Architectures).toEqual(['arm64']);
            expect(resource.Properties.Layers[0]).matches(
                /arn:aws:lambda:us-east-1:534081306603:layer:arm-php-81-fpm:\d+/
            );
        });
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
