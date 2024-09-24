import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {RoadNetwork} from "./road-network";
import * as THREE from "three";
import {PathService} from "../../services/path.service";
import {ConnectionService} from "../../services/connection.service";
import {LocationService} from "../../services/location.service";
import {Path} from "../../domain/path";
import {Connection} from "../../domain/connection";
import {Location} from "../../domain/location";
import {WarehouseService} from "../../services/warehouse.service";

@Component({
  selector: 'road-network-component',
  templateUrl: './road-network.component.html',
  styleUrls: ['./road-network.component.css'],
  encapsulation: ViewEncapsulation.None, // disable view encapsulation
})
export class RoadNetworkComponent implements OnInit {

  currentTruckLocation: string = "";
  connections: Connection[] = [];
  locations: Location[] = [];
  roadNetwork!: RoadNetwork;

  constructor(private connectionsService: ConnectionService, private locationsService: LocationService, private warehousesService: WarehouseService) {
  }

  getConnections(): void {
    this.connectionsService.getConnections()
      .subscribe(connections => {
        this.roadNetwork.connection(connections)
        this.roadNetwork.alreadyLoaded()
      });
  }

  getLocations(): void {
    this.locationsService.getLocations()
      .subscribe(locations => {
        this.roadNetwork.location(locations)
        this.roadNetwork.alreadyLoaded()
      });
  }

  getWarehouses(): void {
    this.warehousesService.getWarehouses()
      .subscribe(warehouses => {
        this.roadNetwork.warehouse(warehouses)
        this.roadNetwork.alreadyLoaded()
      });
  }

  ngOnInit(): void {

    this.getConnections()
    this.getLocations()
    this.getWarehouses()

    const initialize = () => {

      // Vector up to Positive Z Axis
      THREE.Object3D.DefaultUp.set(0, 0, 1);

      this.roadNetwork = new RoadNetwork();
    }

    const animate = () => {
      requestAnimationFrame(animate);
      this.roadNetwork.update();
      this.currentTruckLocation = this.roadNetwork.currentLocationOfTruck
    }

    initialize();
    animate();
  }

}
