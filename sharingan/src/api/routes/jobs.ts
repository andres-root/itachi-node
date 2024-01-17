import express, { Request, Response } from 'express';

import { createJobController } from '../controllers/job';
import { JobAttributes } from '../models/job';


const jobsRouter = express.Router();

jobsRouter.get('/', (req: Request, res: Response) => {
  res.send({"data": "this is my data", "title": "About Page"});
});

jobsRouter.post('/', async (req: Request, res: Response) => {
  const payload: JobAttributes = req.body;
  const result = await createJobController(payload);
  res.send({"data": "this is my data", "title": "About Page"});
});

export default jobsRouter;
