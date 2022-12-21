import { CfnCacheCluster, CfnCacheClusterProps, CfnSubnetGroup } from 'aws-cdk-lib/aws-elasticache';
import { Names } from 'aws-cdk-lib';
import { Port, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { VpcForServerlessApp } from '../vpc/VpcForServerlessApp';

export type RedisProps = Partial<CfnCacheClusterProps> & {
    vpc: VpcForServerlessApp;
};

export class Redis extends CfnCacheCluster {
    constructor(scope: Construct, id: string, props: RedisProps) {
        const securityGroup = new SecurityGroup(scope, `${id}SecurityGroup`, {
            vpc: props.vpc,
            description: 'Security group for Redis',
            allowAllOutbound: false,
            allowAllIpv6Outbound: false,
        });

        const stackId = Names.uniqueResourceName(securityGroup, {
            maxLength: 100,
        });
        const subnetGroup = new CfnSubnetGroup(scope, `${id}SubnetGroup`, {
            cacheSubnetGroupName: `${stackId}${id}SubnetGroup`,
            description: 'Subnet group for Redis',
            // Isolated subnets don't have a route to the internet (unlike private), this is what we want
            subnetIds: props.vpc.isolatedSubnets.map((subnet) => subnet.subnetId),
        });

        props.vpc.appSecurityGroup.connections.allowTo(
            securityGroup,
            Port.tcp(props.port ?? 6379),
            'Allow Lambda functions to connect to Redis'
        );

        super(scope, id, {
            engine: 'redis',
            cacheNodeType: 'cache.t3.micro',
            numCacheNodes: 1,
            vpcSecurityGroupIds: [securityGroup.securityGroupId],
            cacheSubnetGroupName: subnetGroup.cacheSubnetGroupName,
            ...props,
        });

        this.addDependsOn(subnetGroup);
    }
}
