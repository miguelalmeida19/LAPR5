import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Truck } from '../../../domain/truck';
import { TruckService } from '../../../services/truck.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-truck-detail',
  templateUrl: './truck-detail.component.html',
  styleUrls: [ './truck-detail.component.css' ]
})
export class TruckDetailComponent implements OnInit {
  truck: Truck | undefined;
  props : String[] = [
    "id",
    "tare",
    "capacity",
    "batteryCharge",
    "autonomy",
    "rechargeBattery",
  ]
  labels : String[] = [
    "Truck Id",
    "Tare",
    "Capacity",
    "Battery Charge",
    "Autonomy",
    "Recharge Battery",
  ]

  constructor(
    private route: ActivatedRoute,
    private truckService: TruckService,
    private location: Location,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.getTruck();
  }

  getTruck(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.truckService.getTruck(id)
      .subscribe(truck => this.truck = truck);
    this.title.setTitle("Truck " + id + " Details");
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.truck) {
      this.truckService.updateTruck(this.truck)
        .subscribe(() => this.goBack());
    }
  }
}
