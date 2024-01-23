import express, { Request, Response } from "express";

import { createJobController, getAllJobsController } from "../controllers/job";
import { JobAttributes } from "../models/job";

const jobsRouter = express.Router();

jobsRouter.get("/", async (req: Request, res: Response) => {
  const jobs = await getAllJobsController();
  res.send(jobs);
});

jobsRouter.post("/", async (req: Request, res: Response) => {
  const payload: JobAttributes = req.body;
  const result = await createJobController(payload);
  res.send(result);
});

export default jobsRouter;
