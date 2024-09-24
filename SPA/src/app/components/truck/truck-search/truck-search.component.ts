import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Truck } from '../../../domain/truck';
import { TruckService } from '../../../services/truck.service';

@Component({
  selector: 'app-truck-search',
  templateUrl: './truck-search.component.html',
  styleUrls: [ './truck-search.component.css' ]
})
export class TruckSearchComponent implements OnInit {
  trucks$!: Observable<Truck[]>;
  private searchTerms = new Subject<string>();

  constructor(private truckService: TruckService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.trucks$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.truckService.searchTruck(term)),
    );
  }
}
