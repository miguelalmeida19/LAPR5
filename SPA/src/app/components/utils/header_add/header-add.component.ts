import {Component, Input, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'header-add',
  templateUrl: './header-add.component.html',
  styleUrls: ['./header-add.component.css']
})
export class HeaderAddComponent implements OnInit {

  @Input()
  customTitle!: string;

  @Input()
  customDescription: string | undefined;

  @Input()
  addWord!: string;

  @Input()
  color: string | undefined;

  constructor(
    private title: Title
  ) {
  }

  ngOnInit() {
  }

  changeTitle(){
    this.title.setTitle("Add " + this.customTitle);
  }

}
