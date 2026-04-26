import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Poolgast } from '../shared/poolgast.model';
import { Spellen, createSpellen } from '../shared/spellen.model';
import { SpelerService } from '../services/speler.service';
import { SpellenService } from '../services/spellen.service';
import { SpellenComponent } from '../spellen/spellen.component';

@Component({
  selector: 'app-speler',
  standalone: true,
  imports: [FormsModule, SpellenComponent],
  templateUrl: './speler.component.html',
  styleUrl: './speler.component.css'
})
export class SpelerComponent implements OnInit {
  name = '';
  poolgast: Poolgast[] = [];
  spellen: Spellen[] = [];
  spelleeg = true;
  toggleheader = true;

  constructor(
    private spelerService: SpelerService,
    private spellenService: SpellenService
  ) {}

  ngOnInit(): void {
    this.poolgast = this.spelerService.getPoolgasten();
    this.spellen = this.spellenService.getSpelen();
    this.spelleeg = this.spellen.length === 0;
  }

  onCreateSpeler(): void {
    this.spelerService.addPoolgast(this.name);
    this.name = '';
    this.poolgast = this.spelerService.getPoolgasten();
  }

  onDeleteSpelers(): void {
    this.onDeleteSpel();
    this.poolgast = [];
    this.spelerService.setPoolgasten(this.poolgast);
  }

  onDeleteSpel(): void {
    this.spellen = [];
    this.spelleeg = true;
    this.spellenService.setSpelen(this.spellen);
  }

  onCreateList(): void {
    this.onDeleteSpelers();
    this.spelerService.addPoolgast('Udo');
    this.spelerService.addPoolgast('Chris');
    this.spelerService.addPoolgast('Hendrik-Jan');
    this.spelerService.addPoolgast('Pieter');
    this.poolgast = this.spelerService.getPoolgasten();
  }

  remove(name: string): void {
    this.poolgast = this.poolgast.filter(p => p.name !== name);
    this.spelerService.setPoolgasten(this.poolgast);
  }

  private getPermutations(array: Poolgast[], size: number): Poolgast[][] {
    const result: Poolgast[][] = [];
    function permute(t: Poolgast[], i: number): void {
      if (t.length === size) {
        result.push(t);
        return;
      }
      if (i + 1 > array.length) {
        return;
      }
      permute(t.concat([array[i]]), i + 1);
      permute(t, i + 1);
    }
    permute([], 0);
    return result;
  }

  private shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    let currentIndex = arr.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr;
  }

  onReShuffle(): void {
    this.spellen = this.shuffle(this.spellen);
    this.spellenService.setSpelen(this.spellen);
  }

  private newSpel(): void {
    this.onDeleteSpel();
    const combinaties = this.getPermutations(this.poolgast, 2);
    let beurtteller = 1;
    const newSpellen: Spellen[] = [];
    combinaties.forEach(element => {
      newSpellen.push(createSpellen(beurtteller, element[0].name, element[1].name));
      beurtteller++;
      newSpellen.push(createSpellen(beurtteller, element[1].name, element[0].name));
      beurtteller++;
    });
    this.spellen = this.shuffle(newSpellen);
    this.spellenService.setSpelen(this.spellen);
    this.spelleeg = false;
  }

  onCreateGame(): void {
    if (this.spelleeg) {
      this.newSpel();
    } else {
      if (confirm('Weet je zeker dat je een nieuwe game wil genereren?')) {
        this.newSpel();
      }
    }
  }

  toggleHeader(): void {
    this.toggleheader = !this.toggleheader;
  }
}