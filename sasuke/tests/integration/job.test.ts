import { agent as supertestRequest } from "supertest";

import { getExpressApp } from "../../src/adapters/input/rest";
import db from "../../src/adapters/output/db/db";
import Job from "../../src/core/models/job";
import { JOB_ONE, JOB_TWO } from "../mocks/jobs";


const request = supertestRequest(getExpressApp());

describe('Job Routes tests', () => {
  beforeAll(async () => {
    await db.sync({ force: true }); // This will use the test configuration
    await Job.create(JOB_ONE);
    await Job.create(JOB_TWO);
  });

  it('should GET all jobs /api/v1/jobs', async () => {
    const response = await request.get('/api/v1/jobs');

    expect(response.ok).toEqual(true);
    expect(response.body.data.length).toEqual(2);
  });

  it('should GET a job by id /api/v1/jobs/:id', async () => {
    const response = await request.get('/api/v1/jobs/1');

    expect(response.ok).toEqual(true);
    expect(response.body.data.id).toEqual(1);
  });

  it('should POST a job /api/v1/jobs', async () => {
    const response = await request.post('/api/v1/jobs').send(JOB_ONE);

    expect(response.ok).toEqual(true);
    expect(response.body.data.id).toEqual(3);
  });

  it('should PUT a job /api/v1/jobs/:id', async () => {
    const response = await request.put('/api/v1/jobs/1').send({ title: 'New Title' });

    expect(response.ok).toEqual(true);
    expect(response.body.data.title).toEqual('New Title');
  });

  it('should DELETE a job /api/v1/jobs/:id', async () => {
    const response = await request.delete('/api/v1/jobs/1');
    expect(response.ok).toEqual(true);
  });

  afterAll(async () => {
    await db.close();
  });
});
