import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class PlayerService {

  playMixtape = new EventEmitter<any>();
  pauseMixtape = new EventEmitter<any>();

  constructor() {
  }

}
