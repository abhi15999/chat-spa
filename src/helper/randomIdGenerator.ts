/**
 * Creates a unique and random string
 * @returns {string} Random userId
 */
export const randIdGen = (): string => Math.random().toString(36).slice(2);