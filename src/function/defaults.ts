import { IVpc, SecurityGroup, SubnetSelection, SubnetType } from 'aws-cdk-lib/aws-ec2';
import { VpcForServerlessApp } from '../vpc/VpcForServerlessApp';

export const functionDefaults = {
    path: process.cwd(),
    phpVersion: '8.1',
    memorySize: 1024,
    platform: 'x86',
    excludedPhpPaths: ['.git', '.idea', 'cdk.out', 'node_modules', '.bref', '.serverless', 'tests'],
} as const;

export function vpcDefaults(vpc?: IVpc):
    | Record<string, never>
    | {
          vpc: IVpc;
          securityGroups: SecurityGroup[];
          vpcSubnets: SubnetSelection;
      } {
    if (vpc instanceof VpcForServerlessApp) {
        // Automatically set the security group and subnets
        return {
            vpc: vpc,
            securityGroups: [vpc.appSecurityGroup],
            vpcSubnets: {
                subnetType: SubnetType.PRIVATE_WITH_EGRESS,
            },
        };
    }
    return {};
}
