import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  showModal = false;

  private toggleSource = new BehaviorSubject<boolean>(this.showModal);
  currentToggle = this.toggleSource.asObservable();
  constructor() { }

  toggle() {
    console.log();
    this.toggleSource.next(!this.showModal);
    this.showModal = !this.showModal;
  }


}
