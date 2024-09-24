import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PathDetailComponent } from './path-detail.component';
import {PATHS} from "../../../mocks/mock-paths";
import {PathService} from "../../../services/path.service";
import {FormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {findComponent} from "../../utils/findComponent";
import {By} from "@angular/platform-browser";

describe('PathDetailComponent', () => {
  let pathService;
  let getPathSpy: jasmine.Spy;
  let component: PathDetailComponent;
  let fixture: ComponentFixture<PathDetailComponent>;

  beforeEach(waitForAsync(() => {
    pathService = jasmine.createSpyObj('PathService', ['getPath']);
    getPathSpy = pathService.getPath.and.returnValue(of(PATHS[0]));

    TestBed
      .configureTestingModule({
        declarations: [PathDetailComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          {provide: PathService, useValue: pathService},
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(PathDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    spyOn(component, 'getPath');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders an independent details-component', () => {
    const detailsComponent = findComponent(fixture, 'details-component');
    expect(detailsComponent).toBeTruthy();
  });

  it('passes a customTitle to details-component', () => {
    const customTitle = findComponent(fixture, 'details-component');
    expect(customTitle.properties['customTitle']).toBe("Path from Warehouse W01 to W02 Details");
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
    expect(customTitle[0].properties['label']).toBe("Path Id");
  });

  it('passes a tip id to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[0].properties['tip']).toBe("Path Id is not editable!");
  });

  it('passes a variable departureWarehouse to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['variable']).toBe("departureWarehouse");
  });

  it('passes a label departureWarehouse to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['label']).toBe("Departure Warehouse");
  });

  it('passes a tip departureWarehouse to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[1].properties['tip']).toBe("Departure Warehouse is not editable!");
  });

  it('passes a variable arrivalWarehouse to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['variable']).toBe("arrivalWarehouse");
  });

  it('passes a label arrivalWarehouse to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['label']).toBe("Arrival Warehouse");
  });

  it('passes a tip arrivalWarehouse to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[2].properties['tip']).toBe("Arrival Warehouse is not editable!");
  });

  it('passes a variable distance to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['variable']).toBe("distance");
  });

  it('passes a label distance to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['label']).toBe("Distance");
  });

  it('passes a tip distance to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[3].properties['tip']).toBe("Distance should be greater than 0!");
  });

  it('passes a variable duration to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['variable']).toBe("duration");
  });

  it('passes a label duration to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['label']).toBe("Duration");
  });

  it('passes a tip duration to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[4].properties['tip']).toBe("Duration should be greater than 0!");
  });

  it('passes a variable consumedEnergy to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[5].properties['variable']).toBe("consumedEnergy");
  });

  it('passes a label consumedEnergy to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[5].properties['label']).toBe("Consumed Energy");
  });

  it('passes a tip consumedEnergy to input-form', () => {
    const customTitle = fixture.debugElement.queryAll(By.css("input-form"));
    expect(customTitle[5].properties['tip']).toBe("Consumed Energy should be greater than 0!");
  });

});
