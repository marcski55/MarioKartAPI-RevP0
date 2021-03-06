import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { PartDao } from '../../daos/Part/Dao';
import { Part } from '../../entities/Part';

const { BAD_REQUEST, OK } = StatusCodes;
const partDao = new PartDao();

/**
 * Get a part object from the database.
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 * @returns Response with status code
 */
 export async function getPart(req: Request, res: Response) {
  /** Get Part information and save Part object locally */
  const { name } = req.params;
  const partData = JSON.parse(JSON.stringify(await partDao.getPartDB(name)));

  /** Check that Part actually exists; format for output */
  if('Error' in partData){
      return res.status(BAD_REQUEST).json(partData);
  } else {
      const part = new Part(
          partData.name.S,
          partData.PartType.S,
          parseFloat(partData.Speed.N),
          parseFloat(partData.Acceleration.N),
          parseFloat(partData.Weight.N),
          parseFloat(partData.Handling.N),
          parseFloat(partData.Traction.N),
          parseFloat(partData.MiniTraction.N)
      );
      return res.status(OK).json(part);
  }
}