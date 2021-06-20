import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {fromIni } from '@aws-sdk/credential-provider-ini';
export const REGION:string = "us-east-2";
export const ddb: DynamoDBClient = new DynamoDBClient({
  credentials: fromIni({profile: 'default'}),
  region: REGION,
});
export const TABLE_NAME = "KartsAndParts";