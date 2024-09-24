import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Path } from '../../../domain/path';

@Component({
  selector: 'filter-component',
  templateUrl: './filter.component.html',
  styleUrls: [ './filter.component.css' ],
})
export class FilterComponent implements OnInit {

  @Input()
  callbackFunction!: ((search: string) => Observable<any>);

  @Input()
  listOfObjects: any[] | undefined;

  @Input()
  numberOfParameter!: number;

  @Input()
  filter: string | undefined

  @Input()
  icon: string | undefined

  @Input()
  color: string | undefined

  list$!: Observable<any[]>;
  private searchTerms = new Subject<string>();

  @Output()
  outputList:EventEmitter<Path[]> = new EventEmitter<Path[]>();

  constructor() {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.list$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(100),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.callbackFunction(term))
    );

    this.list$.subscribe(paths => this.outputList.emit(paths))
  }

  unsorted(a: any, b: any): number { return 0; }
}
