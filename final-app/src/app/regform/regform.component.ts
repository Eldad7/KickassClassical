import { Component, OnInit,Renderer2 } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ApiHandlerService } from '../api-handler.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-regform',
  templateUrl: './regform.component.html',
  styleUrls: ['./regform.component.css'],
  providers: [ApiHandlerService]
})
export class RegformComponent implements OnInit {

  current: string;
  composers: string[];
  instruments: string[];
  mycomposers: string[];
  myinstruments: string[];
  success: boolean;
  user: Object = {};

  constructor(private renderer: Renderer2, private apiService: ApiHandlerService, private _localStorage:LocalStorageService) { }

  ngOnInit() {
    var t = this
    this.composers = [];
    this.apiService.apiCallGet('getAllComposers',function(data){
      if (data.status == 200) {
        var res = JSON.parse(data._body);
        t.composers = res.data;
      }

    });
    this.current = 'signupform';
    this.instruments = [];
    this.apiService.apiCallGet('getAllInstruments',function(data){
      if (data.status == 200) {
        var res = JSON.parse(data._body);
        t.instruments = res.data;
      }
    });
    this.mycomposers = [];
    this.myinstruments = [];
    this.success = false;
  }

  test() {
    this.current = 'signupformb'
  }

  chooseComposer(event:any) {
    console.log(event);
    var a = this.renderer;
    var exist = false;

    for (var i=0; i<this.mycomposers.length; i++){
      if (this.mycomposers[i] == event.target.innerText) {
        exist = true;
        a.removeClass(event.target,"composer-clicked");
        console.log("exist");
        this.mycomposers.splice(i,1);
      }
    }

    if (!exist) {
      this.mycomposers.push(event.target.innerText);
      a.addClass(event.target,"composer-clicked");
      console.log("not exist");
      console.log(this.mycomposers);
    }
  }

  chooseInstrument(event:any) {
    var a = this.renderer;
    var exist = false;

    for (var i=0; i<this.myinstruments.length; i++){
      if (this.myinstruments[i] == event.target.innerText) {
        exist = true;
        a.removeClass(event.target,"composer-clicked");
        console.log("exist");
        this.myinstruments.splice(i,1);
      }
    }

    if (!exist) {
      this.myinstruments.push(event.target.innerText);
      a.addClass(event.target,"composer-clicked");
      console.log("not exist");
      console.log(this.myinstruments);
    }
  }

  advance(to: string) {
    this.current = to;
  }

  finish() {
    this.success = true;
  }

  onSubmit(form: NgForm) {
    var t = this;
    var name = form.value.fullname.split(' ');
    console.log(name);
    var user = {
      firstName: name[0],
      lastName: name[1],
      email: form.value.email,
      token: form.value.password,
      favInstruments: this.myinstruments,
      favComposer: this.mycomposers
    }

    this.apiService.apiCallPost('addNewUser',user,function(data){
      if (data.status == 200) {
        console.log(data);
        var res = JSON.parse(data._body);
        console.log(res);
        console.log(res.data._id);
        t.success = true;
        t._localStorage.set('uid',res.data._id);
      }
    });

  }
}
