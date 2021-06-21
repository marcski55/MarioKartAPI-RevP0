import StatusCodes from 'http-status-codes';
import { PartDao } from '../../daos/Part/Dao';
const { BAD_REQUEST, OK } = StatusCodes;
const partDao = new PartDao();
/**
 * Delete a part object from the database.
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 * @returns Response with status code
 */
export async function deletePart(req, res) {
    const { name } = req.params;
    const status = JSON.parse(JSON.stringify(await partDao.deletePartDB(name)));
    if ('Error' in status) {
        return res.status(BAD_REQUEST).json(status);
    }
    else {
        return res.status(OK).json(status).end();
    }
}
