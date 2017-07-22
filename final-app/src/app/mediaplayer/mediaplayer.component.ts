import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mediaplayer',
  templateUrl: './mediaplayer.component.html',
  styleUrls: ['./mediaplayer.component.css'],
  template: `
        <div class="container">
      <section class="panel">
        <div class="panel-body">
          <youtube-player 
            [videoId]="id" 
            (ready)="savePlayer($event)"
            (change)="onStateChange($event)"
            [width]=10
            [height]=10
          style="visibility: hidden;">
          </youtube-player>
        </div>
      </section>
      
      <div class="col-md-12">
        <div class="btn-group" role="group">
        	<button type="button" class="btn btn-default" (click)="setPlaylistId('6JQm5aSjX6g',0)">Load best of Bach song #1</button>
         	<button type="button" class="btn btn-default" (click)="play()">Play</button>
          	<button type="button" class="btn btn-default" (click)="pause()">Pause</button>
          	<button type="button" class="btn btn-default" (click)="setPlaylistId('6JQm5aSjX6g',550)">Change video to song #3</button>
        </div>
      </div>
    </div>`
})
export class MediaplayerComponent implements OnInit {
	private player;
	private ytEvent;
	private id: string;
	private key: string = 'AIzaSyC4ahXrXTMbxD5JduIhh-UnH5yKLm2HiAk';

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
