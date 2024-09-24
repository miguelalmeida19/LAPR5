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

import {PACKAGES} from "../../../mocks/mock-packages";
import {PackageService} from "../../../services/package.service";
import {PackagesComponent} from "./packages.component";

describe('PackagesComponent', () => {
  let packageService;
  let getPackagesSpy: jasmine.Spy;
  let paginatePackagesSpy: jasmine.Spy;
  let component: PackagesComponent;
  let headerAdd: HeaderAddComponent;
  let tableComponent: TableComponent;
  let filterComponent: FilterComponent;
  let addDialogComponent: AddDialogComponent;
  let fixture: ComponentFixture<PackagesComponent>;

  beforeEach(waitForAsync(() => {
    packageService = jasmine.createSpyObj('PackageService', ['getPackages', 'paginatePackages']);
    getPackagesSpy = packageService.getPackages.and.returnValue(of(PACKAGES));
    //paginatePackagesSpy = packageService.paginatePackages.and.returnValue(of(PACKAGES.slice(0,5)));

    TestBed
      .configureTestingModule({
        declarations: [
          MockComponent(HeaderAddComponent), // create the mock
          PackagesComponent,
          MockComponent(AddDialogComponent),
          MockComponent(TableComponent),
          MockComponent(MessagesComponent),
          HeaderComponent
        ],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          { provide: PackageService, useValue: packageService }
        ]
      }).compileComponents();

    fixture = TestBed.createComponent(PackagesComponent);
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
    expect(headerAdd.customTitle).toBe('Package');
  });

  it('passes a customDescription to header-add', () => {
    expect(headerAdd.customDescription).toBe("Here are listed all the Packages.");
  });

  it('passes a addWord to header-add', () => {
    expect(headerAdd.addWord).toBe("Packages");
  });

  it('passes a color to header-add', () => {
    expect(headerAdd.color).toBe("secondary");
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
    expect(tableComponent.color).toBe("secondary");
  });

  it('passes an object to table-component', () => {
    expect(tableComponent.object).toBe("package");
  });

  it('passes a listOfObjects to table-component', () => {
    expect(tableComponent.listOfObjects).toBe(PACKAGES);
  });

  it('passes a listOfObjects to table-component', () => {
    expect(tableComponent.parameters).toEqual([
      "Package Id",
      "x Coordinate",
      "y Coordinate",
      "z Coordinate",
      "Shipment Id",
      "Delivery Id",
      "Path Id"
    ]);
  });

  it('renders an independent add-dialog', () => {
    const addDialogComponent = findComponent(fixture, "add-dialog");
    expect(addDialogComponent).toBeTruthy();
  });

  it('passes a customTitle to add-dialog', () => {
    expect(addDialogComponent.customTitle).toBe("Package");
  });

  it('passes a color to add-dialog', () => {
    expect(addDialogComponent.color).toBe("secondary");
  });

  it('passes a mainPageTitle to add-dialog', () => {
    expect(addDialogComponent.mainPageTitle).toBe("Packages");
  });

  it('passes parameters to add-dialog', () => {
    expect(addDialogComponent.parameters).toEqual([
      "Package Id",
      "x Coordinate",
      "y Coordinate",
      "z Coordinate",
      "Shipment Id",
      "Delivery Id",
      "Path Id"
    ]);
  });
  it('passes properties to add-dialog', () => {
    expect(addDialogComponent.properties).toEqual( [
      "packageId",
      "xCoordinate",
      "yCoordinate",
      "zCoordinate",
      "shipmentId",
      "deliveryId",
      "pathId"
    ]);
  });

});
