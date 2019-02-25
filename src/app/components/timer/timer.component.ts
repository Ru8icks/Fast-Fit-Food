import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timeLeft = 30;
  interval;
  on = false;
  startTime = 30;




  constructor() { }

  ngOnInit() {
  }
  startTimer() {
    this.on = true;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = this.startTime;
        this.pauseTimer();
      }
      console.log(this.timeLeft, this.startTime);
    }, 1000);
  }
  pauseTimer() {
    this.on = false;
    clearInterval(this.interval);
  }
  add() {
    this.timeLeft += 5;
    this.startTime = this.timeLeft;
  }

  sub() {
    if (this.timeLeft < 5) {
      this.timeLeft = 0;
      this.startTime = this.timeLeft;
      return;

    }
    this.timeLeft -= 5;
    this.startTime = this.timeLeft;
  }

}
