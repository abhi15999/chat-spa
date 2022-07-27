import { MOBILE_PATTERN } from "../constants/patterns";

let regexp = new RegExp(MOBILE_PATTERN);

export const mobileValid = (mobile: string): boolean => regexp.test(mobile);

