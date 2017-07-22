import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mediaplayer',
  templateUrl: './mediaplayer.component.html',
  styleUrls: ['./mediaplayer.component.css']
})
export class MediaplayerComponent implements OnInit {
  public player;
  public ytEvent;
	public id: string;
  public key: string = 'AIzaSyC4ahXrXTMbxD5JduIhh-UnH5yKLm2HiAk';

  constructor() {
   }

  ngOnInit() {
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
  }

  pause() {
    this.player.pauseVideo();
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
