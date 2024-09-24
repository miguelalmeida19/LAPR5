import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {Package} from "../../../domain/package";
import {PackageService} from "../../../services/package.service";

@Component({
  selector: 'app-package-search',
  templateUrl: './package-search.component.html',
  styleUrls: ['./package-search.component.css']
})
export class PackageSearchComponent implements OnInit {

  @Input()
  color: string | undefined

  packages$!: Observable<Package[]>;
  private searchTerms = new Subject<string>();

  @Output()
  outputPackages:EventEmitter<Package[]> = new EventEmitter<Package[]>();

  constructor(private packageService: PackageService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.packages$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.packageService.searchPackage(term)),
    );
    this.packages$.subscribe(packages => this.outputPackages.emit(packages));
  }

}
