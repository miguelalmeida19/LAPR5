import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CssSelector} from "@angular/compiler";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {GoogleApiService} from "../../../services/google-api.service";

@Component({
  selector: 'cancel-dialog',
  templateUrl: './cancel-dialog.html',
  styleUrls: ['./cancel-dialog.component.css']
})
export class CancelDialogComponent implements OnInit {

  @Input()
  modalId!: string

  @Input()
  redirect!: boolean;

  @Input()
  mainPageTitle!: string;

  previousTitle!: string;

  @Input()
  userEmail!: string;

  counter: number = 0;

  constructor(
    private title: Title,
    private authService: AuthService,
    private router: Router, private readonly googleApi: GoogleApiService
  ) {
  }

  ngOnInit() {
    this.previousTitle = this.title.getTitle();
  }

  changeTitle() {
    this.title.setTitle(this.mainPageTitle);
  }


  recoverTitle() {
    this.title.setTitle(this.previousTitle);
  }

  onSubmit() {
    console.log(this.userEmail)
    this.authService.cancelAccount(this.userEmail).subscribe()
    if (this.redirect){
      this.googleApi.signOut()
    }
    location.reload();
  }
}
