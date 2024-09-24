import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {InputFormComponent} from "./input-form.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {findComponent} from "../findComponent";

describe('InputFormComponent', () => {
  let component: InputFormComponent;
  let fixture: ComponentFixture<InputFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed
      .configureTestingModule({
        declarations: [InputFormComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [RouterTestingModule.withRoutes([])],
        providers: []
      })
      .compileComponents();

    fixture = TestBed.createComponent(InputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should change variable label', () => {
    component.label = 'Path Id';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#label').innerText).toEqual('Path Id');
  });

  it('should change variable tip', () => {
    component.tip = 'Path Id must be known in the System';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#tip').innerText).toEqual('Path Id must be known in the System');
  });
});
