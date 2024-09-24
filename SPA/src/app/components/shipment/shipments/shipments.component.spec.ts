import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {MockComponent} from "ng-mocks";
import {of} from "rxjs";
import {NO_ERRORS_SCHEMA} from "@angular/compiler";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

import {AddDialogComponent} from "../../utils/add_dialog/add-dialog.component";
import {TableComponent} from "../../utils/table/table.component";
import {SearchComponent} from "../../utils/search/search.component";
import {MessagesComponent} from "../../messages/messages.component";
import {HeaderComponent} from "../../header/header.component";
import {HeaderAddComponent} from "../../utils/header_add/header-add.component";
import {FilterComponent} from "../../utils/filter/filter.component";
import {findComponent} from "../../utils/findComponent";

import {SHIPMENTS} from "../../../mocks/mock-shipments";
import {ShipmentsComponent} from "./shipments.component";
import {ShipmentService} from "../../../services/shipment.service";

describe('ShipmentsComponent', () => {
  let shipmentService;
  let getShipmentsSpy: jasmine.Spy;
  let paginateShipmentsSpy: jasmine.Spy;
  let component: ShipmentsComponent;
  let headerAdd: HeaderAddComponent;
  let tableComponent: TableComponent;
  let filterComponent: FilterComponent;
  let addDialogComponent: AddDialogComponent;
  let fixture: ComponentFixture<ShipmentsComponent>;

  beforeEach(waitForAsync(() => {
    shipmentService = jasmine.createSpyObj('ShipmentService', ['getShipments', 'paginateShipments']);
    getShipmentsSpy = shipmentService.getShipments.and.returnValue(of(SHIPMENTS));
    //paginateShipmentsSpy = shipmentService.paginateShipments.and.returnValue(of(SHIPMENTS.slice(0,5)));

    TestBed
      .configureTestingModule({
        declarations: [
          MockComponent(HeaderAddComponent), // create the mock
          ShipmentsComponent,
          MockComponent(AddDialogComponent),
          MockComponent(TableComponent),
          MockComponent(MessagesComponent),
          HeaderComponent
        ],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          { provide: ShipmentService, useValue: shipmentService }
        ]
      }).compileComponents();

    fixture = TestBed.createComponent(ShipmentsComponent);
    component = fixture.componentInstance;
    headerAdd = fixture.debugElement.query(By.css('header-add')).componentInstance as HeaderAddComponent;
    tableComponent = fixture.debugElement.query(By.css('table-component')).componentInstance as TableComponent;
    addDialogComponent = fixture.debugElement.query(By.css('add-dialog')).componentInstance as AddDialogComponent;
    fixture.detectChanges();
  }));

  it('renders an independent header-add', () => {
    const headerComponent = findComponent(fixture, 'header-add');
    expect(headerComponent).toBeTruthy();
  });

  it('passes a customTitle to header-add', () => {
    expect(headerAdd.customTitle).toBe('Shipment');
  });

  it('passes a customDescription to header-add', () => {
    expect(headerAdd.customDescription).toBe("Here are listed all the Shipments.");
  });

  it('passes a addWord to header-add', () => {
    expect(headerAdd.addWord).toBe("Shipments");
  });

  it('passes a color to header-add', () => {
    expect(headerAdd.color).toBe("primary");
  });

  it('renders an independent app-messages', () => {
    const appMessagesComponent = findComponent(fixture, "app-messages");
    expect(appMessagesComponent).toBeTruthy();
  });

  it('renders an independent table-component', () => {
    const tableComponent = findComponent(fixture, "table-component");
    expect(tableComponent).toBeTruthy();
  });

  it('passes a color to table-component', () => {
    expect(tableComponent.color).toBe("primary");
  });

  it('passes an object to table-component', () => {
    expect(tableComponent.object).toBe("shipment");
  });

  it('passes a listOfObjects to table-component', () => {
    expect(tableComponent.listOfObjects).toBe(SHIPMENTS);
  });

  it('passes a listOfObjects to table-component', () => {
    expect(tableComponent.parameters).toEqual([
      "Shipment Id",
      "Truck",
      "ToBe Delivered Day",
      "ToBe Delivered Month",
      "ToBe Delivered Year"
    ]);
  });

  it('renders an independent add-dialog', () => {
    const addDialogComponent = findComponent(fixture, "add-dialog");
    expect(addDialogComponent).toBeTruthy();
  });

  it('passes a customTitle to add-dialog', () => {
    expect(addDialogComponent.customTitle).toBe("Shipment");
  });

  it('passes a color to add-dialog', () => {
    expect(addDialogComponent.color).toBe("primary");
  });

  it('passes a mainPageTitle to add-dialog', () => {
    expect(addDialogComponent.mainPageTitle).toBe("Shipments");
  });

  it('passes parameters to add-dialog', () => {
    expect(addDialogComponent.parameters).toEqual([
      "Shipment Id",
      "Truck",
      "ToBe Delivered Day",
      "ToBe Delivered Month",
      "ToBe Delivered Year"
    ]);
  });
  it('passes properties to add-dialog', () => {
    expect(addDialogComponent.properties).toEqual( [
      "shipmentId",
      "truckId",
      "toBeDeliveredDay",
      "toBeDeliveredMonth",
      "toBeDeliveredYear"
    ]);
  });

});
