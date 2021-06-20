import { IKart } from '@entities/Kart';
import {DynamoDBClient, PutItemCommand, GetItemCommand, DeleteItemCommand, GetItemCommandInput, ScanCommand, QueryCommand, QueryCommandInput, ScanCommandInput, PutItemCommandInput, DeleteItemCommandInput, UpdateItemCommandInput, UpdateItemCommand} from "@aws-sdk/client-dynamodb";
import {fromIni} from '@aws-sdk/credential-provider-ini';
import { getRandomInt } from '@shared/functions';
import { jsxClosingElement } from '@babel/types';
const REGION:string = "us-east-2";
const ddb: DynamoDBClient = new DynamoDBClient({credentials: fromIni({profile: 'default'}),region: REGION,});
export{ddb};

const TABLE_NAME = "KartsAndParts";

export interface IKartDao{
    // readonly getKartByName: object;
    // readonly addOrUpdateKart: object;
    // readonly deleteKart: object;
}

class KartDao implements IKartDao {
    readonly getKartByName = async (input: string) => {
        const params : ScanCommandInput = {
            TableName: TABLE_NAME,
            FilterExpression: "#nm = :n",
            ProjectionExpression: "#nm, KartType, Speed, Acceleration, Weight, Handling, Traction, MiniTraction, #id",
            ExpressionAttributeNames:{
                "#nm": "name",
                "#id": "id"
            },
            ExpressionAttributeValues:{
                ":n" : {S: input}
            }
        };
        const data = await ddb.send(new ScanCommand(params));
        let kartData = data.Items?.shift();
        if(kartData){
            return kartData as object;
        } else {
            return {"Error": "Requested kart does not exist in database."};
        }
    };

    readonly addNewKart = async (kart: IKart) => {
        const params : PutItemCommandInput = {
            TableName: TABLE_NAME,
            Item: {
                id: {N: getRandomInt()+""},
                name: {S: kart.name},
                KartType: {S: kart.type},
                Speed: {N: kart.speed +""},
                Acceleration: {N: kart.acceleration+""},
                Weight: {N: kart.weight+""},
                Handling: {N: kart.handling+""},
                Traction: {N: kart.traction+""},
                MiniTraction: {N: kart.miniTraction+""},
                KartOrPart: {S: "Kart"}
            }
        }
        return await ddb.send(new PutItemCommand(params));
    };

    readonly updateKart = async (kartID: number, kart: IKart) => {
        const delParams : DeleteItemCommandInput = {
            TableName: TABLE_NAME,
            Key: {
                id: {N: kartID+""},
                name: {S: kart.name}
            }
        };
        await ddb.send(new DeleteItemCommand(delParams));
        const createParams: PutItemCommandInput = {
            TableName: TABLE_NAME,
            Item: {
                id: {N: kartID+""},
                name: {S: kart.name},
                KartType: {S: kart.type},
                Speed: {N: kart.speed +""},
                Acceleration: {N: kart.acceleration+""},
                Weight: {N: kart.weight+""},
                Handling: {N: kart.handling+""},
                Traction: {N: kart.traction+""},
                MiniTraction: {N: kart.miniTraction+""},
                KartOrPart: {S: "Kart"}
            }
        }
        return await ddb.send(new PutItemCommand(createParams));
    };

    readonly deleteKart = async (input: string) => {
        console.log("Kart to delete: ", input);
        const searchParams : ScanCommandInput = {
            TableName: TABLE_NAME,
            FilterExpression: "#nm = :n",
            ProjectionExpression: "#id",
            ExpressionAttributeNames:{
                "#nm": "name",
                "#id": "id"
            },
            ExpressionAttributeValues:{
                ":n" : {S: input}
            }
        };
        const data = await ddb.send(new ScanCommand(searchParams));
        let kartData = data.Items?.shift();
        if(kartData){
            const retrievedData = JSON.parse(JSON.stringify(kartData));
            const delParams : DeleteItemCommandInput = {
                TableName: TABLE_NAME,
                Key: {
                    "id": {N: retrievedData.id.N},
                    "name": {S: input}
                }
            };
            await ddb.send(new DeleteItemCommand(delParams));
            return {"Success": "Kart deleted."}
        } else {
            return {"Error": "Requested kart does not exist in database."};
        }
    }
}

export default KartDao;
