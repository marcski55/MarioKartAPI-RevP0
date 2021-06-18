import { IKart } from '@entities/Kart';
import {DynamoDBClient, PutItemCommand, GetItemCommand, DeleteItemCommand, GetItemCommandInput} from "@aws-sdk/client-dynamodb";
const REGION:string = "us-east-2";
const ddb: DynamoDBClient = new DynamoDBClient({region: REGION});
export{ddb};

const TABLE_NAME = "KartData";

export interface IKartDao{
    // readonly getAllKarts: object;
    // readonly getKartByName: object;
    // readonly addOrUpdateKart: object;
    // readonly deleteKart: object;
}

class KartDao implements IKartDao {
    readonly getAllKarts = async () => {
    //     const params = {
    //         TableName: TABLE_NAME,
    //     };
    //     return await ddb.scan(params).promise();
    };

    readonly getKartByName = async (name: string) => {
        const params : GetItemCommandInput = {
            TableName: TABLE_NAME,
            Key: {
                id: {N: "0"},
                name: {S: "Standard Kart"},
            },
            // ProjectionExpression: "name",
        };
        return await ddb.send(new GetItemCommand(params));
        // return await ddb.get(params).promise();

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
