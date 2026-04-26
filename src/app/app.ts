import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SpelerComponent } from './speler/speler.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SpelerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Pool Guide';
}