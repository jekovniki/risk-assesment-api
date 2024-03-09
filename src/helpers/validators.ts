import { UNDEFINED_ENVIRONMENT_VARIABLE } from "../utils/constants/errors";

export function validateEnvironmentVariable(variable: string | undefined): string {
    if (typeof variable === 'undefined') {
      throw new Error(UNDEFINED_ENVIRONMENT_VARIABLE);
    }
    return variable;
  }