import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  playing: boolean;
  uid: any;
  constructor(private renderer: Renderer2, private route: ActivatedRoute, private apiHandler: ApiHandlerService, private localStorage: LocalStorageService, private playService : PlayerService, private router: Router) { }

  playMixtape() {
    this.playing = true;
    this.playService.playMixtape.emit(this.mixtape);
  }

  pauseMixtape() {
    this.playing = false;
    this.playService.pauseMixtape.emit(this.mixtape);
  }

  likeComposition(cId,index,event) {
    var t = this;
    var a = this.renderer;
    if (!t.tracks[index].myLike) {
      var sendData = {
        uId: this.uid,
        cId: cId
      };
      this.apiHandler.apiCallPost('likeComposition', sendData, function (data) {
        if (data.status == 200) {
          var res = JSON.parse(data._body);
          console.log(res);
          if (res.code == 200) {
            t.tracks[index].myLike = true;
            t.tracks[index].likes++;
            a.addClass(event.target,"glyphicon-heart");
            a.removeClass(event.target,"glyphicon-heart-empty");
          }
        }
      })
    }
  }

  ngOnInit() {

    this.uid = this.localStorage.get('uid');
    if (!this.uid) {
      this.router.navigate(['/login'])
    }

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
            for (let i=0; i<t.tracks.length; i++) {
              t.tracks[i].timeLengthF = new Date(t.tracks[i].timeLength * 1000).toISOString().substr(11, 8);
            }
            t.apiHandler.apiCallGet('getUserById/'+t.uid,function (data) {
              if (data.status = 200) {
                var res = JSON.parse(data._body);
                for (let i=0; i<res.data.liked.length; i++) {
                  for (let j=0; j<t.tracks.length; j++) {
                    if (t.tracks[j]._id == res.data.liked[i]) {
                      t.tracks[j].myLike = true;
                    }
                  }
                }
              }
            })
          }
        })
      }
    });

  }


}
