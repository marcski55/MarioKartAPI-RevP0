import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { PartDao } from '../../daos/Part/Dao';
import { paramMissingError, requiredParameters } from '../../shared/constants';
import { Part } from '../../entities/Part';

const { BAD_REQUEST, ACCEPTED } = StatusCodes;
const partDao = new PartDao();

/**
 * Update a part object from the database.
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 * @returns Response with status code
 */
export async function updatePart(req: Request, res: Response) {
  /** Extract new information from request. */
  const { name } = req.params;
  const newInfo = req.body;

  /** Make sure at least some information was provided, otherwise send error. */
  if(
    'type' in newInfo ||
    'speed' in newInfo ||
    'acceleration' in newInfo ||
    'weight' in newInfo ||
    'handling' in newInfo ||
    'traction' in newInfo ||
    'miniTraction' in newInfo
  ){
    /** Get info from database, only change newly provided data and send. */
    const oldInfo = JSON.parse(JSON.stringify(await partDao.getPartDB(name)));
    if('Error' in oldInfo){
      return res.status(BAD_REQUEST).json(oldInfo);
    } else {
      const part = new Part(
        name,
        'type' in newInfo ? newInfo.type : oldInfo.PartType.S,
        'speed' in newInfo ? newInfo.speed : parseFloat(oldInfo.Speed.N),
        'acceleration' in newInfo ?
          newInfo.acceleration : parseFloat(oldInfo.Acceleration.N),
        'weight' in newInfo ? newInfo.weight : parseFloat(oldInfo.Weight.N),
        'handling' in newInfo ? newInfo.handling : parseFloat(oldInfo.Handling.N),
        'traction' in newInfo ? newInfo.traction : parseFloat(oldInfo.Traction.N),
        'miniTraction' in newInfo ?
          newInfo.miniTraction : parseFloat(oldInfo.MiniTraction.N)
      );
      const status = await partDao.updatePartDB(part, parseInt(oldInfo.id.N));
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