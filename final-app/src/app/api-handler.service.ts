import { Injectable } from '@angular/core';
import {Headers,Http} from "@angular/http";

@Injectable()
export class ApiHandlerService {

  constructor(private http: Http) { }

  apiCall(api,sendData,cb) {
    var apiUrl = 'https://kickass-classical.herokuapp.com/';
    this.http.post(apiUrl+api,sendData).subscribe(data => {
      // Read the result field from the JSON response.
      cb(data);
    });

  }

}
