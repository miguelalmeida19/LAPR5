import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from "@angular/forms";
import {of} from "rxjs";

import {SHIPMENTS} from "../../../mocks/mock-shipments";
import {ShipmentService} from "../../../services/shipment.service";
import {ShipmentSearchComponent} from "./shipment-search.component";

describe('ShipmentSearchComponent', () => {
  let shipmentService;
  let searchShipmentSpy: jasmine.Spy;
  let component: ShipmentSearchComponent;
  let fixture: ComponentFixture<ShipmentSearchComponent>;

  beforeEach(waitForAsync(() => {
    shipmentService = jasmine.createSpyObj('ShipmentService', ['searchShipment']);
    searchShipmentSpy = shipmentService.searchShipment.and.returnValue([of(SHIPMENTS[0])]);

    TestBed
      .configureTestingModule({
        declarations: [ShipmentSearchComponent],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          {provide: ShipmentService, useValue: shipmentService},
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(ShipmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    spyOn(component, 'search');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
