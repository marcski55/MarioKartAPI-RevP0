import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { ddb, TABLE_NAME } from '../DatabaseSettings';
/**
 * Gets a single part from the DynamoDB.
 * @param {string} partName - The name of the part to be fetched
 * @returns {object} - Either an error message or part data
 */
export const getPartDB = async (partName) => {
    /** Set parameters for DynamoDB and get data. */
    const scanParams = {
        TableName: TABLE_NAME,
        FilterExpression: '#nm = :n and #kp = :p',
        ProjectionExpression: '#nm, PartType, #id, '
            + 'Speed, Acceleration, Weight, Handling, Traction, MiniTraction',
        ExpressionAttributeNames: {
            '#nm': 'name',
            '#id': 'id',
            '#kp': 'KartOrPart'
        },
        ExpressionAttributeValues: {
            ':n': { S: partName },
            ':p': { S: 'Part' }
        }
    };
    let data;
    try {
        data = await ddb.send(new ScanCommand(scanParams));
    }
    catch {
        return { 'Error': 'There was a problem connecting to the database.' };
    }
    /** By default, data is in a single-item array. Extract it. */
    const partData = data.Items?.shift();
    /** Check that data was actually received. If not, return an error. */
    if (partData) {
        return partData;
    }
    else {
        return { 'Error': 'Requested part does not exist in database.' };
    }
};
