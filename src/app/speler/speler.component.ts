import { Component, OnInit } from '@angular/core';
import { Poolgast } from '../shared/poolgast.model'
import { Spellen } from '../shared/spellen.model'
import { SpelerService } from './speler.service';
import { SpellenService } from './spellen.service';

@Component({
  selector: 'app-speler',
  templateUrl: './speler.component.html',
  styleUrls: ['./speler.component.css']
})
export class SpelerComponent implements OnInit {
  name: string = '';
  spelerservice = new SpelerService();
  spellenservice = new SpellenService();
  poolgast: Poolgast[] = this.spelerservice.getPoolgasten();
  spellen: Spellen[] = this.spellenservice.getSpelen();
  spelleeg: boolean = true;
  toggleheader: boolean = true;
  constructor() {
  }

  toggleHeader(){
    this.toggleheader = !this.toggleheader;
  }

  onUpdateSpeler(event: any) {
    //console.log(event);
    this.name = (<HTMLInputElement>event.target).value;
  }

  onCreateSpeler() {
    //console.log('Start');

    //console.log('naam is: ' + this.name);
    // new Poolgast(this.name);
    //this.poolgast.push(new Poolgast(this.name));
    this.spelerservice.addPoolgast(this.name);
    this.name = null;
    this.poolgast = this.spelerservice.getPoolgasten();
  };

  onDeleteSpelers() {
    this.onDeleteSpel();
    var i: number = this.poolgast.length;
    while (i > 0) {
      //console.log('weggooien ' + i);
      this.poolgast.splice(i - 1, 1);
      i = this.poolgast.length;
    }
    this.spelerservice.setPoolgasten(this.poolgast);
  }

  onDeleteSpel() {

    var i: number = this.spellen.length;
    while (i > 0) {
      this.spellen.splice(i - 1, 1);
      i = this.spellen.length;
    }
    this.spelleeg = true;
    this.spellenservice.setSpelen(this.spellen);
  }

  onCreateList() {
    // Eerst schonen
    this.onDeleteSpelers();
    // Nu opnieuw aanmaken met basis spelers
    this.spelerservice.addPoolgast('Udo');
    this.spelerservice.addPoolgast('Chris');
    this.spelerservice.addPoolgast('Hendrik-Jan');
    this.spelerservice.addPoolgast('Pieter');
    this.poolgast = this.spelerservice.getPoolgasten();
  }

  remove(name: string) {
    var i: number = 0;
    this.poolgast.forEach(element => {
      if (element.name === name) {
        this.poolgast.splice(i, 1);
      }
      i++;
    }
    );
    this.spelerservice.setPoolgasten(this.poolgast);
  }

  getPermutations(array, size) {

    function p(t, i) {
      if (t.length === size) {
        result.push(t);
        return;
      }
      if (i + 1 > array.length) {
        return;
      }
      p(t.concat(array[i]), i + 1);
      p(t, i + 1);
    }

    var result = [];
    p([], 0);
    return result;
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  onReShuffle() {
    this.spellen = this.shuffle(this.spellen);
    this.spellenservice.setSpelen(this.spellen);
  }

  newSpel() { // we beginnen met een schoon spel
    this.onDeleteSpel();

    var combinaties = this.getPermutations(this.poolgast, 2);
    var beurtteller: number = 1;
    combinaties.forEach(element => {
      // console.log(element[0].name + ' break tegen ' + element[1].name);

      this.spellen.push(new Spellen(beurtteller, element[0].name, element[1].name));

      beurtteller++;

      this.spellen.push(new Spellen(beurtteller, element[1].name, element[0].name));
      beurtteller++;
    }
    );

    // debug om te kijken wat het is geworden
    // this.spellen.forEach(element => {
    //   console.log('beurtnummer: ' + element.beurtnummer +
    //     ' break: ' +
    //     element.nameBreak +
    //     ' tegen: ' + element.tegen);
    // }
    // );

    this.spellen = this.shuffle(this.spellen);
    this.spellenservice.setSpelen(this.spellen);
    this.spelleeg = false;
    // // debug om te kijken wat het is geworden
    // this.spellen.forEach(element => {
    //   console.log('beurtnummer: ' + element.beurtnummer +
    //     ' break: ' +
    //     element.nameBreak +
    //     ' tegen: ' + element.tegen);
    // }
    // );
  }

  onCreateGame() {
    if (this.spelleeg) {
      this.newSpel();
    } else {
      if (confirm("Weet je zeker dat je een nieuwe game wil genereren?")) {
        this.newSpel();
      }
    }
  }
  ngOnInit() {
  }

}
