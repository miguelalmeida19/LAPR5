import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MessagesComponent} from './components/messages/messages.component';
import {PathsComponent} from "./components/path/paths/paths.component";
import {PathDetailComponent} from "./components/path/path-detail/path-detail.component";
import {PathSearchComponent} from "./components/path/path-search/path-search.component";
import {HeaderComponent} from "./components/header/header.component";
import {TrucksComponent} from "./components/truck/trucks/trucks.component";
import {TruckDetailComponent} from "./components/truck/truck-detail/truck-detail.component";
import {TruckSearchComponent} from "./components/truck/truck-search/truck-search.component";
import {HeaderAddComponent} from "./components/utils/header_add/header-add.component";
import {TableComponent} from "./components/utils/table/table.component";
import {AddDialogComponent} from "./components/utils/add_dialog/add-dialog.component";
import {DetailsComponent} from "./components/utils/details/details.component";
import {InputFormComponent} from "./components/utils/input-form/input-form.component";
import {WarehousesComponent} from "./components/warehouse/warehouses/warehouses.component";
import {WarehouseDetailComponent} from "./components/warehouse/warehouse-detail/warehouse-detail.component";
import {WarehouseSearchComponent} from "./components/warehouse/warehouse-search/warehouse-search.component";
import {DeliveriesComponent} from "./components/delivery/deliveries/deliveries.component";
import {DeliveryDetailComponent} from "./components/delivery/delivery-detail/delivery-detail.component";
import {DeliverySearchComponent} from "./components/delivery/delivery-search/delivery-search.component";
import {RoadNetworkComponent} from "./components/roadNetwork/road-network.component";
import {SearchComponent} from "./components/utils/search/search.component";
import {FilterComponent} from "./components/utils/filter/filter.component";
import {ShipmentDetailComponent} from './components/shipment/shipment-detail/shipment-detail.component';
import {ShipmentSearchComponent} from './components/shipment/shipment-search/shipment-search.component';
import {ShipmentsComponent} from './components/shipment/shipments/shipments.component';
import {PackagesComponent} from './components/package/packages/packages.component';
import {PackageDetailComponent} from './components/package/package-detail/package-detail.component';
import {PackageSearchComponent} from './components/package/package-search/package-search.component';
import {PlanComponent} from "./components/plan/plan.component";
import {OAuthModule} from 'angular-oauth2-oidc'
import {OAuthService} from 'angular-oauth2-oidc';
import {UsersComponent} from './components/user/users/users.component';
import {CancelDialogComponent} from "./components/utils/cancel_dialog/cancel-dialog.component";
import {WaitingRoomComponent} from "./components/waiting-room/waiting-room.component";
import {ProfileComponent} from "./components/profile/profile.component";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OAuthModule.forRoot()

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    /*
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
     */

  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    MessagesComponent,
    PathsComponent,
    PathDetailComponent,
    PathSearchComponent,
    TrucksComponent,
    TruckDetailComponent,
    TruckSearchComponent,
    ShipmentDetailComponent,
    ShipmentSearchComponent,
    ShipmentsComponent,
    PackagesComponent,
    PackageDetailComponent,
    PackageSearchComponent,
    WarehousesComponent,
    WarehouseDetailComponent,
    WarehouseSearchComponent,
    DeliveriesComponent,
    DeliveryDetailComponent,
    DeliverySearchComponent,
    HeaderAddComponent,
    TableComponent,
    AddDialogComponent,
    DetailsComponent,
    InputFormComponent,
    RoadNetworkComponent,
    SearchComponent,
    FilterComponent,
    PlanComponent,
    UsersComponent,
    CancelDialogComponent,
    WaitingRoomComponent,
    ProfileComponent
  ],
  providers: [OAuthService, OAuthModule],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule {
}// @ts-ignore
