/**
 * Test setup - extends Bun's expect with Testing Library matchers
 * and runs cleanup after each test.
 */
import { afterEach, expect } from "bun:test";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
