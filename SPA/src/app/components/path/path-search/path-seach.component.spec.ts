import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {PathSearchComponent} from "./path-search.component";
import {FormsModule} from "@angular/forms";
import {PathService} from "../../../services/path.service";
import {of} from "rxjs";
import {PATHS} from "../../../mocks/mock-paths";

describe('PathSearchComponent', () => {
  let pathService;
  let searchPathSpy: jasmine.Spy;
  let component: PathSearchComponent;
  let fixture: ComponentFixture<PathSearchComponent>;
  beforeEach(waitForAsync(() => {
    pathService = jasmine.createSpyObj('PathService', ['searchPath']);
    searchPathSpy = pathService.searchPath.and.returnValue([of(PATHS[0])]);

    TestBed
      .configureTestingModule({
        declarations: [PathSearchComponent],
        imports: [RouterTestingModule.withRoutes([]), FormsModule],
        providers: [
          {provide: PathService, useValue: pathService},
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(PathSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    spyOn(component, 'search');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should apply right placeholder', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#search-box').placeholder).toEqual('Search by Id');
  });

});
