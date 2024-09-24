import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CssSelector} from "@angular/compiler";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'add-dialog',
  templateUrl: './add-dialog.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  @Input()
  customTitle!: string;

  @Input()
  mainPageTitle!: string;

  @Input()
  parameters: string[] = [];

  @Input()
  properties: string[] = [];

  @Input()
  dropdownList: string[] = [];

  @Input()
  dropdownVariable: string = ""

  @Input()
  callbackFunction: ((...args: any[]) => void) | undefined;

  @Input()
  color: string | undefined;

  @ViewChild("myForm") form: NgForm | undefined;

  counter: number = 0;

  constructor(
    private title: Title
  ) {
  }

  ngOnInit() {
  }

  changeTitle(){
    this.title.setTitle(this.mainPageTitle);
  }

  clear(){
    if (this.counter==0){
      this.form?.reset()
    }
    this.counter++;
  }

  onSubmit(){

    // Get the value of the dropdown
    const dropdownValue = this.form?.value[this.dropdownVariable];

    this.callbackFunction?.(this.form?.value);

    console.log(this.form?.value)
    this.form?.reset();

  }

}
