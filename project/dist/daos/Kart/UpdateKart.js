import { deleteKartDB } from './DeleteKart';
import { addNewKartDB } from './AddNewKart';
/**
 * Updates a previously existing kart in the DynamoDB by deleting
 * the old kart and uploading a provided replacement with the same ID.
 * @param {IKart} kart - Fully formed Kart object to be uploaded to the DB.
 * @param {number} kartID - The id of the kart that previously existed.
 * @returns {object} - Success message when done.
 */
export const updateKartDB = async (kart, kartID) => {
    await deleteKartDB(kart.name);
    await addNewKartDB(kart, kartID);
    return { "Success": "Kart updated in database." };
};
