import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { KartDao } from '../../daos/Kart/KartDao';
import { Kart } from '../../entities/Kart';

const { BAD_REQUEST, OK } = StatusCodes;
const kartDao = new KartDao();

/**
 * Get a kart object from the database.
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 * @returns Response with status code
 */
 export async function getKart(req: Request, res: Response) {
  /** Get Kart information and save Kart object locally */
  const { name } = req.params;
  const kartData = JSON.parse(JSON.stringify(await kartDao.getKartDB(name)));

  /** Check that Kart actually exists; format for output */
  if('Error' in kartData){
      return res.status(BAD_REQUEST).json(kartData);
  } else {
      const kart = new Kart(
          kartData.name.S,
          kartData.KartType.S,
          parseFloat(kartData.Speed.N),
          parseFloat(kartData.Acceleration.N),
          parseFloat(kartData.Weight.N),
          parseFloat(kartData.Handling.N),
          parseFloat(kartData.Traction.N),
          parseFloat(kartData.MiniTraction.N)
      );
      return res.status(OK).json(kart);
  }
}