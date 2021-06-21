import { ddb, TABLE_NAME } from '../DatabaseSettings';
import {
  DeleteItemCommand,
  DeleteItemCommandInput 
} from '@aws-sdk/client-dynamodb';
import { getPartDB } from './Get';

/**
 * Deletes a single part from the DynamoDB.
 * @param {string} partName - The name of the part to be deleted from the DB.
 * @returns {object} - Either a success or an error message
 */

export const deletePartDB = async (partName: string) => {
  const partData = JSON.parse(JSON.stringify(await getPartDB(partName)));
  if('Error' in partData){
    return {'Error': 'Requested part does not exist in database.'};
  } else {
    const delParams : DeleteItemCommandInput = {
      TableName: TABLE_NAME,
      Key: {
        'id': {N: partData.id.N},
        'name': {S: partName}
      }
    };
    try{
      await ddb.send(new DeleteItemCommand(delParams));
      return {'Success': 'Part deleted.'}
    } catch (err){
      return {'Error': 'There was a problem connecting to the database.'};
    }
  }
}