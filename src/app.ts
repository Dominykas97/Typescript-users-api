import express from "express";
import userRoutes from './routes/users';
import { json } from 'body-parser';
const app = express();
app.use(json());
app.use('/users', userRoutes);

app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    next({ status: 404 });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.error(err);
    res.status(err.status || 500).json({ err: err.message });
});

app.listen(3000);