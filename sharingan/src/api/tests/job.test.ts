import request from "supertest";

import { getApp } from "../../app";
import db from "../../config/db/db";
import dbInit from "../../config/db/init";
import Job, { JobOutput } from "../../api/models/job";
import { JOB_ONE, JOB_TWO } from "./mocks/jobs";


describe('Job Model tests', () => {
  beforeAll(async () => {
    await db.sync({ force: true }); // This will use the test configuration
  });

  it('Should create a job', async () => {
    const job = await Job.create(JOB_ONE);
    expect(job.id).toEqual(1);
    expect(job.title).toEqual(JOB_ONE.title);
  });

  afterAll(async () => {
    await db.close();
  });
});
