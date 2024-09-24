import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { of } from 'rxjs';

import {findComponent} from "../../utils/findComponent";
import {PACKAGES} from "../../../mocks/mock-packages";
import {PackageService} from "../../../services/package.service";
import {PackageDetailComponent} from "./package-detail.component";

describe('PackageDetailComponent', () => {
  let packageService;
  let getPackageSpy: jasmine.Spy;
  let component: PackageDetailComponent;
  let fixture: ComponentFixture<PackageDetailComponent>;

  beforeEach(waitForAsync(() => {
    packageService = jasmine.createSpyObj('PackageService', ['getPackage']);
    getPackageSpy = packageService.getPackage.and.returnValue(of(PACKAGES[0]));

    TestBed
      .configureTestingModule({
        declarations: [PackageDetailComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          {provide: PackageService, useValue: packageService},
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(PackageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    spyOn(component, 'getPackage');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders an independent details-component', () => {
    const detailsComponent = findComponent(fixture, 'details-component');
    expect(detailsComponent).toBeTruthy();
  });

  it('passes a customTitle to details-component', () => {
    const customTitle = findComponent(fixture, 'details-component');
    expect(customTitle.properties['customTitle']).toBe("Package of ID P01 Details");
  });

  it('renders an independent input-form', () => {
    const detailsComponent = findComponent(fixture, 'input-form');
    expect(detailsComponent).toBeTruthy();
  });

  it('passes a variable id to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[0].properties['variable']).toBe("packageId");
  });

  it('passes a label id to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[0].properties['label']).toBe("Package Id");
  });

  it('passes a tip id to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[0].properties['tip']).toBe("Package Id is not editable!");
  });

  it('passes a variable xCoordinate to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['variable']).toBe("xCoordinate");
  });

  it('passes a label xCoordinate to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['label']).toBe("x Coordinate");
  });

  it('passes a tip xCoordinate to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['tip']).toBe("x Coordinate valued between 1 and 1000!");
  });

  it('passes a variable yCoordinate to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['variable']).toBe("yCoordinate");
  });

  it('passes a label yCoordinate to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['label']).toBe("y Coordinate");
  });

  it('passes a tip yCoordinate to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['tip']).toBe("y Coordinate valued between 1 and 1000!");
  });

  it('passes a variable zCoordinate to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['variable']).toBe("zCoordinate");
  });

  it('passes a label zCoordinate to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['label']).toBe("z Coordinate");
  });

  it('passes a tip zCoordinate to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['tip']).toBe("z Coordinate valued between 1 and 1000!");
  });

  it('passes a variable shipmentId to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['variable']).toBe("shipmentId");
  });

  it('passes a label shipmentId to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['label']).toBe("Shipment Id");
  });

  it('passes a tip shipment to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['tip']).toBe("Shipment Id is not editable!");
  });

  it('passes a variable deliveryId to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[5].properties['variable']).toBe("deliveryId");
  });

  it('passes a label deliveryId to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[5].properties['label']).toBe("Delivery Id");
  });

  it('passes a tip delivery to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[5].properties['tip']).toBe("Delivery Id is not editable!");
  });

  it('passes a variable pathId to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[6].properties['variable']).toBe("pathId");
  });

  it('passes a label pathId to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[6].properties['label']).toBe("Path Id");
  });

  it('passes a tip path to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[6].properties['tip']).toBe("Path Id is not editable!");
  });

});
