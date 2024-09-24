import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import {Package} from "../../../domain/package";
import {PackageService} from "../../../services/package.service";

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  packagesOriginal: Package[] = [];
  packages: Package[] = [];
  pages: number = 1;
  currentPage: number = 0;
  result: any = [];
  entity: string = "Package";
  color: string = "secondary";
  labels: string[] = [
    "Package Id",
    "x Coordinate",
    "y Coordinate",
    "z Coordinate",
    "Shipment Id",
    "Delivery Id",
    "Path Id"
  ]
  props: string[] = [
    "packageId",
    "xCoordinate",
    "yCoordinate",
    "zCoordinate",
    "shipmentId",
    "deliveryId",
    "pathId"
  ]

  constructor(private packageService: PackageService) { }

  ngOnInit(): void {
    this.getPackages();
    this.paginate(5, 0);
  }

  paginate = (nResults: number, page: number): void => {
    let paginatePackages = this.packageService.paginatePackages(nResults, page);
    if (paginatePackages !== undefined) {
      paginatePackages.subscribe((res) => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        this.packages = resJSON.paths;
        this.pages = +resJSON.pages;
      })
    }
  }

  anotherPage = (nResults: number, page: number): void => {
    this.currentPage = page - 1;
    this.paginate(nResults, page);
  }

  goPagesDefault = (): void => {
    this.currentPage = 0;
    this.pages = 1;
  }

  getPackages(): void {
    this.packageService.getPackages()
      .subscribe(packages => this.packages = packages);
    this.packageService.getPackages()
      .subscribe(packages => this.packagesOriginal = packages);
  }

  add = (args: any): void => {
    this.packageService.addPackage(args)
      .subscribe(_package => {
        if (_package !== undefined) this.packages.push(_package);
      });
  }

  /*
  delete(_package: Package): void {
    this.packages = this.packages.filter(h => h !== _package);
    this.packageService.deletePackage(_package.packageId).subscribe();
  }*/

  search = (args: any): Observable<Package[]> => {
    this.goPagesDefault();
    return this.packageService.searchPackage(args);
  }

}
