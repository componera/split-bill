/**
 * Unit tests for auth utilities
 * Note: These run in Happy DOM which provides window/localStorage
 */
import { describe, it, expect, beforeEach } from "bun:test";
import { getToken, setToken, logout, getUser } from "./auth";

describe("auth", () => {
  beforeEach(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.clear();
    }
  });

  describe("getToken", () => {
    it("returns null when no token is set", () => {
      expect(getToken()).toBeNull();
    });

    it("returns token when set", () => {
      setToken("my-jwt-token");
      expect(getToken()).toBe("my-jwt-token");
    });
  });

  describe("setToken", () => {
    it("stores token in localStorage", () => {
      setToken("new-token");
      expect(getToken()).toBe("new-token");
    });
  });

  describe("getUser", () => {
    it("returns null when no token", () => {
      expect(getUser()).toBeNull();
    });
  });
});
