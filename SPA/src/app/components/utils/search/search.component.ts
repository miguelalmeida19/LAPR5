import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, map, switchMap
} from 'rxjs/operators';

import { Path } from '../../../domain/path';
import { PathService } from '../../../services/path.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
})
export class SearchComponent implements OnInit {

  @Input()
  callbackFunction!: ((search: string) => Observable<any>);

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
}
