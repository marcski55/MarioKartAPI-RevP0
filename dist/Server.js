import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import { kartRouter, wheelRouter, gliderRouter } from './routes';
const app = express();
const { BAD_REQUEST } = StatusCodes;
/*******************************************************************************
 *                         Set basic express settings
 ******************************************************************************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}
// Add APIs
app.use('/api/kart', kartRouter);
app.use('/api/wheel', wheelRouter);
app.use('/api/glider', gliderRouter);
// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    console.error(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});
// Export express instance
export default app;
