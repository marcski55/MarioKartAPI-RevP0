import { Router } from 'express';
import { getKart } from './Kart/GetKart';
import { addNewKart } from './Kart/AddNewKart';
import { updateKart } from './Kart/UpdateKart';
import { deleteKart } from './Kart/DeleteKart';
const kartRouter = Router();
kartRouter.get('/:name', getKart);
kartRouter.post('/:name', addNewKart);
kartRouter.put('/:name', updateKart);
kartRouter.delete('/:name', deleteKart);
// Export the base-router
const baseRouter = Router();
baseRouter.use('/kart', kartRouter);
export default baseRouter;
