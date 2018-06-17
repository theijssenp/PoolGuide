import { Injectable } from '@angular/core';
import { Spellen } from '../shared/spellen.model';

@Injectable()
export class SpellenService {
    private spellen: Spellen[];
    private nextId: number;
    constructor() {
        let spellen = this.getSpelen;

        if (spellen.length == 0) {
            this.nextId = 0;
        } else {
            let maxId = spellen[spellen.length].id - 1;
        }
    }

    public addSpel( nameBreak: string,  tegen: string) {

        let spel = new Spellen(this.nextId, nameBreak, tegen);
        let spellen= this.getSpelen();
        spellen.push(spel);

        this.setLocalStorageSpelen(spellen);
        this.nextId++;
    }

    public getSpelen(): Spellen[] {
        let localStorageSpel = JSON.parse(localStorage.getItem('spellen'));
        return localStorageSpel == null ? [] : localStorageSpel.spellen;
    }

    public setSpelen(spellen: Spellen[] ){
        this.setLocalStorageSpelen(spellen);
    }
    public removeSpel(id: number): void {
        let spellen = this.getSpelen();
        spellen = spellen.filter((spel) => spel.id != id);
    }

    private setLocalStorageSpelen(spellen: Spellen[]): void {
        localStorage.setItem('spellen', JSON.stringify({ spellen: spellen }));
    }
}

