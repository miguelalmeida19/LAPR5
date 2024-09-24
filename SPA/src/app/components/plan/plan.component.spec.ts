import { PlanComponent } from './plan.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {HeaderAddComponent} from "../utils/header_add/header-add.component";

describe('PlanComponent', () => {
  let component: PlanComponent;
  let fixture: ComponentFixture<PlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
      declarations: [ PlanComponent, HeaderAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a header with a custom title', () => {
    const headerElement = fixture.debugElement.query(By.css('header-add'));
    expect(headerElement.properties['customTitle']).toBeUndefined();
  });

  it('should have a header with a custom description', () => {
    const headerElement = fixture.debugElement.query(By.css('header-add'));
    expect(headerElement.properties['customDescription']).toBeUndefined();
  });

  it('should have a "Load Plan" button', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent).toContain('Load Plan');
  });

  it('should have a "Simulate Plan" button', () => {
    const buttonElements = fixture.debugElement.queryAll(By.css('button'));
    expect(buttonElements[1].nativeElement.textContent).toContain('Simulate Plan');
  });

  it('should display trucks when the "Load Plan" button is clicked', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
    fixture.detectChanges();
    const truckElements = fixture.debugElement.queryAll(By.css('.truck'));
    expect(truckElements.length).toBeGreaterThanOrEqual(0);
  });
});

