import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";

import { Delivery } from '../../../domain/delivery';
import { DeliveryService } from "../../../services/delivery.service";

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {
  deliveries: Delivery[] = [];
  entity: string = "Delivery";
  color: string = "danger";
  labels: string[] = [
    "Delivery Id",
    "Weight",
    "Day",
    "Month",
    "Year",
    "Placing Time",
    "Removing Time",
    "X Size",
    "Y Size",
    "Z Size",
    "Warehouse Id"
  ];
  props: string[] = [
    "id",
    "weight",
    "day",
    "month",
    "year",
    "placingTime",
    "removingTime",
    "xSize",
    "ySize",
    "zSize",
    "warehouseId"
  ];

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.getPaths();
  }

  getPaths(): void {
    this.deliveryService.getDeliveries()
      .subscribe(deliveries => this.deliveries = deliveries);
  }

  add = (args : any): void => {
    this.deliveryService.addDelivery(args)
      .subscribe(delivery => {
        if (delivery !== undefined) {
          this.deliveries.push(delivery);
        }
      });
  }

  search = (args: any): Observable<Delivery[]> => {
    return this.deliveryService.searchDeliveries(args);
  }

  searchWeight = (args: any): Observable<Delivery[]> => {
    return this.deliveryService.searchDeliveriesByWeight(args);
  }

  searchWarehouse = (args: any): Observable<Delivery[]> => {
    return this.deliveryService.searchDeliveriesByWarehouse(args);
  }

  /*
  delete(delivery: Delivery): void {
    this.deliveries = this.deliveries.filter(d => d !== delivery);
    this.deliveryService.deleteDelivery(delivery.id).subscribe();
  }*/

  GetChildData(data: any) {
    this.deliveries = data;
  }

}
