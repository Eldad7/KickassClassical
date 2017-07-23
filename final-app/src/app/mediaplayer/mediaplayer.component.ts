import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-mediaplayer',
  templateUrl: './mediaplayer.component.html',
  styleUrls: ['./mediaplayer.component.css'],
  providers: []
})
export class MediaplayerComponent implements OnInit {
  public player;
  public ytEvent;
	public id: string;
  public key: string = 'AIzaSyC4ahXrXTMbxD5JduIhh-UnH5yKLm2HiAk';
  public playing: boolean;
  public mixtape: any;
  public active: boolean;
  constructor(public playerService:PlayerService) {
   }

  ngOnInit() {
    this.active = false;
    var t = this;
    this.playerService.playMixtape.subscribe((data:any) => {
      if (data.url) {
        t.setPlaylistId(data.url,0);
        t.mixtape = {
          title: data.title,
          creatorName: data.creatorName
        }
      }
    });

    this.playerService.pauseMixtape.subscribe((data:any) => {
      this.pause();
    })
  }

  onStateChange(event) {
    this.ytEvent = event.data;
    console.log(this.ytEvent);
  }

  savePlayer(player) {
    this.player = player;
  }

  play() {
    this.player.playVideo();
    this.playing=true;
  }

  pause() {
    this.player.pauseVideo();
    this.playing=false;
    this.playerService.pauseMixtape.emit(null);
  }

  setPlaylistId(id,songLocation){
  	this.id = id;
  	this.loadVideo(songLocation);
  }

  loadVideo(songLocation){
    this.active = true;
  	this.player.loadVideoById(this.id,songLocation,"large");
  	this.play();
  }
  changeVolume(){}

}
