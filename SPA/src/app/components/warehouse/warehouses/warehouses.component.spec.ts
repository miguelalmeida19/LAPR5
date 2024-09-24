import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {FormsModule} from "@angular/forms";
import {of} from "rxjs";
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
import {WarehousesComponent} from "./warehouses.component";
import {WAREHOUSES} from "../../../mocks/mock-warehouses";
import {WarehouseService} from "../../../services/warehouse.service";


describe('WarehousesComponent', () => {
  let warehouseService;
  let getWarehousesSpy: jasmine.Spy;
  let component: WarehousesComponent;
  let headerAdd: HeaderAddComponent;
  let tableComponent: TableComponent;
  let filterComponent: FilterComponent;
  let addDialogComponent: AddDialogComponent;
  let fixture: ComponentFixture<WarehousesComponent>;
  beforeEach(waitForAsync(() => {
    warehouseService = jasmine.createSpyObj('WarehouseService', ['getWarehouses']);
    getWarehousesSpy = warehouseService.getWarehouses.and.returnValue(of(WAREHOUSES));

    TestBed
      .configureTestingModule({
        declarations: [MockComponent(HeaderAddComponent), // create the mock
          WarehousesComponent, MockComponent(AddDialogComponent), MockComponent(TableComponent), MockComponent(MessagesComponent), HeaderComponent],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          {provide: WarehouseService, useValue: warehouseService},
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(WarehousesComponent);
    component = fixture.componentInstance;
    headerAdd = fixture.debugElement.query(By.css('header-add')).componentInstance as HeaderAddComponent;
    tableComponent = fixture.debugElement.query(By.css('table-component')).componentInstance as TableComponent;
    addDialogComponent = fixture.debugElement.query(By.css('add-dialog')).componentInstance as AddDialogComponent;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    spyOn(component, 'search');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders an independent header-add', () => {
    const headerComponent = findComponent(fixture, 'header-add');
    expect(headerComponent).toBeTruthy();
  });
  it('passes a customTitle to header-add', () => {
    expect(headerAdd.customTitle).toBe('Warehouse');
  });
  it('passes a customDescription to header-add', () => {
    expect(headerAdd.customDescription).toBe("Here are listed all the Warehouses");
  });
  it('passes a addWord to header-add', () => {
    expect(headerAdd.addWord).toBe("Warehouse");
  });
  it('passes a color to header-add', () => {
    expect(headerAdd.color).toBe("success");
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
    expect(tableComponent.color).toBe("success");
  });
  it('passes an object to table-component', () => {
    expect(tableComponent.object).toBe("warehouse");
  });
  it('passes a listOfObjects to table-component', () => {
    expect(tableComponent.listOfObjects).toBe(WAREHOUSES);
  });
  it('passes a listOfObjects to table-component', () => {
    expect(tableComponent.parameters).toEqual([
      "Warehouse Id",
      "Designation",
      "Street",
      "Postal Code",
      "Location",
      "Latitude",
      "Longitude",
      "Active"
    ]);
  });


  it('renders an independent add-dialog', () => {
    const addDialogComponent = findComponent(fixture, "add-dialog");
    expect(addDialogComponent).toBeTruthy();
  });
  it('passes a customTitle to add-dialog', () => {
    expect(addDialogComponent.customTitle).toBe("Warehouse");
  });
  it('passes a color to add-dialog', () => {
    expect(addDialogComponent.color).toBe("success");
  });
  it('passes a mainPageTitle to add-dialog', () => {
    expect(addDialogComponent.mainPageTitle).toBe("Warehouse");
  });
  it('passes parameters to add-dialog', () => {
    expect(addDialogComponent.parameters).toEqual([
      "Warehouse Id",
      "Designation",
      "Street",
      "Postal Code",
      "Location",
      "Latitude",
      "Longitude",
    ]);
  });
  it('passes properties to add-dialog', () => {
    expect(addDialogComponent.properties).toEqual( [
      "id",
      "designation",
      "street",
      "postalCode",
      "location",
      "latitude",
      "longitude",
    ]);
  });
});
