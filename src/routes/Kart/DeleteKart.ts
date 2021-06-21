import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import { KartDao } from '../../daos/Kart/KartDao';

const { BAD_REQUEST, OK } = StatusCodes;
const kartDao = new KartDao();

/**
 * Delete a kart object from the database.
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 * @returns Response with status code
 */
export async function deleteKart(req: Request, res: Response) {
    const { name } = req.params;
    const status = JSON.parse(JSON.stringify(await kartDao.deleteKartDB(name)));
    if('Error' in status){
        return res.status(BAD_REQUEST).json(status);
    } else {
        return res.status(OK).json(status).end();
    }
}