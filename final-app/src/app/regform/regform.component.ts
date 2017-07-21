import { Component, OnInit,Renderer2 } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ApiHandlerService } from '../api-handler.service';

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

  constructor(private renderer: Renderer2, private apiService: ApiHandlerService) { }

  ngOnInit() {
    this.current = 'signupform';
    this.composers = ['Beethoven','Verdi','Tchaikovsky','Chopin','Vivaldy','Pucchi','Handel','Bach','Mozart'];
    this.instruments = ['Piano','Bassoon','Clarinetto','Cello','Trombone','Harp']
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
    console.log(event);
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
    var user = {
      firstName: name[0],
      lastName: name[1],
      email: form.value.email,
      token: form.value.password,
      favInstruments: this.myinstruments,
      favComposer: this.mycomposers
    }

    this.apiService.apiCall('addNewUser',user,function(data){
      if (data.status == 200) {
        t.success = true;
      }
    });

  }
}
