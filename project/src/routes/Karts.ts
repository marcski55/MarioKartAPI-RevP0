import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import KartDao from '@daos/Kart/KartDao';
import { paramMissingError } from '@shared/constants';
import {Kart} from '@entities/Kart';

const kartDao = new KartDao();
const { BAD_REQUEST, CREATED, OK, ACCEPTED } = StatusCodes;

/**
 * Get one kart.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function getKart(req: Request, res: Response) {
    const { name } = req.params;
    const kartData = JSON.parse(JSON.stringify(await kartDao.getKartByName(name)));
    if(kartData.hasOwnProperty("Error")){
        return res.status(BAD_REQUEST).json(kartData);
    } else {
        const kart = new Kart(
            kartData.name.S,
            kartData.KartType.S,
            parseInt(kartData.Speed.N),
            parseInt(kartData.Acceleration.N),
            parseInt(kartData.Weight.N),
            parseInt(kartData.Handling.N),
            parseInt(kartData.Traction.N),
            parseInt(kartData.MiniTraction.N)
        );
        return res.status(OK).json(kart);
    }
}

/**
 * Add kart.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function addKart(req: Request, res: Response) {
    const { name } = req.params;
    const kartData = req.body;
    const kart = new Kart(
        name,
        kartData.type,
        kartData.speed,
        kartData.acceleration,
        kartData.weight,
        kartData.handling,
        kartData.traction,
        kartData.miniTraction
    );
    if (
        kart.type === undefined ||
        kart.speed === undefined ||
        kart.acceleration === undefined ||
        kart.weight === undefined ||
        kart.handling === undefined ||
        kart.traction === undefined ||
        kart.miniTraction === undefined
    ) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
            requiredParameters: "type, speed, acceleration, weight, handling, Traction, miniTraction"
        });
    }
    await kartDao.addNewKart(kart);
    return res.status(CREATED).end();
}

/**
 * Update Kart
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function updateKart(req: Request, res: Response) {
    const { name } = req.params;
    const updatedInfo = req.body;
    if(
        updatedInfo.hasOwnProperty("type") ||
        updatedInfo.hasOwnProperty("speed") ||
        updatedInfo.hasOwnProperty("acceleration") ||
        updatedInfo.hasOwnProperty("weight") ||
        updatedInfo.hasOwnProperty("handling") ||
        updatedInfo.hasOwnProperty("traction") ||
        updatedInfo.hasOwnProperty("miniTraction")
    ) {
        const kartData = JSON.parse(JSON.stringify(await kartDao.getKartByName(name)));
        if(kartData.hasOwnProperty("Error")){
            return res.status(BAD_REQUEST).json(kartData);
        } else {
            const kart = new Kart(
                kartData.name.S,
                kartData.KartType.S,
                parseInt(kartData.Speed.N),
                parseInt(kartData.Acceleration.N),
                parseInt(kartData.Weight.N),
                parseInt(kartData.Handling.N),
                parseInt(kartData.Traction.N),
                parseInt(kartData.MiniTraction.N)
            );
            if( updatedInfo.hasOwnProperty("type") ){
                kart.type = updatedInfo.type;
            }
            if( updatedInfo.hasOwnProperty("speed") ){
                kart.speed = updatedInfo.speed;
            }
            if( updatedInfo.hasOwnProperty("acceleration") ){
                kart.acceleration = updatedInfo.acceleration;
            }
            if( updatedInfo.hasOwnProperty("weight") ){
                kart.weight = updatedInfo.weight;
            }
            if( updatedInfo.hasOwnProperty("handling") ){
                kart.handling = updatedInfo.handling;
            }
            if( updatedInfo.hasOwnProperty("traction") ){
                kart.traction = updatedInfo.traction;
            }
            if( updatedInfo.hasOwnProperty("miniTraction") ){
                kart.miniTraction = updatedInfo.miniTraction;
            }
            await kartDao.updateKart(parseInt(kartData.id.N), kart);
            return res.status(ACCEPTED).json({"Success": "Item Updated"}).end();
        }
    }
    else {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
            mustHaveAtLeastOneParameter: "type, speed, acceleration, weight, handling, Traction, miniTraction"
        });
    }
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
    const status = JSON.parse(JSON.stringify(await kartDao.deleteKart(name)));
    if(status.hasOwnProperty("Error")){
        return res.status(BAD_REQUEST).json(status);
    } else {
        return res.status(OK).json(status).end();
    }
}
