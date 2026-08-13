import { describe, it, expect } from "vitest";
import { getAPIKey } from "../auth.js";

describe("getAPIKey", () => {
  it("should return null when authorization header is missing", () => {
    const headers = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return the API key when authorization header is valid", () => {
    const headers = { authorization: "ApiKey my-secret-key" };
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  it("should return null when authorization header doesn't start with 'ApiKey'", () => {
    const headers = { authorization: "Bearer my-secret-key" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null when authorization header has only one part", () => {
    const headers = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return the token when there are multiple spaces", () => {
    const headers = { authorization: "ApiKey my-secret-key extra-data" };
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  it("should return null when authorization header is empty string", () => {
    const headers = { authorization: "" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should be case-sensitive for 'ApiKey' prefix", () => {
    const headers = { authorization: "apikey my-secret-key" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should handle authorization header with just whitespace after ApiKey", () => {
    const headers = { authorization: "ApiKey " };
    expect(getAPIKey(headers)).toBe("");
  });
});
