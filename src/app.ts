import express, {ErrorRequestHandler} from "express";
import userRoutes from './routes/users';

const app = express();
app.use('/users', userRoutes)
app.use(((err, req, res, next) => {}) as ErrorRequestHandler);

app.listen(3000);