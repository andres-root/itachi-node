import express, { Request, Response } from "express";

import { JobApp } from "../../../../core/apps/jobs";
import { JobRepository } from "../../../../adapters/output/repositories/job";
import { JobAttributes } from "../../../../core/models/job";


const jobsRouter = express.Router();

const jobRepository = new JobRepository();
const jobApp = new JobApp(jobRepository);

jobsRouter.get("/:id?", async (req: Request, res: Response) => {
  try {

    if (req.params.id) {
      const jobID: number = Number(req.params.id);
      const job = await jobApp.getJobById(jobID);

      return res.status(200).send({
        data: job
      });
    }

    const jobs = await jobApp.getAllJobs();

    return res.status(200).send({
      data: jobs,
    });
  } catch (error) {
    return res.status(500).send({ error: "Failed to create job" });
  }
});

jobsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const payload: JobAttributes = req.body;
    if (!payload.title || !payload.description) {
      return res.status(400).send({ error: "Invalid job payload: 'title' and 'description' are required" });
    }
    const result = await jobApp.createJob(payload);

    return res.status(201).send({
      data: result,
    });
  } catch (error) {
    console.error("Failed to create job:", error);
    return res.status(500).send({ error: "Failed to create job" });
  }
});

jobsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const payload: Partial<JobAttributes> = req.body;
    const jobID: number = Number(req.params.id);
    const result = await jobApp.updateJob(jobID, payload);

    return res.status(201).send({
      data: result,
    });
  } catch (error) {
    console.error("Failed to update job:", error);
    return res.status(500).send({ error: "Failed to update job" });
  }
});

jobsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const jobID: number = Number(req.params.id);
    const result = await jobApp.deleteJobById(jobID);

    return res.status(204).send({
      data: {
        success: true,
        message: `Job with id ${jobID} deleted successfully`,
        data: result,
      }
    });
  } catch (error) {
    console.error("Failed to delete job:", error);
    return res.status(500).send({ error: "Failed to delete job" });
  }
});

export default jobsRouter;
