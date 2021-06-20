import { Router } from 'express';
import { getKart, addKart, updateKart, delKart } from './Karts';

const kartRouter = Router();
kartRouter.get('/:name', getKart);
kartRouter.post('/:name', addKart);
kartRouter.put('/:name', updateKart);
kartRouter.delete('/:name', delKart);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/kart', kartRouter);
export default baseRouter;
