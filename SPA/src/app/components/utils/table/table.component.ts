import {Component, ContentChildren, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FilterComponent} from "../filter/filter.component";
import {Router} from "@angular/router";

@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input()
  cancelable: boolean = false

  @Input()
  callbackFunction!: ((...args: any[]) => void);

  @ContentChildren(FilterComponent)
  filterFunction!: ((search: string) => Observable<any>);

  @Input()
  searchFunction!: ((search: string) => Observable<any>);

  @Input()
  color: string | undefined

  @Input()
  listOfObjects: any[] | undefined;

  @Input()
  object: string | undefined;

  userEmail!: string

  @Input()
  parameters: string[] = [];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  GetChildData(data:any){
    this.listOfObjects = data
  }

  unsorted(a: any, b: any): number { return 0; }

  changeUserEmail(email: any){
    if (this.cancelable){
      this.userEmail = String(email.email)
    }
  }

  changeActivate(...args: any[]) : void {
    this.callbackFunction(...args)
    args[0].active = !args[0].active
  }

  goToDetail(obj: string) {

    const firstPropertyValue = Object.values(obj)[0];
    let url = "/" + this.object + "sDetail/" + firstPropertyValue

    if (obj.hasOwnProperty("active")) {
      const activeIndex = Object.keys(obj).findIndex(key => key === "active");
      if (Boolean(Object.values(obj)[activeIndex])) {
        this.router.navigate([url]);
      }
    } else {
      this.router.navigate([url]);
    }



  }
}
