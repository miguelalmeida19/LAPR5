import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {AddDialogComponent} from "./add-dialog.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AppComponent} from "../../../app.component";
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed
      .configureTestingModule({
        declarations: [AddDialogComponent],
        imports: [RouterTestingModule.withRoutes([]),FormsModule],
        providers: []
      })
      .compileComponents();

    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show customTitle input', () => {
    component.customTitle = 'Path';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#exampleModalLabel').innerText).toEqual('Create Path');
  });
});

