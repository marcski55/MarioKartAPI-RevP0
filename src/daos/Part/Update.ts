import { IPart } from '../../entities/Part';
import { deletePartDB } from './Delete';
import { addNewPartDB } from './AddNew';

/**
 * Updates a previously existing part in the DynamoDB by deleting
 * the old part and uploading a provided replacement with the same ID.
 * @param {IPart} part - Fully formed part object to be uploaded to the DB.
 * @param {number} partID - The id of the part that previously existed.
 * @returns {object} - Success message when done.
 */

export const updatePartDB = async (part: IPart, partID: number) => {
  await deletePartDB(part.name);
  await addNewPartDB(part, partID);
  return {'Success': 'Part updated in database.'}
};