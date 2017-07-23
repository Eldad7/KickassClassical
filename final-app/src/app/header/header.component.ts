import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LocalStorageService} from "angular-2-local-storage";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name:any;
  profileImg:any;
  constructor(public router: Router,public localStorage: LocalStorageService) { }

  ngOnInit() {
    this.name = this.localStorage.get('name');
    this.profileImg = this.localStorage.get('image');
  }

}
