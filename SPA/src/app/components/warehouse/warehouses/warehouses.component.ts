import {Component, OnInit} from "@angular/core";

import {Warehouse} from "../../../domain/warehouse";
import {WarehouseService} from "../../../services/warehouse.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: [ './warehouses.component.css']
})

export class WarehousesComponent implements OnInit{
  warehouses: Warehouse[] = [];
  entity: string = "Warehouse";
  labels : string[] = [
    "Warehouse Id",
    "Designation",
    "Street",
    "Postal Code",
    "Location",
    "Latitude",
    "Longitude",
    "Active"
  ]
  props : string[] = [
    "id",
    "designation",
    "street",
    "postalCode",
    "location",
    "latitude",
    "longitude",
  ]

  constructor(private warehouseService: WarehouseService) {
  }

  ngOnInit(): void {
    this.getWarehouses();
  }

  getWarehouses(): void {
    this.warehouseService.getWarehouses()
      .subscribe(warehouses => this.warehouses = warehouses);
  }

  changeActivate = (args: any): void => {
    this.warehouseService.changeActivate(args);
  }

  add = (args: any): void => {
    this.warehouseService.addWarehouse(args)
      .subscribe(warehouse => {
        if(warehouse !== undefined){
          this.warehouses.push(warehouse);
        }
      });
  }

  search = (args: any): Observable<Warehouse[]> => {
    return this.warehouseService.searchWarehouse(args);
  }
}
