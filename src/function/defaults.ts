import { IVpc, SecurityGroup, SubnetSelection, SubnetType } from 'aws-cdk-lib/aws-ec2';
import { VpcForServerlessApp } from '../vpc/VpcForServerlessApp';
import { Architecture } from 'aws-cdk-lib/aws-lambda';

export const functionDefaults = {
    path: process.cwd(),
    phpVersion: '8.2',
    memorySize: 1024,
    architecture: Architecture.X86_64,
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
