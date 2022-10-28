export class LocalCache<T> {
  private values: Map<string, T> = new Map<string, T>();

  public hasItem(key: string): boolean {
    return this.values.has(key);
  }

  public getItem(key: string): T | null {
    if (!this.hasItem(key)) {
      return null;
    }
    return this.values.get(key) as T;
  }

  public setItem(key: string, value: T) {
    this.values.set(key, value);
  }
}

// localstorage cache for development
let prefix = "swApi:";
export class LocalStorageCache<T> {
  public hasItem(key: string): boolean {
    return !!localStorage.getItem(`${prefix}${key}`);
  }

  public getItem(key: string): T | null {
    const value = localStorage.getItem(`${prefix}${key}`);
    if (!value) return null;
    return JSON.parse(value) as T;
  }

  public setItem(key: string, value: T) {
    return localStorage.setItem(`${prefix}${key}`, JSON.stringify(value)) as T;
  }
}
