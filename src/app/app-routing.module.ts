import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceComponent } from './race/race.component';
import { RaceFormComponent } from './race-form/race-form.component';

const routes: Routes = [
  { path: 'race', component: RaceComponent },
  { path: 'race/form', component: RaceFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
