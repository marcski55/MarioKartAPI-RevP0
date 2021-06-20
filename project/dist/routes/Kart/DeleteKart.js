import StatusCodes from 'http-status-codes';
import { deleteKartDB } from '../../daos/Kart/DeleteKart';
const { BAD_REQUEST, OK } = StatusCodes;
/**
 * Delete a kart object from the database.
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 * @returns Response with status code
 */
export async function deleteKart(req, res) {
    const { name } = req.params;
    const status = JSON.parse(JSON.stringify(await deleteKartDB(name)));
    if (status.hasOwnProperty("Error")) {
        return res.status(BAD_REQUEST).json(status);
    }
    else {
        return res.status(OK).json(status).end();
    }
}
