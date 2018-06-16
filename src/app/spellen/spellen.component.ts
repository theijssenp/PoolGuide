import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spellen',
  templateUrl: './spellen.component.html',
  styleUrls: ['./spellen.component.css']
})
export class SpellenComponent implements OnInit {
 @Input() spel: {beurtnummer: number,  nameBreak: string,  tegen: string};
  constructor() { }

  ngOnInit() {
  }

}
