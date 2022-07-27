import { EMAIL_PATTERN } from "../constants/patterns";

let regex = new RegExp(EMAIL_PATTERN);

export const emailValid = (email: string): boolean => regex.test(email);