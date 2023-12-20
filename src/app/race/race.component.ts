import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Race } from '../race';
import { RaceService } from '../services/race.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-race',
  standalone: true,
  imports: [CommonModule, RaceComponent],
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {
  //races$: Observable<Race[]> = new Observable<Race[]>();
  races: Race[] = [];
  races$: Subscription = new Subscription();
  deleteRace$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private raceService: RaceService, private router: Router) { }

  ngOnInit(): void {
    //this.races$ = this.raceService.getAllRaces();
    this.getAllRaces();
  }

  create() {
    // BESTAAT NOG NIET
    //Navigate to form in add mode
    this.router.navigate(['admin/race/form'], { state: { mode: 'add' } });
  }

  update(id: number) {
    // BESTAAT NOG NIET
    //Navigate to form in edit mode
    this.router.navigate(['admin/race/form'], { state: { id: id, mode: 'edit' } });
  }

  delete(id: number) {
    this.deleteRace$ = this.raceService.deleteRace(id).subscribe({
      next: (v) => this.getAllRaces(),
      error: (e) => this.errorMessage = e.message
    });
  }

  ngOnDestroy(): void {
    this.races$.unsubscribe();
    this.deleteRace$.unsubscribe();
  }

  getAllRaces() {
    this.races$ = this.raceService.getAllRaces().subscribe(result => this.races = result);
  }
}
