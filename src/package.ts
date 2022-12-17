import { AssetOptions } from 'aws-cdk-lib/aws-s3-assets';
import { Code } from 'aws-cdk-lib/aws-lambda';
import { functionDefaults } from './function/defaults';

/**
 * @param path Defaults to the current working directory.
 * @param options Excludes common PHP paths by default.
 */
export function packagePhpCode(
    path: string | undefined = undefined,
    options: AssetOptions = {}
): Code {
    path = path ?? functionDefaults.path;
    // Prepend the PHP paths excluded by default
    const exclude = [...functionDefaults.excludedPhpPaths, ...(options.exclude ?? [])];

    return Code.fromAsset(path, {
        ...options,
        exclude,
    });
}
