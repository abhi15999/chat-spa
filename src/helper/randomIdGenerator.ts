import crypto from "crypto";
/**
 * Creates a unique and random 16 bits string, using crypto library
 * @returns {string} Random string of 16 bits
 */
export const randIdGen = (): string => crypto.randomBytes(16).toString("hex");