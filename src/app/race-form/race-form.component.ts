import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Race } from '../race';
import { RaceService } from '../services/race.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-race-form',
  templateUrl: './race-form.component.html',
  styleUrls: ['./race-form.component.css']
})
export class RaceFormComponent implements OnInit, OnDestroy {
  isCreate: boolean = false;
  isUpdate: boolean = false;
  raceId: number = 0;

  race: Race = { id: 0, raceName: "", raceDate: new Date(), circuitId: 0, teamId: 0 };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  race$: Subscription = new Subscription();
  createRace$: Subscription = new Subscription();
  updateRace$: Subscription = new Subscription();

  constructor(private router: Router, private raceService: RaceService) {
    this.isCreate = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'create';
    this.isUpdate = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'update';
    this.raceId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isCreate && !this.isUpdate) {
      this.isCreate = true;
    }

    // if (this.raceId != null && this.raceId > 0) {
    //   this.race$ = this.raceService.getRaceById(this.raceId).subscribe(result => this.race = result);
    // }

    if (this.raceId != null && this.raceId > 0) {
      this.race$ = this.raceService.getRaceById(this.raceId).subscribe(result => {
        // Handle the case where the API returns an array of races
        if (Array.isArray(result)) {
          if (result.length > 0) {
            this.race = result[0]; // Take the first race from the array
          } else {
            // Handle the case where no race is found with the given ID
          }
        } else {
          this.race = result; // The API returned a single race
        }
      });
    }

  }

  ngOnInit(): void {
    console.log('RaceFormComponent initialized');
  }

  ngOnDestroy(): void {
    this.race$.unsubscribe();
    this.createRace$.unsubscribe();
    this.updateRace$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isCreate) {
      this.createRace$ = this.raceService.postRace(this.race).subscribe({
        next: (v) => this.router.navigateByUrl("/race"),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isUpdate) {
      this.updateRace$ = this.raceService.updateRace(this.raceId, this.race).subscribe({
        next: (v) => this.router.navigateByUrl("/race"),
        error: (e) => this.errorMessage = e.message
      });
    }
  }
}
