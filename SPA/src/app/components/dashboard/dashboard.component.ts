import { Component, OnInit } from '@angular/core';
import { Path } from '../../domain/path';
import { Truck } from '../../domain/truck';
import { PathService } from "../../services/path.service";
import { TruckService } from "../../services/truck.service";
import { Warehouse } from "../../domain/warehouse";
import { WarehouseService } from "../../services/warehouse.service";
import { Delivery } from "../../domain/delivery";
import { DeliveryService } from "../../services/delivery.service";
import { Shipment } from "../../domain/shipment";
import { ShipmentService } from "../../services/shipment.service";
import { Package } from "../../domain/package";
import { PackageService } from "../../services/package.service";
import {GoogleApiService, UserInfo} from "../../services/google-api.service";
import {User} from "../../domain/user";
import {UsersService} from "../../services/users.service";
// @ts-ignore
import config from "../../../../config";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  paths: Path[] = [];
  trucks: Truck[] = [];
  warehouses: Warehouse[] = [];
  deliveries: Delivery[] = [];
  shipments: Shipment[] = [];
  packages: Package[] = [];
  users: User[] = [];

  userInfo?: UserInfo

  hour: number = 0;
  role?: string


  constructor(
    private pathService : PathService,
    private truckService : TruckService,
    private warehouseService : WarehouseService,
    private deliveryService : DeliveryService,
    private shipmentService : ShipmentService,
    private packageService : PackageService,
    private userService : UsersService,
    private readonly googleApi: GoogleApiService
  ) {
  }

  ngOnInit(): void {
    this.hour = new Date().getHours();
    this.googleApi.userProfileSubject?.subscribe(info => this.userInfo = info)
    this.getPaths();
    this.getTrucks();
    this.getWarehouses();
    this.getDeliveries();
    this.getShipments();
    this.getPackages();
    this.getUsers();
    this.role = localStorage.getItem("role")!
    if (!config.USE_SSO){
      this.role = "free"
    }
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getPaths(): void {
    this.pathService.getPaths()
      .subscribe(paths => this.paths = paths);
  }

  getTrucks(): void {
    this.truckService.getTrucks()
      .subscribe(trucks => this.trucks = trucks);
  }

  getWarehouses(): void {
    this.warehouseService.getWarehouses()
      .subscribe(warehouses => this.warehouses = warehouses);
  }

  getDeliveries(): void {
    this.deliveryService.getDeliveries()
      .subscribe(deliveries => this.deliveries = deliveries);
  }

  getShipments(): void {
    this.shipmentService.getShipments()
      .subscribe(shipments => this.shipments = shipments);
  }

  getPackages(): void {
    this.packageService.getPackages()
      .subscribe(packages => this.packages = packages);
  }

}
