import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import KartDao from '@daos/Kart/KartDao';
import { paramMissingError } from '@shared/constants';
import Kart from '@entities/Kart';

const kartDao = new KartDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**
 * Get all karts.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function getAll(req: Request, res: Response) {
    const karts = await kartDao.getAllKarts();
    return res.status(OK).json({karts});
}

/**
 * Get one kart.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function getOne(req: Request, res: Response) {
    const { name } = req.params;
    const kart = await kartDao.getKartByName(name);
    return res.status(OK).json({kart});
}

/**
 * Add or update (replace) kart.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function addOrUpdate(req: Request, res: Response) {
    const kartData = req.body;
    const kart = new Kart(
        kartData.name, 
        kartData.type,
        kartData.speed,
        kartData.acceleration,
        kartData.weight,
        kartData.handling,
        kartData.miniTraction,
        kartData.traction
    );
    if (!kart) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
            required: "name, type, speed, acceleration, weight, handling, miniTraction, Traction"
        });
    }
    await kartDao.addOrUpdateKart(kart);
    return res.status(CREATED).end();
}

/**
 * Delete one kart.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function delKart(req: Request, res: Response) {
    const { name } = req.params;
    await kartDao.deleteKart(name);
    return res.status(OK).end();
}
