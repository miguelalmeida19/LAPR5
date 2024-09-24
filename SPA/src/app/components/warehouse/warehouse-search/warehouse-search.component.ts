import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Warehouse} from "../../../domain/warehouse";
import { WarehouseService} from "../../../services/warehouse.service";

@Component({
  selector: 'app-warehouse-search',
  templateUrl: './warehouse-search.component.html',
  styleUrls: [ './warehouse-search.component.css']
})

export class WarehouseSearchComponent implements OnInit{
  warehouses$!: Observable<Warehouse[]>;
  private searchTerms = new Subject<string>();

  constructor(private warehouseService: WarehouseService) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.warehouses$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.warehouseService.searchWarehouse(term)),
    );
  }
}
