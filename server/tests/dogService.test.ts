import { describe, it, expect, beforeEach, vi } from "vitest";
import { getRandomDogImage } from "../services/dogService";

describe("dogService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should return imageurl and status success", async () => {
    const mockResponse = {
      message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success",
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockResponse.message);
    expect(result.status).toBe("success");
    expect(global.fetch).toHaveBeenCalledOnce();
  });
  it("should return ok: false and status 500", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(getRandomDogImage()).rejects.toThrow();
    await expect(getRandomDogImage()).rejects.toThrow(
      "Dog API returned status 500",
    );
  });
});