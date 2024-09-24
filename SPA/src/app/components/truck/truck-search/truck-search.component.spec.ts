import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {TruckSearchComponent} from "./truck-search.component";
import {FormsModule} from "@angular/forms";
import {TruckService} from "../../../services/truck.service";
import {of} from "rxjs";
import {TRUCKS} from "../../../mocks/mock-trucks";

describe('TruckSearchComponent', () => {
  let truckService;
  let searchTruckSpy: jasmine.Spy;
  let component: TruckSearchComponent;
  let fixture: ComponentFixture<TruckSearchComponent>;
  beforeEach(waitForAsync(() => {
    truckService = jasmine.createSpyObj('TruckService', ['searchTruck']);
    searchTruckSpy = truckService.searchTruck.and.returnValue([of(TRUCKS[0])]);

    TestBed
      .configureTestingModule({
        declarations: [TruckSearchComponent],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          {provide: TruckService, useValue: truckService},
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(TruckSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    spyOn(component, 'search');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  

});
