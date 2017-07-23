import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';
import { LocalStorageService } from 'angular-2-local-storage';
import {Router} from "@angular/router";


@Component({
  selector: 'app-mixtapes',
  templateUrl: './mixtapes.component.html',
  styleUrls: ['./mixtapes.component.css'],
  providers: [ApiHandlerService]
})
export class MixtapesComponent implements OnInit {
  public sortActive: boolean;
  public currentMixtapes: any[];
  public loading: boolean;
  constructor(private apiService: ApiHandlerService, private localStorage: LocalStorageService, private router: Router) { }

  sortBy(param) {
    var t = this;
    switch(param){
      case 'title':
        t.currentMixtapes.sort(function(a, b) {
          var nameA = a.title.toUpperCase(); // ignore upper and lowercase
          var nameB = b.title.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        break;
      case 'num':
        t.currentMixtapes.sort(function (a, b) {
          return a.songList.length - b.songList.length;
        });
        break;
      case 'creator':
        t.currentMixtapes.sort(function(a, b) {
          var nameA = a.creatorName.toUpperCase(); // ignore upper and lowercase
          var nameB = b.creatorName.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        break;
    }

  }

  ngOnInit() {
    var t = this;
    this.loading = true;
    var id = this.localStorage.get('uid');
    if (!id) {
     this.router.navigate(['/login'])
    }
    this.apiService.apiCallGet('getUserById/'+id,function(data){

      if (data.status == 200) {
        var res = JSON.parse(data._body);

        t.localStorage.set('name',res.data.firstName+' '+res.data.lastName);
        t.localStorage.set('image',res.data.profileImg);
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
