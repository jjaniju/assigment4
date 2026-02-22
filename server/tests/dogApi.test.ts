import { describe, it, expect, beforeEach, vi } from "vitest";
import express from "express";
import request from "supertest";
import dogRoutes from "../routes/dogRoutes";
import * as dogService from "../services/dogService";

vi.mock("../services/dogService");

describe("Dog API Routes", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use("/api/dogs", dogRoutes);
    vi.clearAllMocks();
  });

  it("should return status 200, success true and image url", async () => {
    const mockImageUrl =
      "https://images.dog.ceo/breeds/stbernard/m02109525_15579.jpg";
    const mockDogData = {
      imageUrl: mockImageUrl,
      status: "success",
    };

    vi.mocked(dogService.getRandomDogImage).mockResolvedValue(mockDogData);

    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toContain(mockImageUrl);
  });
  it("should return status 500 and error on dogs/random", async () => {
    const mockError = "Failed to fetch dog image: Network error";
    vi.mocked(dogService.getRandomDogImage).mockRejectedValue(
      new Error(mockError),
    );

    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
    expect(response.body.success).toBe(false);
  });
});