import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpelerComponent } from './speler/speler.component';
import { HeaderComponent } from './header/header.component';
import { SpellenComponent } from './spellen/spellen.component';

@NgModule({
  declarations: [
    AppComponent,
    SpelerComponent,
    HeaderComponent,
    SpellenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
