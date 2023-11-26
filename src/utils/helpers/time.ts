export function getTimeUntilTheEndOfTheDay(): Date {
    const expirationTime = new Date();
    expirationTime.setHours(23, 59, 0, 0);
    return expirationTime;
  }