import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

import {PathSearchComponent} from '../path/path-search/path-search.component';
import {MessagesComponent} from "./messages.component";

describe('MessageComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed
      .configureTestingModule({
        declarations: [MessagesComponent],
        imports: [RouterTestingModule.withRoutes([])],
        providers: []
      })
      .compileComponents();

    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
