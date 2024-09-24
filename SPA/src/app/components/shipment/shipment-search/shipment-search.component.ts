import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


import {Shipment} from "../../../domain/shipment";
import {ShipmentService} from "../../../services/shipment.service";

@Component({
  selector: 'app-shipment-search',
  templateUrl: './shipment-search.component.html',
  styleUrls: ['./shipment-search.component.css']
})
export class ShipmentSearchComponent implements OnInit {

  @Input()
  color: string | undefined

  shipments$!: Observable<Shipment[]>;
  private searchTerms = new Subject<string>();

  @Output()
  outputShipments:EventEmitter<Shipment[]> = new EventEmitter<Shipment[]>();

  constructor(private shipmentService: ShipmentService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.shipments$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.shipmentService.searchShipment(term)),
    );
    this.shipments$.subscribe(shipments => this.outputShipments.emit(shipments));
  }

}
