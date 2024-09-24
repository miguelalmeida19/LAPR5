import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {FormsModule} from "@angular/forms";
import {of} from "rxjs";
import {WAREHOUSES} from "../../../mocks/mock-warehouses";
import {WarehouseSearchComponent} from "./warehouse-search.component";
import {WarehouseService} from "../../../services/warehouse.service";


describe('WarehouseSearchComponent', () => {
  let warehouseService;
  let searchWarehouseSpy: jasmine.Spy;
  let component: WarehouseSearchComponent;
  let fixture: ComponentFixture<WarehouseSearchComponent>;
  beforeEach(waitForAsync(() => {
    warehouseService = jasmine.createSpyObj('WarehouseService', ['searchWarehouse']);
    searchWarehouseSpy = warehouseService.searchWarehouse.and.returnValue([of(WAREHOUSES[0])]);

    TestBed
      .configureTestingModule({
        declarations: [WarehouseSearchComponent],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          {provide: WarehouseService, useValue: warehouseService},
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(WarehouseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    spyOn(component, 'search');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


});
