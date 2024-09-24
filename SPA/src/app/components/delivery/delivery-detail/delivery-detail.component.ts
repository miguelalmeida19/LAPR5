import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Delivery } from "../../../domain/delivery";
import { DeliveryService } from "../../../services/delivery.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: ['./delivery-detail.component.css']
})
export class DeliveryDetailComponent implements OnInit
{
  delivery: Delivery | undefined;
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

  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private location: Location,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.getDelivery();
  }

  getDelivery(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.deliveryService.getDelivery(id)
      .subscribe(delivery => this.delivery = delivery);
    this.title.setTitle("Delivery " + id + " Details");
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if(this.delivery) {
      this.deliveryService.updateDelivery(this.delivery)
        .subscribe(() => this.goBack());
    }
  }

}
