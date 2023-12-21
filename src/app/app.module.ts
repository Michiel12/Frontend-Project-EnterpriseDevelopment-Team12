import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudComponent } from './crud/crud.component';
import { RaceComponent } from './race/race.component';
import { RaceFormComponent } from './race-form/race-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RaceFormComponent
  ],
  imports: [
    BrowserModule,
    CrudComponent,
    RaceComponent,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
