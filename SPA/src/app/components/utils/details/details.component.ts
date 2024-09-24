import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'details-component',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input()
  customTitle: string | undefined;

  @Input()
  color: string | undefined;


  constructor() {
  }

  ngOnInit() {
  }

}
