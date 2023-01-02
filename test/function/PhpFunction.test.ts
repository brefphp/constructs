import { describe, expect, it } from 'vitest';
import { PhpFunction } from '../../src';
import { cleanupTemplate, compileTestStack } from '../helper';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import { mapValues } from 'lodash';

describe('PhpFunction', () => {
    it('builds', () => {
        const template = compileTestStack((stack) => {
            new PhpFunction(stack, 'Function', {
                handler: 'index.php',
            });
        }).toJSON();

        expect(cleanupTemplate(template).Resources).toMatchSnapshot();
    });

    it('supports ARM', () => {
        const template = compileTestStack((stack) => {
            new PhpFunction(stack, 'Function', {
                handler: 'index.php',
                architecture: Architecture.ARM_64,
            });
        });

        mapValues(template.findResources('AWS::Lambda::Function'), (resource) => {
            expect(resource.Properties.Architectures).toEqual(['arm64']);
            expect(resource.Properties.Layers[0]).matches(
                /arn:aws:lambda:us-east-1:534081306603:layer:arm-php-81:\d+/
            );
        });
    });

    // https://github.com/brefphp/constructs/issues/1
    it('can build multiple functions in the same stack', () => {
        const template = compileTestStack((stack) => {
            new PhpFunction(stack, 'Function1', {
                handler: 'index.php',
            });
            new PhpFunction(stack, 'Function2', {
                handler: 'index.php',
            });
        });

        template.resourceCountIs('AWS::Lambda::Function', 2);
    });
});
