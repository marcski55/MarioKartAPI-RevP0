import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { ddb, TABLE_NAME } from '../DatabaseSettings';
import { getRandomInt } from '../../shared/functions';
import { getPartDB } from './Get';
/**
 * Adds a single part from the DynamoDB.
 * ID is either provided when called or is randomly generated.
 * @param {IPart} part - Fully formed Part object to be added to the DB
 * @returns {object} - Either a success or an error message
 */
export const addNewPartDB = async (part, partID = getRandomInt()) => {
    const addParams = {
        TableName: TABLE_NAME,
        Item: {
            id: { N: partID + '' },
            name: { S: part.name },
            PartType: { S: part.type },
            Speed: { N: part.speed + '' },
            Acceleration: { N: part.acceleration + '' },
            Weight: { N: part.weight + '' },
            Handling: { N: part.handling + '' },
            Traction: { N: part.traction + '' },
            MiniTraction: { N: part.miniTraction + '' },
            KartOrPart: { S: 'Part' }
        }
    };
    /**
     * Check if Part already exists; otherwise add it.
     * Try/catch block used in case of connection error.
     */
    try {
        const checkData = await getPartDB(part.name);
        if ('Error' in checkData) {
            await ddb.send(new PutItemCommand(addParams));
            return { 'Success': 'Part added.' };
        }
        else {
            return { 'Error': 'Part already exists.' };
        }
    }
    catch (err) {
        return { 'Error': 'There was a problem connecting to the database.' };
    }
};
