import { ScanCommand, ScanCommandInput, ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { ddb, TABLE_NAME } from "../DatabaseSettings";

/**
 * Gets a single kart from the DynamoDB.
 * @param {string} kartName - The name of the kart to be fetched
 * @returns {object} - Either an error message or kart data
 */

export const getKartDB = async (kartName: string) => {
  /** Set parameters for DynamoDB and get data. */
  const scanParams : ScanCommandInput = {
    TableName: TABLE_NAME,
    FilterExpression: "#nm = :n and #kp = :k",
    ProjectionExpression: "#nm, KartType, Speed, Acceleration, Weight, Handling, Traction, MiniTraction, #id",
    ExpressionAttributeNames:{
      "#nm": "name",
      "#id": "id",
      "#kp": "KartOrPart"
    },
    ExpressionAttributeValues:{
      ":n" : {S: kartName},
      ":k" : {S: "Kart"}
    }
  };
  const data : ScanCommandOutput = 
    await ddb.send(new ScanCommand(scanParams));

  /** By default, data is in a single-item array. Extract it. */
  let kartData : object | undefined = data.Items?.shift();

  /** Check that data was actually received. If not, return an error. */
  if(kartData){
    return kartData;
  } else {
    return {"Error": "Requested kart does not exist in database."};
  }
};