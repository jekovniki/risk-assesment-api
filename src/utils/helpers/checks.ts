
export function isObjectOfType<T>(obj: any, type: Record<keyof T, any>): obj is T {
    for (const key in type) {
      if (obj[key] === undefined || typeof obj[key] !== typeof type[key]) {
        return false;
      }
    }
    return true;
  }