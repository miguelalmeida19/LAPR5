import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from "@angular/platform-browser";

import {Shipment} from '../../../domain/shipment';
import {ShipmentService} from '../../../services/shipment.service';

@Component({
  selector: 'app-shipment-detail',
  templateUrl: './shipment-detail.component.html',
  styleUrls: ['./shipment-detail.component.css']
})
export class ShipmentDetailComponent implements OnInit {
  shipment: Shipment | undefined;
  props: String[] = [
    "shipmentId",
    "truckId",
    "toBeDeliveredDay",
    "toBeDeliveredMonth",
    "toBeDeliveredYear"
  ]
  labels: String[] = [
    "Shipment Id",
    "Truck Id",
    "Day",
    "Month",
    "Year"
  ]

  constructor(
    private route: ActivatedRoute,
    private shipmentService: ShipmentService,
    private location: Location,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.getShipment();
  }

  getShipment(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.shipmentService.getShipment(id)
      .subscribe(shipment => this.shipment = shipment);
    this.title.setTitle("Shipment " + id + " Details");
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.shipment) {
      this.shipmentService.updateShipment(this.shipment)
        .subscribe(() => this.goBack());
    }
  }

}
