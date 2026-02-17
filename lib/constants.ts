/**
 * Application constants - centralized config for API and env.
 */

export const API_BASE_URL =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"
    : "";

export const SOCKET_URL =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000"
    : "";
