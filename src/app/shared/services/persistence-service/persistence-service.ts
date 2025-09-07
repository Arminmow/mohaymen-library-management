import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  private storage = localStorage;

  save(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }
}
