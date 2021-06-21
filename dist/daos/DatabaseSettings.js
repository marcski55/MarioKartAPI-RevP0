import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { fromIni } from '@aws-sdk/credential-provider-ini';
export const REGION = 'us-east-2';
export const ddb = new DynamoDBClient({
    credentials: fromIni({ profile: 'default' }),
    region: REGION,
});
export const TABLE_NAME = 'KartsAndParts';
