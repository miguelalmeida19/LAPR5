import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TruckDetailComponent } from './truck-detail.component';
import {TRUCKS} from "../../../mocks/mock-trucks";
import {TruckService} from "../../../services/truck.service";
import {FormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {findComponent} from "../../utils/findComponent";
import {By} from "@angular/platform-browser";

describe('TruckDetailComponent', () => {
  let truckService;
  let getTruckSpy: jasmine.Spy;
  let component: TruckDetailComponent;
  let fixture: ComponentFixture<TruckDetailComponent>;

  beforeEach(waitForAsync(() => {
    truckService = jasmine.createSpyObj('TruckService', ['getTruck']);
    getTruckSpy = truckService.getTruck.and.returnValue(of(TRUCKS[0]));

    TestBed
      .configureTestingModule({
        declarations: [TruckDetailComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          {provide: TruckService, useValue: truckService},
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(TruckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    spyOn(component, 'getTruck');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders an independent details-component', () => {
    const detailsComponent = findComponent(fixture, 'details-component');
    expect(detailsComponent).toBeTruthy();
  });

  it('passes a customTitle to details-component', () => {
    const customTitle = findComponent(fixture, 'details-component');
    expect(customTitle.properties['customTitle']).toBe("Truck from ID 73-AA-27Details");
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
    expect(customTitle[0].properties['label']).toBe("Truck Id");
  });

  it('passes a tip id to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[0].properties['tip']).toBe("Truck Id is not editable!");
  });

  it('passes a variable tare to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['variable']).toBe("tare");
  });

  it('passes a label tare to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['label']).toBe("Tare");
  });

  it('passes a tip tare to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['tip']).toBe("Tare should be greater than 0!");
  });

  it('passes a variable capacity to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['variable']).toBe("capacity");
  });

  it('passes a label capacity to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['label']).toBe("Capacity");
  });

  it('passes a tip capacity to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['tip']).toBe("Capacity should be greater than 0!!");
  });

  it('passes a variable batteryCharge to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['variable']).toBe("batteryCharge");
  });

  it('passes a label batteryCharge to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['label']).toBe("Battery Charge");
  });

  it('passes a tip batteryCharge to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['tip']).toBe("Battery Charge should be greater than 0!");
  });

  it('passes a variable autonomy to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['variable']).toBe("autonomy");
  });

  it('passes a label autonomy to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['label']).toBe("Autonomy");
  });

  it('passes a tip autonomy to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['tip']).toBe("Autonomy should be greater than 0!");
  });

  it('passes a variable rechargeBattery to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[5].properties['variable']).toBe("rechargeBattery");
  });

  it('passes a label rechargeBattery to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[5].properties['label']).toBe("Recharge Battery");
  });

  it('passes a tip rechargeBattery to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[5].properties['tip']).toBe("Recharge Battery should be greater than 0!");
  });



});
