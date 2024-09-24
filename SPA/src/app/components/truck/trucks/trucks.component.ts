import {Component, OnInit} from '@angular/core';

import {Truck} from '../../../domain/truck';
import {TruckService} from '../../../services/truck.service';

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.css']
})
export class TrucksComponent implements OnInit {
  trucks: Truck[] = [];
  entity: string = "Truck"
  labels: string[] = [
    "Truck Id",
    "Tare",
    "Capacity",
    "Battery Charge",
    "Autonomy",
    "Recharge Battery",
    "Active"
  ]
  props: string[] = [
    "truckId",
    "tare",
    "capacity",
    "batteryCharge",
    "autonomy",
    "rechargeBattery",
  ]

  constructor(private truckService: TruckService) {
  }

  ngOnInit(): void {
    this.getTrucks();
  }

  getTrucks(): void {
    this.truckService.getTrucks()
      .subscribe(trucks => this.trucks = trucks);
  }


  changeActivate = (args: any): void => {
    this.truckService.changeActivate(args);
  }

  add = (args: any): void => {
    this.truckService.addTruck(args)
      .subscribe(truck => {
        if (truck !== undefined) {
          this.trucks.push(truck);
        }
      });
    /*

    }
     */

    /*
      delete(path: Path): void {
      this.paths = this.paths.filter(h => h !== path);
      this.pathService.deletePath(path.id).subscribe();
    }
     */
  }

}
