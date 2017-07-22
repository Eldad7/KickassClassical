import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlerService } from '../api-handler.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-single-mixtape',
  templateUrl: './single-mixtape.component.html',
  styleUrls: ['./single-mixtape.component.css'],
  providers: [ApiHandlerService]
})
export class SingleMixtapeComponent implements OnInit {

  id: string;
  tracks: any[];
  mixtape: any;
  constructor(private route: ActivatedRoute, private apiHandler: ApiHandlerService, private localStorage: LocalStorageService, private playService : PlayerService) { }

  playMixtape() {
    console.log('1st');
    this.playService.itemSelected.emit(this.mixtape)
  }

  ngOnInit() {
    this.mixtape = {};
    var t = this;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.apiHandler.apiCallGet('getMixtapeById/'+this.id,function(data){
      console.log(data);
      if (data.status = 200) {
        var res = JSON.parse(data._body);
        t.mixtape = res.data;
        t.apiHandler.apiCallPost('getCompositionsByIds',res.data,function(data){
          console.log(data);
          if (data.status = 200) {
            var res = JSON.parse(data._body);
            t.tracks = res.data;
          }
        })
      }
    })

  }

}
