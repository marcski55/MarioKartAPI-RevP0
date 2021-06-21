/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { getKart } from './Kart/GetKart';
import { addNewKart } from './Kart/AddNewKart';
import { updateKart } from './Kart/UpdateKart';
import { deleteKart } from './Kart/DeleteKart';
import { getPart } from './Part/GetPart';
import { addNewPart } from './Part/AddNewPart';
import { updatePart } from './Part/UpdatePart';
import { deletePart } from './Part/DeletePart';

export const kartRouter = Router();
kartRouter.get('/:name', getKart);
kartRouter.post('/:name', addNewKart);
kartRouter.put('/:name', updateKart);
kartRouter.delete('/:name', deleteKart);

export const partRouter = Router();
partRouter.get('/:name', getPart);
partRouter.post('/:name', addNewPart);
partRouter.put('/:name', updatePart);
partRouter.delete('/:name', deletePart);