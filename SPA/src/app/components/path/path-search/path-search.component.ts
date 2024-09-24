import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, map, switchMap
} from 'rxjs/operators';

import { Path } from '../../../domain/path';
import { PathService } from '../../../services/path.service';

@Component({
  selector: 'app-path-search',
  templateUrl: './path-search.component.html',
  styleUrls: [ './path-search.component.css' ]
})
export class PathSearchComponent implements OnInit {

  @Input()
  color: string | undefined

  paths$!: Observable<Path[]>;
  private searchTerms = new Subject<string>();

  @Output()
  outputPaths:EventEmitter<Path[]> = new EventEmitter<Path[]>();

  constructor(private pathService: PathService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.paths$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(100),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.pathService.searchPath(term))
    );

    this.paths$.subscribe(paths => this.outputPaths.emit(paths))
  }
}
