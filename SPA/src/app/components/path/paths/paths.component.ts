import {Component, OnInit} from '@angular/core';

import {Path} from '../../../domain/path';
import {PathService} from '../../../services/path.service';
import {Observable} from "rxjs";
import {parseFieldArrayValue} from "@angular/compiler-cli/src/ngtsc/annotations/directive";

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.css']
})
export class PathsComponent implements OnInit {
  pathsOriginal: Path[] = [];
  paths: Path[] = [];
  pages: number = 1;
  currentPage: number = 0;
  result: any = [];
  departureFilter!: any;
  arrivalFilter!: any;
  entity: string = "Path"
  color: string = "warning"
  labels: string[] = [
    "Path Id",
    "Departure",
    "Arrival",
    "Distance",
    "Duration",
    "Consumed Energy",
  ]
  props: string[] = [
    "id",
    "departureWarehouse",
    "arrivalWarehouse",
    "distance",
    "duration",
    "consumedEnergy",
  ]

  constructor(private pathService: PathService) {
  }

  ngOnInit(): void {
    this.getPaths();
    this.paginate(5,0)
  }

  getPaths(): void {
    this.pathService.getPaths()
      .subscribe(paths => this.paths = paths);

    this.pathService.getPaths()
      .subscribe(paths => this.pathsOriginal = paths);
  }

  add = (args: any): void => {
    this.pathService.addPath(args)
      .subscribe(path => {
        if (path !== undefined) {
          this.paths.push(path);
        }
      });
    /*

    }
      delete(path: Path): void {
      this.paths = this.paths.filter(h => h !== path);
      this.pathService.deletePath(path.id).subscribe();
    }
     */
  }


  paginate = (nResults: number, page: number): void => {
    let paginatePaths = this.pathService.paginatePaths(nResults, page);
    if(paginatePaths !== undefined) {
      paginatePaths.subscribe((res) => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        this.paths = resJSON.paths
        this.pages = +resJSON.pages
      })
    }
  }

  anotherPage = (nResults: number, page:number): void => {
    this.currentPage = page-1
    this.paginate(nResults, page)
  }

  goPagesDefault = (): void => {
    this.currentPage=0
    this.pages=1
  }

  search = (args: any): Observable<Path[]> => {
    this.goPagesDefault()
    return this.pathService.searchPath(args);
  }

  searchDepartureWarehouse = (args: any): Observable<Path[]> => {
    this.goPagesDefault()
    this.departureFilter = args
    if (this.paths !== this.pathsOriginal && this.arrivalFilter != undefined && !this.arrivalFilter.includes("Filter")) {
      return this.pathService.searchDepartureArrivalWarehouse(this.departureFilter, this.arrivalFilter);
    } else {
      return this.pathService.searchDepartureWarehouse(args);
    }
  }

  searchArrivalWarehouse = (args: any): Observable<Path[]> => {
    this.goPagesDefault()
    this.arrivalFilter = args
    if (this.paths.length !== this.pathsOriginal.length && this.departureFilter != undefined && !this.departureFilter.includes("Filter")) {
      return this.pathService.searchDepartureArrivalWarehouse(this.departureFilter, this.arrivalFilter);
    } else {
      return this.pathService.searchArrivalWarehouse(args);
    }
  }

  GetChildData(data: any) {
    this.paths = data
  }
}
