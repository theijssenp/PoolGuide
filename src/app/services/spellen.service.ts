import { Injectable } from '@angular/core';
import { Spellen, createSpellen } from '../shared/spellen.model';

@Injectable({
  providedIn: 'root'
})
export class SpellenService {
  private nextId: number = 0;

  constructor() {
    const spellen = this.getSpelen();
    if (spellen.length > 0) {
      this.nextId = spellen[spellen.length - 1].id + 1;
    }
  }

  addSpel(nameBreak: string, tegen: string): void {
    const spel = createSpellen(this.nextId, nameBreak, tegen);
    const spellen = this.getSpelen();
    spellen.push(spel);
    this.setLocalStorageSpelen(spellen);
    this.nextId++;
  }

  getSpelen(): Spellen[] {
    const stored = localStorage.getItem('spellen');
    if (!stored) {
      return [];
    }
    const parsed = JSON.parse(stored);
    return parsed.spellen ?? [];
  }

  setSpelen(spellen: Spellen[]): void {
    this.setLocalStorageSpelen(spellen);
  }

  removeSpel(id: number): void {
    let spellen = this.getSpelen();
    spellen = spellen.filter(spel => spel.id !== id);
    this.setLocalStorageSpelen(spellen);
  }

  private setLocalStorageSpelen(spellen: Spellen[]): void {
    localStorage.setItem('spellen', JSON.stringify({ spellen }));
  }
}