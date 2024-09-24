import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {DetailsComponent} from "./details.component";
import {PathDetailComponent} from "../../path/path-detail/path-detail.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AppComponent} from "../../../app.component";
import {FormsModule} from "@angular/forms";

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed
      .configureTestingModule({
        declarations: [DetailsComponent],
        imports: [RouterTestingModule.withRoutes([]),FormsModule],
        providers: []
      })
      .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show customTitle input', () => {
    component.customTitle = 'Paths';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#customTitle').innerText).toEqual('Paths');
  });


});
