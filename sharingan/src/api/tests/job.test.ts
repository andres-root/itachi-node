import request from "supertest";

import { getApp } from "../../app";


const app = getApp();

describe("Test / ", () => {
  test("Catch-all route", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ message: "It works!" });
  });
});
