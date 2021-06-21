import { IKart } from '../../entities/Kart';
import { PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { ddb, TABLE_NAME } from '../DatabaseSettings';
import { getRandomInt } from '../../shared/functions';
import { getKartDB } from './GetKart';

/**
 * Adds a single kart from the DynamoDB.
 * ID is either provided when called or is randomly generated.
 * @param {IKart} kart - Fully formed Kart object to be added to the DB
 * @returns {object} - Either a success or an error message
 */

export const addNewKartDB =
  async (kart: IKart, kartID: number = getRandomInt()) => {
    const addParams : PutItemCommandInput = {
      TableName: TABLE_NAME,
      Item: {
        id: {N: kartID+''},
        name: {S: kart.name},
        KartType: {S: kart.type},
        Speed: {N: kart.speed +''},
        Acceleration: {N: kart.acceleration+''},
        Weight: {N: kart.weight+''},
        Handling: {N: kart.handling+''},
        Traction: {N: kart.traction+''},
        MiniTraction: {N: kart.miniTraction+''},
        KartOrPart: {S: 'Kart'}
      }
    }
    /**
     * Check if Kart already exists; otherwise add it.
     * Try/catch block used in case of connection error.
     */
    try{
      const checkData = await getKartDB(kart.name);
      if('Error' in checkData){
        await ddb.send(new PutItemCommand(addParams));
        return {'Success': 'Kart added.'};
      } else{
        return {'Error': 'Kart already exists.'};
      }
    } catch (err) {
      return {'Error': 'There was a problem connecting to the database.'};
    }
  };