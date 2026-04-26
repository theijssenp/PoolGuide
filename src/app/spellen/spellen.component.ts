import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Spellen } from '../shared/spellen.model';

@Component({
  selector: 'app-spellen',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './spellen.component.html',
  styleUrl: './spellen.component.css'
})
export class SpellenComponent {
  @Input() spel!: Spellen;
  selected = false;
}