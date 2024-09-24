import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { of } from 'rxjs';

import {findComponent} from "../../utils/findComponent";
import {SHIPMENTS} from "../../../mocks/mock-shipments";
import {ShipmentService} from "../../../services/shipment.service";
import {ShipmentDetailComponent} from "./shipment-detail.component";

describe('ShipmentDetailComponent', () => {
  let shipmentService;
  let getShipmentSpy: jasmine.Spy;
  let component: ShipmentDetailComponent;
  let fixture: ComponentFixture<ShipmentDetailComponent>;

  beforeEach(waitForAsync(() => {
    shipmentService = jasmine.createSpyObj('ShipmentService', ['getShipment']);
    getShipmentSpy = shipmentService.getShipment.and.returnValue(of(SHIPMENTS[0]));

    TestBed
      .configureTestingModule({
        declarations: [ShipmentDetailComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          {provide: ShipmentService, useValue: shipmentService},
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(ShipmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    spyOn(component, 'getShipment');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders an independent details-component', () => {
    const detailsComponent = findComponent(fixture, 'details-component');
    expect(detailsComponent).toBeTruthy();
  });

  it('passes a customTitle to details-component', () => {
    const customTitle = findComponent(fixture, 'details-component');
    expect(customTitle.properties['customTitle']).toBe("Shipment of ID S01 Details");
  });

  it('renders an independent input-form', () => {
    const detailsComponent = findComponent(fixture, 'input-form');
    expect(detailsComponent).toBeTruthy();
  });

  it('passes a variable id to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[0].properties['variable']).toBe("shipmentId");
  });

  it('passes a label id to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[0].properties['label']).toBe("Shipment Id");
  });

  it('passes a tip id to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[0].properties['tip']).toBe("Shipment Id is not editable!");
  });

  it('passes a variable truckId to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['variable']).toBe("truckId");
  });

  it('passes a label truckId to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['label']).toBe("Truck Id");
  });

  it('passes a tip truckId to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['tip']).toBe("Truck Id is not editable!");
  });

  it('passes a variable toBeDeliveredDay to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['variable']).toBe("toBeDeliveredDay");
  });

  it('passes a label toBeDeliveredDay to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['label']).toBe("Day");
  });

  it('passes a tip toBeDeliveredDay to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['tip']).toBe("Day valued between 1 and 31");
  });

  it('passes a variable toBeDeliveredMonth to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['variable']).toBe("toBeDeliveredMonth");
  });

  it('passes a label toBeDeliveredMonth to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['label']).toBe("Month");
  });

  it('passes a tip toBeDeliveredMonth to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['tip']).toBe("Month valued between 1 and 12");
  });

  it('passes a variable toBeDeliveredYear to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['variable']).toBe("toBeDeliveredYear");
  });

  it('passes a label toBeDeliveredYear to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['label']).toBe("Year");
  });

  it('passes a tip toBeDeliveredYear to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['tip']).toBe("Year valued between 2022 and 2025");
  });

});
