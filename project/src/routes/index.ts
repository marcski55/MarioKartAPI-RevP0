import { Router } from 'express';
import { getAll, getOne, addOrUpdate, delKart } from './Karts';

const kartRouter = Router();
kartRouter.get('/karts', getAll);
kartRouter.get('/karts/:name', getOne);
kartRouter.post('/add', addOrUpdate);
kartRouter.put('/update', addOrUpdate);
kartRouter.delete('/delete/:id', delKart);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/karts', kartRouter);
export default baseRouter;
