/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { getKart } from './Kart/GetKart';
import { addNewKart } from './Kart/AddNewKart';
import { updateKart } from './Kart/UpdateKart';
import { deleteKart } from './Kart/DeleteKart';
// import { getWheel } from './Wheel/GetWheel';
// import { addNewWheel } from './Wheel/AddNewWheel';
// import { updateWheel } from './Wheel/UpdateWheel';
// import { deleteWheel } from './Wheel/DeleteWheel';
// import { getGlider } from './Glider/GetGlider';
// import { addNewGlider } from './Glider/AddNewGlider';
// import { updateGlider } from './Glider/UpdateGlider';
// import { deleteGlider } from './Glider/DeleteGlider';

export const kartRouter = Router();
kartRouter.get('/:name', getKart);
kartRouter.post('/:name', addNewKart);
kartRouter.put('/:name', updateKart);
kartRouter.delete('/:name', deleteKart);

export const wheelRouter = Router();
// wheelRouter.get('/:name', getWheel);
// wheelRouter.post('/:name', addNewWheel);
// wheelRouter.put('/:name', updateWheel);
// wheelRouter.delete('/:name', deleteWheel);

export const gliderRouter = Router();
// gliderRouter.get('/:name', getGlider);
// gliderRouter.post('/:name', addNewGlider);
// gliderRouter.put('/:name', updateGlider);
// gliderRouter.delete('/:name', deleteGlider);