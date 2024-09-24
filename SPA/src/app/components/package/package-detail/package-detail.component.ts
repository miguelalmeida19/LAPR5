import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from "@angular/platform-browser";

import {Package} from "../../../domain/package";
import {PackageService} from "../../../services/package.service";

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})
export class PackageDetailComponent implements OnInit {
  _package: Package | undefined;
  props: String[] = [
    "packageId",
    "xCoordinate",
    "yCoordinate",
    "zCoordinate",
    "shipmentId",
    "deliveryId",
    "pathId"
  ]
  labels: String[] = [
    "Package Id",
    "x Coordinate",
    "y Coordinate",
    "z Coordinate",
    "Shipment Id",
    "Delivery Id",
    "Path Id"
  ]

  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService,
    private location: Location,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.getPackage();
  }

  getPackage(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.packageService.getPackage(id)
      .subscribe(_package => this._package = _package);
    this.title.setTitle("Package " + id + " Details");
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this._package) {
      this.packageService.updatePackage(this._package)
        .subscribe(() => this.goBack());
    }
  }

}
