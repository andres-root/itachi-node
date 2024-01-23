import { Op } from 'sequelize';

import { Job } from "..";
import { JobInput, JobOutput } from "../job";
import db from "../../../config/db/db";
import sequelize from 'sequelize';


export const createJob = async (job: JobInput): Promise<JobOutput> => {
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
};

export const updateJob = async (id: number, payload: Partial<JobInput>): Promise<JobOutput> => {
  const job = await Job.findByPk(id);
  if (!job) {
    throw new Error("job not found");
  }
  const updatedJob = await (job as Job).update(payload);
  return updatedJob;
};

export const getJobById = async (id: number): Promise<JobOutput> => {
  const job = await Job.findByPk(id);
  if (!job) {
    // TODO: throw custom error
    throw new Error("job not found");
  }
  return job;
};

export const deleteJobById = async (id: number): Promise<boolean> => {
  const deletedJobCount = await Job.destroy({
    where: { id },
  });
  return !!deletedJobCount;
};

export const getAllJobs = async (): Promise<JobOutput[]> => {
  try {
    return await Job.findAll();
  } catch (error) {
    console.error('error fetching jobs:', error);
    throw error;
  }
};
