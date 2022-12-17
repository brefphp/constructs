import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { mapValues } from 'lodash';

export function compileTestStack(definition: (stack: Stack) => void): Template {
    const stack = new Stack(undefined, 'app', {
        env: { region: 'us-east-1' },
    });
    definition(stack);

    return Template.fromStack(stack);
}

type CompiledTemplate = { [key: string]: any };

export function cleanupTemplate(template: CompiledTemplate): CompiledTemplate {
    template.Resources = mapValues(template.Resources, (resource) => {
        if (resource.Type === 'AWS::Lambda::Function') {
            if (resource.Properties.Code.S3Key) {
                resource.Properties.Code.S3Key = '<removed>';
            }
            if (Array.isArray(resource.Properties.Layers)) {
                resource.Properties.Layers = resource.Properties.Layers.map((layer: string) =>
                    layer.replace(
                        /(arn:aws:lambda:[a-z0-9\-]+:534081306603:layer:[a-z0-9\-]+:)\d+/,
                        '$1<removed>'
                    )
                );
            }
        }

        return resource;
    });

    return template;
}
