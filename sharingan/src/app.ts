import express, { Application, Request, Response } from 'express'
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import apiRoutes from './api/routes';

import dbInit from './config/db/init'


dbInit();

const port = process.env.PORT || 3000;

export const get = () => {
  const app: Application = express()

  // Body parsing Middleware
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', async(req: Request, res: Response): Promise<Response> => {
      return res.status(200).send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${port}/api/v1` })
  })

  app.use('/api/v1', apiRoutes)

  return app
}

export const start = () => {
  const app = get()
  try {
      app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
  } catch (error: any) {
      console.log(`Error occurred: ${error.message}`)
  }
}

start();
