import express, { Express } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import aboutRouter from './routes/about';



const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure routes
app.use('/', indexRouter);
app.use('/about', aboutRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default app;
