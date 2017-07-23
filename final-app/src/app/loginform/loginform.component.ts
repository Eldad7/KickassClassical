import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';
import { LocalStorageService } from 'angular-2-local-storage';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css'],
  providers: [ApiHandlerService]
})
export class LoginformComponent implements OnInit {

  public connectedId: string;
  public incorrectPass:boolean;
  constructor(public apiService:ApiHandlerService,public localStorage:LocalStorageService,public router: Router) { }

  ngOnInit() {
    this.incorrectPass = false;
  }

  submitForm(form: NgForm) {
    var t = this;
    t.incorrectPass = false;
    var sendObj = {
      email: form.value.email,
      token: form.value.token
    };
    this.apiService.apiCallPost('verifyTok',sendObj,function(data){
      console.log(data);
      if (data.status == 200) {
        var res = JSON.parse(data._body);
        if (res.data == null) {
          t.incorrectPass = true;
        } else {
          t.connectedId = res.data;
          t.localStorage.set('uid',t.connectedId);
          t.router.navigate(['/main']);
        }
      }
    })
  }

}
