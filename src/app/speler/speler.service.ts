import { Injectable } from '@angular/core';
import { Poolgast } from '../shared/poolgast.model';

@Injectable()
export class SpelerService {
    private poolgasten: Poolgast[];
    private nextId: number;
    constructor() {
        let poolgasten = this.getPoolgasten;

        if (poolgasten.length == 0) {
            this.nextId = 0;
        } else {
            let maxId = poolgasten[poolgasten.length].id - 1;
        }
    }

    public addPoolgast(name: string) {
        let poolgast = new Poolgast(this.nextId, name);
        let poolgasten = this.getPoolgasten();
        poolgasten.push(poolgast);

        this.setLocalStoragePoolgasten(poolgasten);
        this.nextId++;
    }

    public getPoolgasten(): Poolgast[] {
        let localStoragePoolgast = JSON.parse(localStorage.getItem('poolgasten'));
        return localStoragePoolgast == null ? [] : localStoragePoolgast.poolgasten;
    }

    public setPoolgasten(poolgasten: Poolgast[] ){
        this.setLocalStoragePoolgasten(poolgasten);
    }
    public removePoolgast(id: number): void {
        let poolgasten = this.getPoolgasten();
        poolgasten = poolgasten.filter((poolgast) => poolgast.id != id);
    }

    private setLocalStoragePoolgasten(poolgasten: Poolgast[]): void {
        localStorage.setItem('poolgasten', JSON.stringify({ poolgasten: poolgasten }));
    }
}

