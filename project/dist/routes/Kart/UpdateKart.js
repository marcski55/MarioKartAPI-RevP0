import StatusCodes from 'http-status-codes';
import { getKartDB } from '../../daos/Kart/GetKart';
import { updateKartDB } from '../../daos/Kart/UpdateKart';
import { paramMissingError, requiredParameters } from '../../shared/constants';
import { Kart } from '../../entities/Kart';
const { BAD_REQUEST, ACCEPTED } = StatusCodes;
/**
 * Update a kart object from the database.
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 * @returns Response with status code
 */
export async function updateKart(req, res) {
    /** Extract new information from request. */
    const { name } = req.params;
    const updatedInfo = req.body;
    /** Make sure at least some information was provided, otherwise send error. */
    if (updatedInfo.hasOwnProperty("type") ||
        updatedInfo.hasOwnProperty("speed") ||
        updatedInfo.hasOwnProperty("acceleration") ||
        updatedInfo.hasOwnProperty("weight") ||
        updatedInfo.hasOwnProperty("handling") ||
        updatedInfo.hasOwnProperty("traction") ||
        updatedInfo.hasOwnProperty("miniTraction")) {
        /** Get info from database, only change newly provided data and send. */
        const kartData = JSON.parse(JSON.stringify(await getKartDB(name)));
        if (kartData.hasOwnProperty("Error")) {
            return res.status(BAD_REQUEST).json(kartData);
        }
        else {
            const kart = new Kart(name, updatedInfo.hasOwnProperty("type")
                ? updatedInfo.type
                : kartData.KartType.S, updatedInfo.hasOwnProperty("speed")
                ? updatedInfo.speed
                : parseInt(kartData.Speed.N), updatedInfo.hasOwnProperty("acceleration")
                ? updatedInfo.acceleration
                : parseInt(kartData.Acceleration.N), updatedInfo.hasOwnProperty("weight")
                ? updatedInfo.weight
                : parseInt(kartData.Weight.N), updatedInfo.hasOwnProperty("handling")
                ? updatedInfo.handling
                : parseInt(kartData.Handling.N), updatedInfo.hasOwnProperty("traction")
                ? updatedInfo.traction
                : parseInt(kartData.Traction.N), updatedInfo.hasOwnProperty("miniTraction")
                ? updatedInfo.miniTraction
                : parseInt(kartData.MiniTraction.N));
            const status = await updateKartDB(kart, parseInt(kartData.id.N));
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
