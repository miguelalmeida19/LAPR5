import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { Path } from '../../../domain/path';
import { PathService } from '../../../services/path.service';

@Component({
  selector: 'app-path-detail',
  templateUrl: './path-detail.component.html',
  styleUrls: [ './path-detail.component.css' ]
})
export class PathDetailComponent implements OnInit {
  path: Path | undefined;
  props : String[] = [
    "id",
    "departureWarehouse",
    "arrivalWarehouse",
    "distance",
    "duration",
    "consumedEnergy",
  ]
  labels : String[] = [
    "Path Id",
    "Departure Warehouse",
    "Arrival Warehouse",
    "Distance",
    "Duration",
    "Consumed Energy",
  ]

  constructor(
    private route: ActivatedRoute,
    private pathService: PathService,
    private location: Location,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.getPath();
  }

  getPath(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.pathService.getPath(id)
      .subscribe(path => this.path = path);
    this.title.setTitle("Path " + id + " Details");
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.path) {
      console.log(this.path)
      this.pathService.updatePath(this.path)
        .subscribe(() => this.goBack());
    }
  }
}
