import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  buttonClicked = new EventEmitter();

  emitButtonClick() {
    this.buttonClicked.emit();
  }

  
}
