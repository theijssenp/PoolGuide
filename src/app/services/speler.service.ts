import { Injectable } from '@angular/core';
import { Poolgast, createPoolgast } from '../shared/poolgast.model';

@Injectable({
  providedIn: 'root'
})
export class SpelerService {
  private nextId: number = 0;

  constructor() {
    const poolgasten = this.getPoolgasten();
    if (poolgasten.length > 0) {
      this.nextId = poolgasten[poolgasten.length - 1].id + 1;
    }
  }

  addPoolgast(name: string): void {
    const poolgast = createPoolgast(this.nextId, name);
    const poolgasten = this.getPoolgasten();
    poolgasten.push(poolgast);
    this.setLocalStoragePoolgasten(poolgasten);
    this.nextId++;
  }

  getPoolgasten(): Poolgast[] {
    const stored = localStorage.getItem('poolgasten');
    if (!stored) {
      return [];
    }
    const parsed = JSON.parse(stored);
    return parsed.poolgasten ?? [];
  }

  setPoolgasten(poolgasten: Poolgast[]): void {
    this.setLocalStoragePoolgasten(poolgasten);
  }

  removePoolgast(id: number): void {
    let poolgasten = this.getPoolgasten();
    poolgasten = poolgasten.filter(poolgast => poolgast.id !== id);
    this.setLocalStoragePoolgasten(poolgasten);
  }

  private setLocalStoragePoolgasten(poolgasten: Poolgast[]): void {
    localStorage.setItem('poolgasten', JSON.stringify({ poolgasten }));
  }
}