import { describe, it, expect, beforeEach, vi } from "vitest";
import { getDogImage } from "../controllers/dogController";
import * as dogService from "../services/dogService";

vi.mock("../services/dogService");

describe("dogController", () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRequest = {};

    mockResponse = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
    };
  });

  it("should return JSON with success true and mocked data from service", async () => {
    const mockDogData = {
      imageUrl: "https://images.dog.ceo/breeds/stbernard/m02109525_15579.jpg",
      status: "success",
    };

    vi.mocked(dogService.getRandomDogImage).mockResolvedValue(mockDogData);

    await getDogImage(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      data: mockDogData,
    });
  });
});