import express, { Request, Response } from "express";

import { createJobController, getAllJobsController, getJobByIdController, updateJobController, deleteByIdController } from "../controllers/job";
import { JobAttributes } from "../models/job";

const jobsRouter = express.Router();

jobsRouter.get("/:id?", async (req: Request, res: Response) => {
  try {

    if (req.params.id) {
      const jobID: number = Number(req.params.id);
      const job = await getJobByIdController(jobID);

      return res.status(200).send({
        data: job
      });
    }

    const jobs = await getAllJobsController();

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
    const result = await createJobController(payload);

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
    const result = await updateJobController(jobID, payload);

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
    const result = await deleteByIdController(jobID);

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
