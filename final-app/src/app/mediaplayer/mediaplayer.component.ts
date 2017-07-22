import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-mediaplayer',
  templateUrl: './mediaplayer.component.html',
  styleUrls: ['./mediaplayer.component.css'],
  providers: [PlayerService]
})
export class MediaplayerComponent implements OnInit {
  public player;
  public ytEvent;
	public id: string;
  public key: string = 'AIzaSyC4ahXrXTMbxD5JduIhh-UnH5yKLm2HiAk';
  public playing: boolean;

  constructor(public playerService:PlayerService) {
   }

  ngOnInit() {
    this.playerService.itemSelected.subscribe((data:any) => {
      console.log(data);
      console.log("we made it")
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
  }

  setPlaylistId(id,songLocation){
  	this.id = id;
  	this.loadVideo(songLocation);
  }

  loadVideo(songLocation){
  	this.player.loadVideoById(this.id,songLocation,"large");
  }
  changeVolume(){}

}
