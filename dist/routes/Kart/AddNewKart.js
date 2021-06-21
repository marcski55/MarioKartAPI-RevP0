import StatusCodes from 'http-status-codes';
import { KartDao } from '../../daos/Kart/KartDao';
import { paramMissingError, requiredParameters } from '../../shared/constants';
import { Kart } from '../../entities/Kart';
const { BAD_REQUEST, CREATED } = StatusCodes;
const kartDao = new KartDao();
/**
 * Create a new kart object to be sent to the database.
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 * @returns Response with status code
 */
export async function addNewKart(req, res) {
    /** Get Kart information and create a new Kart object */
    const { name } = req.params;
    const kartData = req.body;
    const kart = new Kart(name, kartData.type, kartData.speed, kartData.acceleration, kartData.weight, kartData.handling, kartData.traction, kartData.miniTraction);
    /** Make sure all attributes have been provided. */
    if (kart.type === undefined ||
        kart.speed === undefined ||
        kart.acceleration === undefined ||
        kart.weight === undefined ||
        kart.handling === undefined ||
        kart.traction === undefined ||
        kart.miniTraction === undefined) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
            required: requiredParameters
        });
    }
    /** Send Kart to database handler; will get error if Kart already exists. */
    const status = await kartDao.addNewKartDB(kart);
    if ('Error' in status) {
        return res.status(BAD_REQUEST).json(status).end();
    }
    else {
        return res.status(CREATED).json(status).end();
    }
}
