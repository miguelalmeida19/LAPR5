import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {TrucksComponent} from "./trucks.component";
import {FormsModule} from "@angular/forms";
import {TruckService} from "../../../services/truck.service";
import {of} from "rxjs";
import {TRUCKS} from "../../../mocks/mock-trucks";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FilterComponent} from "../../utils/filter/filter.component";
import {NO_ERRORS_SCHEMA} from "@angular/compiler";
import {AddDialogComponent} from "../../utils/add_dialog/add-dialog.component";
import {TableComponent} from "../../utils/table/table.component";
import {SearchComponent} from "../../utils/search/search.component";
import {MessagesComponent} from "../../messages/messages.component";
import {HeaderComponent} from "../../header/header.component";
import {HeaderAddComponent} from "../../utils/header_add/header-add.component";
import {findComponent} from "../../utils/findComponent";
import {By} from "@angular/platform-browser";
import {MockComponent} from "ng-mocks";

describe('TrucksComponent', () => {
  let truckService;
  let getTrucksSpy: jasmine.Spy;
  let component: TrucksComponent;
  let headerAdd: HeaderAddComponent;
  let tableComponent: TableComponent;
  let filterComponent: FilterComponent;
  let addDialogComponent: AddDialogComponent;
  let fixture: ComponentFixture<TrucksComponent>;
  beforeEach(waitForAsync(() => {
    truckService = jasmine.createSpyObj('TruckService', ['getTrucks']);
    getTrucksSpy = truckService.getTrucks.and.returnValue(of(TRUCKS));

    TestBed
      .configureTestingModule({
        declarations: [MockComponent(HeaderAddComponent), // create the mock
          TrucksComponent, MockComponent(AddDialogComponent), MockComponent(TableComponent),MockComponent(MessagesComponent), HeaderComponent],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          {provide: TruckService, useValue: truckService},
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(TrucksComponent);
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
     expect(headerAdd.customTitle).toBe('Truck');
   });
   it('passes a customDescription to header-add', () => {
     expect(headerAdd.customDescription).toBe("Here are listed all the Trucks");
   });
   it('passes a addWord to header-add', () => {
     expect(headerAdd.addWord).toBe("Trucks");
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
         expect(tableComponent.object).toBe("truck");
       });
       it('passes a listOfObjects to table-component', () => {
         expect(tableComponent.listOfObjects).toBe(TRUCKS);
       });
       it('passes a listOfObjects to table-component', () => {
         expect(tableComponent.parameters).toEqual([
           "Truck Id",
           "Tare",
           "Capacity",
           "Battery Charge",
           "Autonomy",
           "Recharge Battery",
           "Active"
         ]);
       });
         it('renders an independent add-dialog', () => {
           const addDialogComponent = findComponent(fixture, "add-dialog");
           expect(addDialogComponent).toBeTruthy();
         });
         it('passes a customTitle to add-dialog', () => {
           expect(addDialogComponent.customTitle).toBe("Truck");
         });
         it('passes a color to add-dialog', () => {
           expect(addDialogComponent.color).toBe("primary");
         });
         it('passes a mainPageTitle to add-dialog', () => {
           expect(addDialogComponent.mainPageTitle).toBe("Trucks");
         });

  it('passes parameters to add-dialog', () => {
    expect(addDialogComponent.parameters).toEqual([
      "Truck Id",
      "Tare",
      "Capacity",
      "Battery Charge",
      "Autonomy",
      "Recharge Battery",
    ]);
  });
  it('passes properties to add-dialog', () => {
    expect(addDialogComponent.properties).toEqual( [
      "truckId",
      "tare",
      "capacity",
      "batteryCharge",
      "autonomy",
      "rechargeBattery",
    ]);
  });
});
