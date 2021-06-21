import StatusCodes from 'http-status-codes';
import { KartDao } from '../../daos/Kart/KartDao';
import { paramMissingError, requiredParameters } from '../../shared/constants';
import { Kart } from '../../entities/Kart';
const { BAD_REQUEST, ACCEPTED } = StatusCodes;
const kartDao = new KartDao();
/**
 * Update a kart object from the database.
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 * @returns Response with status code
 */
export async function updateKart(req, res) {
    /** Extract new information from request. */
    const { name } = req.params;
    const newInfo = req.body;
    /** Make sure at least some information was provided, otherwise send error. */
    if ('type' in newInfo ||
        'speed' in newInfo ||
        'acceleration' in newInfo ||
        'weight' in newInfo ||
        'handling' in newInfo ||
        'traction' in newInfo ||
        'miniTraction' in newInfo) {
        /** Get info from database, only change newly provided data and send. */
        const oldInfo = JSON.parse(JSON.stringify(await kartDao.getKartDB(name)));
        if ('Error' in oldInfo) {
            return res.status(BAD_REQUEST).json(oldInfo);
        }
        else {
            const kart = new Kart(name, 'type' in newInfo ? newInfo.type : oldInfo.KartType.S, 'speed' in newInfo ? newInfo.speed : parseInt(oldInfo.Speed.N), 'accleration' in newInfo ?
                newInfo.acceleration : parseInt(oldInfo.Acceleration.N), 'weight' in newInfo ? newInfo.weight : parseInt(oldInfo.Weight.N), 'handling' in newInfo ? newInfo.handling : parseInt(oldInfo.Handling.N), 'traction' in newInfo ? newInfo.traction : parseInt(oldInfo.Traction.N), 'miniTraction' in newInfo ?
                newInfo.miniTraction : parseInt(oldInfo.MiniTraction.N));
            const status = await kartDao.updateKartDB(kart, parseInt(oldInfo.id.N));
            return res.status(ACCEPTED).json(status).end();
        }
    }
    else {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
            requiresAtLeastOne: requiredParameters
        });
    }
}
