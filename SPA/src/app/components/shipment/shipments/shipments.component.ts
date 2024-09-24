import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import {Shipment} from "../../../domain/shipment";
import {ShipmentService} from "../../../services/shipment.service";

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {
  shipmentsOriginal: Shipment[] = [];
  shipments: Shipment[] = [];
  pages: number = 1;
  currentPage: number = 0;
  result: any = [];
  entity: string = "Shipment";
  color: string = "primary";
  labels: string[] = [
    "Shipment Id",
    "Truck",
    "ToBe Delivered Day",
    "ToBe Delivered Month",
    "ToBe Delivered Year"
  ]
  props: string[] = [
    "shipmentId",
    "truckId",
    "toBeDeliveredDay",
    "toBeDeliveredMonth",
    "toBeDeliveredYear"
  ]

  constructor(private shipmentService: ShipmentService) { }

  ngOnInit(): void {
    this.getShipments();
    this.paginate(5, 0);
  }

  paginate = (nResults: number, page: number): void => {
    let paginateShipments = this.shipmentService.paginateShipments(nResults, page);
    if (paginateShipments !== undefined) {
      paginateShipments.subscribe((res) => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        this.shipments = resJSON.paths;
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

  getShipments(): void {
    this.shipmentService.getShipments()
      .subscribe(shipments => this.shipments = shipments);
    this.shipmentService.getShipments()
      .subscribe(shipments => this.shipmentsOriginal = shipments);
  }

  add = (args: any): void => {
    this.shipmentService.addShipment(args)
      .subscribe(shipment => {
        if (shipment !== undefined) this.shipments.push(shipment);
      });
  }

  /*
  delete(shipment: Shipment): void {
    this.shipments = this.shipments.filter(h => h !== shipment);
    this.shipmentService.deleteShipment(shipment.shipmentId).subscribe();
  }*/

  search = (args: any): Observable<Shipment[]> => {
    this.goPagesDefault();
    return this.shipmentService.searchShipment(args);
  }

}
