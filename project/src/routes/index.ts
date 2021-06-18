import { Router } from 'express';
import { getAll, getOne, addOrUpdate, delKart } from './Karts';

const kartRouter = Router();
kartRouter.get('/all', getAll);
kartRouter.get('/one', getOne);
kartRouter.post('/add', addOrUpdate);
kartRouter.put('/update', addOrUpdate);
kartRouter.delete('/delete/:id', delKart);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/karts', kartRouter);
export default baseRouter;
