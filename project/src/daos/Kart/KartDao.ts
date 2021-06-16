import { IKart } from '@entities/Kart';
import * as AWS from 'aws-sdk';

//* this is the file to put DB interactions in
// TODO: Edit to fit Kart Data

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "KartData";

export interface IKartDao{
    readonly getAllKarts: object;
    readonly getKartByName: object;
    readonly addOrUpdateKart: object;
    readonly deleteKart: object;
}

class KartDao implements IKartDao {
    readonly getAllKarts = async () => {
        const params = {
            TableName: TABLE_NAME,
        };
        return await dynamoClient.scan(params).promise();
    };

    readonly getKartByName = async (name: string) => {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                name
            }
        };
        return await dynamoClient.get(params).promise();
    };

    readonly addOrUpdateKart = async (kart: IKart) => {
        const params = {
            TableName: TABLE_NAME,
            Item: kart,
        }
        return await dynamoClient.put(params).promise();
    };

    readonly deleteKart = async (name: string) => {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                name
            }
        };
        return await dynamoClient.delete(params).promise();
    }
}

export default KartDao;
