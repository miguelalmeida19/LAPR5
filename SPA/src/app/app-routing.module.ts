import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import {PathsComponent} from "./components/path/paths/paths.component";
import {PathDetailComponent} from "./components/path/path-detail/path-detail.component";
import {TruckDetailComponent} from "./components/truck/truck-detail/truck-detail.component";
import {TrucksComponent} from "./components/truck/trucks/trucks.component";
import {WarehousesComponent} from "./components/warehouse/warehouses/warehouses.component";
import {WarehouseDetailComponent} from "./components/warehouse/warehouse-detail/warehouse-detail.component";
import {DeliveriesComponent} from "./components/delivery/deliveries/deliveries.component";
import {DeliveryDetailComponent} from "./components/delivery/delivery-detail/delivery-detail.component";
import {ShipmentsComponent} from "./components/shipment/shipments/shipments.component";
import {ShipmentDetailComponent} from "./components/shipment/shipment-detail/shipment-detail.component";
import {PackagesComponent} from "./components/package/packages/packages.component";
import {PackageDetailComponent} from "./components/package/package-detail/package-detail.component";
import {RoadNetworkComponent} from "./components/roadNetwork/road-network.component";
import {PlanComponent} from "./components/plan/plan.component";
import {UsersComponent} from "./components/user/users/users.component";
import {WaitingRoomComponent} from "./components/waiting-room/waiting-room.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent,title:'Dashboard'},
  { path: 'profile', component: ProfileComponent,title:'Profile'},
  { path: 'waiting', component: WaitingRoomComponent,title:'Waiting'},
  { path: 'pathsDetail/:id', component: PathDetailComponent,title:'Path Details'},
  { path: 'paths', component: PathsComponent,title:'Paths' },
  { path: 'trucksDetail/:id', component: TruckDetailComponent,title:'Truck Details' },
  { path: 'trucks', component: TrucksComponent,title:'Trucks' },
  { path: 'warehouses', component: WarehousesComponent,title:'Warehouses'},
  { path: 'warehousesDetail/:id', component: WarehouseDetailComponent,title:'Warehouse Details' },
  { path: 'deliveries', component: DeliveriesComponent,title:'Deliveries'},
  { path: 'deliverysDetail/:id', component: DeliveryDetailComponent,title:'Delivery Details'},
  { path: 'shipments', component: ShipmentsComponent,title:'Shipments'},
  { path: 'shipmentsDetail/:id', component: ShipmentDetailComponent,title:'Shipment Details'},
  { path: 'packages', component: PackagesComponent,title:'Packages'},
  { path: 'packagesDetail/:id', component: PackageDetailComponent,title:'Package Details'},
  { path: 'deliveryPlan', component: PlanComponent,title:'Plan'},
  { path: 'users', component: UsersComponent,title:'Users'},
  { path: 'roadNetwork', component: RoadNetworkComponent,title:'Road Network'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
