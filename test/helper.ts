import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

export function compileTestStack(definition: (stack: Stack) => void): Template {
    const stack = new Stack(undefined, 'app', {
        env: { region: 'us-east-1' },
    });
    definition(stack);

    return Template.fromStack(stack);
}
