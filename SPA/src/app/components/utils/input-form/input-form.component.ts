import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  @Input()
  bold : boolean = false;

  @Input()
  readonly : boolean = false;

  @Input()
  tip: string | undefined;

  @Input()
  value: any | undefined;

  @Input()
  label: string | undefined;

  @Input()
  variable: any | undefined;

  constructor() {
  }

  ngOnInit() {
  }

}
