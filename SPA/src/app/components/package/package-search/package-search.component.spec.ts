import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from "@angular/forms";
import {of} from "rxjs";

import {PACKAGES} from "../../../mocks/mock-packages";
import {PackageService} from "../../../services/package.service";
import {PackageSearchComponent} from "./package-search.component";

describe('ShipmentSearchComponent', () => {
  let packageService;
  let searchPackageSpy: jasmine.Spy;
  let component: PackageSearchComponent;
  let fixture: ComponentFixture<PackageSearchComponent>;

  beforeEach(waitForAsync(() => {
    packageService = jasmine.createSpyObj('PackageService', ['searchPackage']);
    searchPackageSpy = packageService.searchPackage.and.returnValue([of(PACKAGES[0])]);

    TestBed
      .configureTestingModule({
        declarations: [PackageSearchComponent],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          {provide: PackageService, useValue: packageService},
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(PackageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    spyOn(component, 'search');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
