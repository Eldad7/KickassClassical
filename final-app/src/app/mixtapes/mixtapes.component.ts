import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-mixtapes',
  templateUrl: './mixtapes.component.html',
  styleUrls: ['./mixtapes.component.css'],
  providers: [ApiHandlerService]
})
export class MixtapesComponent implements OnInit {

  private currentMixtapes: any[];
  private loading: boolean;
  constructor(private apiService: ApiHandlerService, private localStorage: LocalStorageService) { }

  ngOnInit() {
    var t = this;
    this.loading = true;
    var id = '594b6596865f6a0011ebab7f';
    // var id = this.localStorage.get(key);
    this.apiService.apiCallGet('getUserById/'+id,function(data){
      console.log(data);
      if (data.status == 200) {
        var res = JSON.parse(data._body);
        var sendData = {
          instruments : res.data.favInstruments
        };
        t.apiService.apiCallPost('getMixtapesFiltered',sendData,function(data){
          console.log(data);
          if (data.status == 200) {
            var resb = JSON.parse(data._body);
            t.currentMixtapes = resb.data;
            t.loading=false;
          } else {
            console.log("error getmixtapefilterd")
          }
        });
      } else {
        console.log("error getuserbyid")
      }
    });
  }
}
