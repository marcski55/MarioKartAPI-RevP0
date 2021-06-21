import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { PartDao } from '../../daos/Part/Dao';
import { paramMissingError, requiredParameters } from '../../shared/constants';
import { Part } from '../../entities/Part';

const { BAD_REQUEST, CREATED } = StatusCodes;
const partDao = new PartDao();

/**
 * Create a new part object to be sent to the database.
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 * @returns Response with status code
 */
export async function addNewPart(req: Request, res: Response) {
  /** Get Part information and create a new Part object */
  const { name } = req.params;
  const partData = req.body;
  const part = new Part(
    name,
    partData.type,
    partData.speed,
    partData.acceleration,
    partData.weight,
    partData.handling,
    partData.traction,
    partData.miniTraction
  );

  /** Make sure all attributes have been provided. */
  if (
    part.type === undefined ||
    part.speed === undefined ||
    part.acceleration === undefined ||
    part.weight === undefined ||
    part.handling === undefined ||
    part.traction === undefined ||
    part.miniTraction === undefined
  ) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
      required: requiredParameters
    });
  }

  /** Send Part to database handler; will get error if Part already exists. */
  const status = await partDao.addNewPartDB(part);
  if('Error' in status){
    return res.status(BAD_REQUEST).json(status).end();
  } else{
    return res.status(CREATED).json(status).end();
  }
}