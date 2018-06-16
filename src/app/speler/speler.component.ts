import { Component, OnInit } from '@angular/core';
import { Poolgast } from '../shared/poolgast.model'
import { Spellen } from '../shared/spellen.model'

@Component({
  selector: 'app-speler',
  templateUrl: './speler.component.html',
  styleUrls: ['./speler.component.css']
})
export class SpelerComponent implements OnInit {
  name: string = '';
  poolgast: Poolgast[] = [];
  spellen: Spellen[] = [];
  constructor() {
  }

  onUpdateSpeler(event: any) {
    //console.log(event);
    this.name = (<HTMLInputElement>event.target).value;
  }

  onCreateSpeler() {
    //console.log('Start');

    //console.log('naam is: ' + this.name);
    // new Poolgast(this.name);
    this.poolgast.push(new Poolgast(this.name));
    this.name = null;
  };

  onDeleteSpelers() {
    this.onDeleteSpel();
    var i: number = this.poolgast.length;
    while (i > 0) {
      //console.log('weggooien ' + i);
      this.poolgast.splice(i - 1, 1);
      i = this.poolgast.length;

    }
  }

  onDeleteSpel() {

    var i: number = this.spellen.length;
    while (i > 0) {
      this.spellen.splice(i - 1, 1);
      i = this.spellen.length;

    }
  }

  onCreateList() {
    // Eerst schonen
    this.onDeleteSpelers();
    // Nu opnieuw aanmaken met basis spelers

    this.poolgast.push(new Poolgast('Udo'));
    this.poolgast.push(new Poolgast('Chris'));
    this.poolgast.push(new Poolgast('Hendrik-Jan'));
    this.poolgast.push(new Poolgast('Pieter'));
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
  }

  onCreateGame() {
    // we beginnen met een schoon spel
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

    // // debug om te kijken wat het is geworden
    // this.spellen.forEach(element => {
    //   console.log('beurtnummer: ' + element.beurtnummer +
    //     ' break: ' +
    //     element.nameBreak +
    //     ' tegen: ' + element.tegen);
    // }
    // );

  }


  ngOnInit() {
  }

}
