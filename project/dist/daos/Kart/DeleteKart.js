import { ddb, TABLE_NAME } from "./DatabaseSettings";
import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { getKartDB } from "./GetKart";
/**
 * Deletes a single kart from the DynamoDB.
 * @param {string} kartName - The name of the kart to be deleted from the DB.
 * @returns {object} - Either a success or an error message
 */
export const deleteKartDB = async (kartName) => {
    const kartData = JSON.parse(JSON.stringify(await getKartDB(kartName)));
    if (kartData.hasOwnProperty("Error")) {
        return { "Error": "Requested kart does not exist in database." };
    }
    else {
        const delParams = {
            TableName: TABLE_NAME,
            Key: {
                "id": { N: kartData.id.N },
                "name": { S: kartName }
            }
        };
        await ddb.send(new DeleteItemCommand(delParams));
        return { "Success": "Kart deleted." };
    }
};
