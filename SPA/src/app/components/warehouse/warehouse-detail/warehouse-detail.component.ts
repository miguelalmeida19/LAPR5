import { Component, OnInit} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Warehouse} from "../../../domain/warehouse";
import { WarehouseService} from "../../../services/warehouse.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: [ 'warehouse-detail.component.css']
})
export class WarehouseDetailComponent implements OnInit{
  warehouse: Warehouse | undefined;
  props : string [] = [
    "id",
    "designation",
    "street",
    "postalCode",
    "location",
    "latitude",
    "longitude",
  ]
  labels : string[] = [
    "Warehouse Id",
    "Designation",
    "Street",
    "Postal Code",
    "Location",
    "Latitude",
    "Longitude",
  ]

  constructor(
    private route: ActivatedRoute,
    private warehouseService: WarehouseService,
    private location: Location,
    private title: Title
  ){}

  ngOnInit():void {
    this.getWarehouse();
  }

  getWarehouse(): void{
    const id = this.route.snapshot.paramMap.get('id')!;
    this.warehouseService.getWarehouse(id)
      .subscribe(warehouse => this.warehouse = warehouse);
    this.title.setTitle("Warehouse " + id + " Details");
  }

  goBack():void {
    this.location.back();
  }

  save(): void{
    if (this.warehouse){
      this.warehouseService.updateWarehouse(this.warehouse)
        .subscribe(() => this.goBack());
    }
  }
}
