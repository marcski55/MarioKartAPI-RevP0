import { IKart } from '@entities/Kart';
import {DynamoDBClient, PutItemCommand, GetItemCommand, DeleteItemCommand, GetItemCommandInput, ScanCommand} from "@aws-sdk/client-dynamodb";
import {fromIni} from '@aws-sdk/credential-provider-ini';
const REGION:string = "us-east-2";
const ddb: DynamoDBClient = new DynamoDBClient({credentials: fromIni({profile: 'default'}),region: REGION,});
export{ddb};

const TABLE_NAME = "KartsAndParts";

export interface IKartDao{
    // readonly getAllKarts: object;
    // readonly getKartByName: object;
    // readonly addOrUpdateKart: object;
    // readonly deleteKart: object;
}

class KartDao implements IKartDao {
    readonly getAllKarts = async () => {
        const params = {
            TableName: TABLE_NAME,
        };
        return await ddb.send(new ScanCommand(params));
    };

    readonly getKartByName = async (input: string) => {
        const params : GetItemCommandInput = {
            TableName: TABLE_NAME,
            Key: {
                id: {N: '0'},
                name: {S: "Standard Kart"},
            },
            // ProjectionExpression: "name",
        };
        return await ddb.send(new GetItemCommand(params));
    };

    readonly addOrUpdateKart = async (kart: IKart) => {
    //     const params = {
    //         TableName: TABLE_NAME,
    //         Item: kart,
    //     }
    //     return await ddb.put(params).promise();
    };

    readonly deleteKart = async (name: string) => {
    //     const params = {
    //         TableName: TABLE_NAME,
    //         Key: {
    //             name
    //         }
    //     };
    //     return await ddb.delete(params).promise();
    }
}

export default KartDao;
