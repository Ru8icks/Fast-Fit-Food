import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {EmailService} from '../../../services/email.service';
import {ReminderService} from '../../../services/reminder.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  profile;
  days = [
    {value: '1', viewValue: 'Monday'},
    {value: '2', viewValue: 'Tuesday'},
    {value: '3', viewValue: 'Wednesday'},
    {value: '4', viewValue: 'Thursday'},
    {value: '5', viewValue: 'Friday'},
    {value: '6', viewValue: 'Saturday'},
    {value: '7', viewValue: 'Sunday'},

  ];
  hour = 0;
  min = 0;
  day: number;
  reminderForm: FormGroup;


  @Input()
  name: string;

  constructor( private auth: AuthService,
               private emailService: EmailService,
               private  modalService: ReminderService,
               ) { }




  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log('if ', this.profile);
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log(this.profile, 'else');
      });
    }
    this.reminderForm = new FormGroup({
      reminderDay: new FormControl('', [Validators.required]),

    });
  }




  decHour() {
    if (this.hour === 0) {
      return;
    }
    this.hour--;
  }

  incHour() {
    if (this.hour === 23) {
      return;
    }
    this.hour++;
  }

  decMin() {
    if (this.min === 0) {
      return;
    }
    this.min--;

  }
  incMin() {
    if (this.min === 59) {
      return;
    }
    this.min++;

  }


  save() {
    console.log('test');
    const msg = 'dont forget today is ' + this.name + ' day. You said you would workout today';
    const time = {
      hour: this.hour,
      min: this.min,
      msg: msg,
      mail: this.profile.email,
      day: this.day,
    };
    console.log(time);
    this.emailService.testMail(time);
    this.modalService.toggle();
  }


  setDay(value) {
    this.day = value;
    console.log(this.day);
  }
}
