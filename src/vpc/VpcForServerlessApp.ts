import { SecurityGroup, SubnetType, Vpc, VpcProps } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class VpcForServerlessApp extends Vpc {
    public readonly appSecurityGroup: SecurityGroup;

    constructor(scope: Construct, id: string, props?: VpcProps) {
        const defaults: VpcProps = {
            maxAzs: 1,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'Public',
                    subnetType: SubnetType.PUBLIC,
                },
                // For Lambda
                {
                    cidrMask: 24,
                    name: 'App',
                    subnetType: SubnetType.PRIVATE_WITH_EGRESS,
                },
                // For private services like databases
                {
                    cidrMask: 28,
                    name: 'Isolated',
                    subnetType: SubnetType.PRIVATE_ISOLATED,
                },
            ],
        };
        super(scope, id, { ...defaults, ...props });

        this.appSecurityGroup = new SecurityGroup(this, 'AppSecurityGroup', {
            vpc: this,
            description: 'Security group for Lambda functions',
            allowAllOutbound: true,
            allowAllIpv6Outbound: true,
        });
    }
}
