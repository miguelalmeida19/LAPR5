import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import {WarehouseDetailComponent} from "./warehouse-detail.component";
import {WAREHOUSES} from "../../../mocks/mock-warehouses";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {WarehouseService} from "../../../services/warehouse.service";
import {findComponent} from "../../utils/findComponent";
import {By} from "@angular/platform-browser";



describe('WarehouseDetailComponent', () => {
  let warehouseService;
  let getWarehouseSpy: jasmine.Spy;
  let component: WarehouseDetailComponent;
  let fixture: ComponentFixture<WarehouseDetailComponent>;

  beforeEach(waitForAsync(() => {
    warehouseService = jasmine.createSpyObj('WarehouseService', ['getWarehouse']);
    getWarehouseSpy = warehouseService.getWarehouse.and.returnValue(of(WAREHOUSES[0]));

    TestBed
      .configureTestingModule({
        declarations: [WarehouseDetailComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          {provide: WarehouseService, useValue: warehouseService},
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(WarehouseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    spyOn(component, 'getWarehouse');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders an independent details-component', () => {
    const detailsComponent = findComponent(fixture, 'details-component');
    expect(detailsComponent).toBeTruthy();
  });

  it('passes a customTitle to details-component', () => {
    const customTitle = findComponent(fixture, 'details-component');
    expect(customTitle.properties['customTitle']).toBe("Warehouse from ID W01Details");
  });

  it('renders an independent input-form', () => {
    const detailsComponent = findComponent(fixture, 'input-form');
    expect(detailsComponent).toBeTruthy();
  });

  it('passes a variable id to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[0].properties['variable']).toBe("id");
  });

  it('passes a label id to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[0].properties['label']).toBe("Warehouse Id");
  });

  it('passes a tip id to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[0].properties['tip']).toBe("Warehouse Id is not editable!");
  });

  it('passes a variable designation to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['variable']).toBe("designation");
  });

  it('passes a label designation to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['label']).toBe("Designation");
  });

  it('passes a tip designation to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['tip']).toBe("Designation can´t be empty!");
  });

  it('passes a variable street to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['variable']).toBe("street");
  });

  it('passes a label street to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['label']).toBe("Street");
  });

  it('passes a tip street to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['tip']).toBe("Street can´t be empty!");
  });

  it('passes a variable postalCode to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['variable']).toBe("postalCode");
  });

  it('passes a label postalCode to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['label']).toBe("Postal Code");
  });

  it('passes a tip postalCode to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['tip']).toBe("Postal Code can´t be empty!");
  });

  it('passes a variable location to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['variable']).toBe("location");
  });

  it('passes a label location to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['label']).toBe("Location");
  });

  it('passes a tip location to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['tip']).toBe("Location can´t be empty!");
  });

  it('passes a variable latitude to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[5].properties['variable']).toBe("latitude");
  });

  it('passes a label latitude to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[5].properties['label']).toBe("Latitude");
  });

  it('passes a tip latitude to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[5].properties['tip']).toBe("Latitude must be between -90 and 90!");
  });

  it('passes a variable longitude to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[6].properties['variable']).toBe("longitude");
  });

  it('passes a label longitude to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[6].properties['label']).toBe("Longitude");
  });

  it('passes a tip longitude to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[6].properties['tip']).toBe("Longitude must be between -180 and 180!");
  });

});
