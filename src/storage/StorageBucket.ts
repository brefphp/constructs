import { BlockPublicAccess, Bucket, BucketEncryption, StorageClass } from 'aws-cdk-lib/aws-s3';
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BucketProps } from 'aws-cdk-lib/aws-s3/lib/bucket';

export class StorageBucket extends Bucket {
    constructor(scope: Construct, id: string, props?: BucketProps) {
        const defaults: Partial<BucketProps> = {
            // Encrypted at rest
            encryption: BucketEncryption.S3_MANAGED,
            // Versioned
            versioned: true,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            enforceSSL: true,
            lifecycleRules: [
                {
                    transitions: [
                        {
                            storageClass: StorageClass.INTELLIGENT_TIERING,
                            transitionAfter: Duration.days(0),
                        },
                    ],
                },
                {
                    noncurrentVersionExpiration: Duration.days(30),
                },
            ],
        };

        super(scope, id, Object.assign({}, defaults, props));
    }
}
