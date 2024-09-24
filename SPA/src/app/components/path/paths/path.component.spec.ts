import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {PathsComponent} from "./paths.component";
import {FormsModule} from "@angular/forms";
import {PathService} from "../../../services/path.service";
import {of} from "rxjs";
import {PATHS} from "../../../mocks/mock-paths";
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

describe('PathsComponent', () => {
  let pathService;
  let getPathsSpy: jasmine.Spy;
  let paginatePathsSpy: jasmine.Spy;
  let component: PathsComponent;
  let headerAdd: HeaderAddComponent;
  let tableComponent: TableComponent;
  let filterComponent: FilterComponent;
  let addDialogComponent: AddDialogComponent;
  let fixture: ComponentFixture<PathsComponent>;
  beforeEach(waitForAsync(() => {
    pathService = jasmine.createSpyObj('PathService', ['getPaths','paginatePaths']);
    getPathsSpy = pathService.getPaths.and.returnValue(of(PATHS));
    //paginatePathsSpy = pathService.paginatePaths.and.returnValue(of(PATHS.slice(0,5)));

    TestBed
      .configureTestingModule({
        declarations: [MockComponent(HeaderAddComponent), // create the mock
          PathsComponent, MockComponent(FilterComponent), MockComponent(AddDialogComponent), MockComponent(TableComponent), SearchComponent, MockComponent(MessagesComponent), HeaderComponent],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          {provide: PathService, useValue: pathService},
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(PathsComponent);
    component = fixture.componentInstance;
    headerAdd = fixture.debugElement.query(By.css('header-add')).componentInstance as HeaderAddComponent;
    tableComponent = fixture.debugElement.query(By.css('table-component')).componentInstance as TableComponent;
    filterComponent = fixture.debugElement.query(By.css('filter-component')).componentInstance as FilterComponent;
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
    expect(headerAdd.customTitle).toBe('Path');
  });
  it('passes a customDescription to header-add', () => {
    expect(headerAdd.customDescription).toBe("Here are listed all the Paths between 2 different warehouses.");
  });
  it('passes a addWord to header-add', () => {
    expect(headerAdd.addWord).toBe("Paths");
  });
  it('passes a color to header-add', () => {
    expect(headerAdd.color).toBe("warning");
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
    expect(tableComponent.color).toBe("warning");
  });
  it('passes an object to table-component', () => {
    expect(tableComponent.object).toBe("path");
  });
  it('passes a listOfObjects to table-component', () => {
    expect(tableComponent.listOfObjects).toBe(PATHS);
  });
  it('passes a listOfObjects to table-component', () => {
    expect(tableComponent.parameters).toEqual([
      "Path Id",
      "Departure",
      "Arrival",
      "Distance",
      "Duration",
      "Consumed Energy",
    ]);
  });

  it('renders an independent filter-component', () => {
    const filterComponent = fixture.debugElement.queryAll(By.css("filter-component"));
    expect(filterComponent[0]).toBeTruthy();
  });
  it('passes a filter to filter-component', () => {
    const filterComponent = fixture.debugElement.queryAll(By.css("filter-component"))[0].componentInstance as FilterComponent;
    expect(filterComponent.filter).toBe("Departure");
  });
  it('passes an icon to filter-component', () => {
    const filterComponent = fixture.debugElement.queryAll(By.css("filter-component"))[0].componentInstance as FilterComponent;
    expect(filterComponent.icon).toBe("warehouse");
  });
  it('passes a numberOfParameters to filter-component', () => {
    const filterComponent = fixture.debugElement.queryAll(By.css("filter-component"))[0].componentInstance as FilterComponent;
    expect(filterComponent.numberOfParameter).toBe(1);
  });
  it('passes a listOfObjects to filter-component', () => {
    const filterComponent = fixture.debugElement.queryAll(By.css("filter-component"))[0].componentInstance as FilterComponent;
    expect(filterComponent.listOfObjects).toBe(PATHS);
  });
  it('passes a color to filter-component', () => {
    const filterComponent = fixture.debugElement.queryAll(By.css("filter-component"))[0].componentInstance as FilterComponent;
    expect(filterComponent.color).toBe("warning");
  });

  it('renders an independent filter-component', () => {
    const filterComponent = fixture.debugElement.queryAll(By.css("filter-component"));
    expect(filterComponent[1]).toBeTruthy();
  });
  it('passes a filter to filter-component', () => {
    const filterComponent = fixture.debugElement.queryAll(By.css("filter-component"))[1].componentInstance as FilterComponent;
    expect(filterComponent.filter).toBe("Arrival");
  });
  it('passes an icon to filter-component', () => {
    const filterComponent = fixture.debugElement.queryAll(By.css("filter-component"))[1].componentInstance as FilterComponent;
    expect(filterComponent.icon).toBe("warehouse");
  });
  it('passes a numberOfParameters to filter-component', () => {
    const filterComponent = fixture.debugElement.queryAll(By.css("filter-component"))[1].componentInstance as FilterComponent;
    expect(filterComponent.numberOfParameter).toBe(2);
  });
  it('passes a listOfObjects to filter-component', () => {
    const filterComponent = fixture.debugElement.queryAll(By.css("filter-component"))[1].componentInstance as FilterComponent;
    expect(filterComponent.listOfObjects).toBe(PATHS);
  });
  it('passes a color to filter-component', () => {
    const filterComponent = fixture.debugElement.queryAll(By.css("filter-component"))[1].componentInstance as FilterComponent;
    expect(filterComponent.color).toBe("warning");
  });


  it('renders an independent add-dialog', () => {
    const addDialogComponent = findComponent(fixture, "add-dialog");
    expect(addDialogComponent).toBeTruthy();
  });
  it('passes a customTitle to add-dialog', () => {
    expect(addDialogComponent.customTitle).toBe("Path");
  });
  it('passes a color to add-dialog', () => {
    expect(addDialogComponent.color).toBe("warning");
  });
  it('passes a mainPageTitle to add-dialog', () => {
    expect(addDialogComponent.mainPageTitle).toBe("Paths");
  });
  it('passes parameters to add-dialog', () => {
    expect(addDialogComponent.parameters).toEqual([
      "Departure",
      "Arrival",
      "Distance",
      "Duration",
      "Consumed Energy",
    ]);
  });
  it('passes properties to add-dialog', () => {
    expect(addDialogComponent.properties).toEqual( [
      "departureWarehouse",
      "arrivalWarehouse",
      "distance",
      "duration",
      "consumedEnergy",
    ]);
  });
});
