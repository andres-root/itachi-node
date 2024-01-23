import { Job } from "../../../core/models";
import { JobInput, JobOutput } from "../../../core/models/job";
import { JobOutputPort } from "../../../ports/output/job";
import db from "../db/db";


export class JobRepository implements JobOutputPort {
  async createJob(job: JobInput): Promise<JobOutput> {
    try {
      const result = await db.transaction(async (transaction) => {
        const newJob = await Job.create(job, {transaction});
        return newJob;
      });

      return result;
    } catch (error) {
      console.log("transactin rolled back");
      throw error;
    }
  }

  async updateJob(id: number, payload: Partial<JobInput>): Promise<JobOutput> {
    try {
      const result = await db.transaction(async (transaction) => {
        const job = await Job.findByPk(id);
        if (!job) {
          throw new Error("job not found");
        }
        const updatedJob = await (job as Job).update(payload, {transaction});
        return updatedJob;
      });

      return result;
    } catch (error) {
      console.log("transactin rolled back");
      throw error;
    }
  }

  async getJobById(id: number): Promise<JobOutput> {
    try {
      const job = await Job.findByPk(id);
      if (!job) {
        throw new Error("job not found");
      }
      return job;
    } catch (error) {
      console.error('error fetching job:', error);
      throw error;
    }
  }

  async deleteJobById(id: number): Promise<boolean> {
    try {
      const deletedJobCount = await Job.destroy({
        where: { id },
      });
      return !!deletedJobCount;
    } catch (error) {
      console.error('error deleting job:', error);
      throw error;
    }
  }

  async getAllJobs(): Promise<JobOutput[]> {
    try {
      return await Job.findAll();
    } catch (error) {
      console.error('error fetching jobs:', error);
      throw error;
    }
  }
};
