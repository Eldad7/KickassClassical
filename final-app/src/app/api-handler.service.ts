import { Injectable } from '@angular/core';
import {Headers,Http} from "@angular/http";

@Injectable()
export class ApiHandlerService {

  constructor(private http: Http) {
  }

  apiCallPost(api,sendData,cb) {
    var apiUrl = 'https://kickass-classical.herokuapp.com/';
    this.http.post(apiUrl+api,sendData).subscribe(data => {
      // Read the result field from the JSON response.
      cb(data);
    });

  }

  apiCallGet(api,cb) {
    var apiUrl = 'https://kickass-classical.herokuapp.com/';
    this.http.get(apiUrl+api).subscribe(data => {
      // Read the result field from the JSON response.
      cb(data);
    });

  }

}
