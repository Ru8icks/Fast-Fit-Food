import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProgramService} from '../../services/program.service';
import {AuthService} from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {ReminderService} from '../../services/reminder.service';


import { Subscription } from 'rxjs/Subscription';


@Component({
selector: 'app-exercise',
templateUrl: './exercise.component.html',
styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  programs: Array<Object>;
  profile;
  showModal: boolean;
  program: string;
  private subscription: Subscription;

  constructor(private router: Router,
              private programService: ProgramService,
              private auth: AuthService,
              private modalService: ReminderService) {}

  ngOnInit() {
    this.getProfile();
    this.modalService.currentToggle.subscribe(showModal => this.showModal = showModal);
    this.subscription = this.programService.observableProgram
      .subscribe(programs => {
        this.programs = programs;
      });
  }

  getPrograms(nick) {
    this.programService.getPrograms(nick);
  }


  edit(id) {
    this.router.navigate([`program`, id]);

  }

  exercise(id) {
    this.router.navigate([`exerciser`, id]);

  }

  newProgram() {
    this.router.navigate([`program`]);
  }
  deleteProgram(id) {
    this.programService.deleteProgram(id);
    console.log(this.programs);
  }

  toggleModal = () => {
    this.modalService.toggle();
  }

  toggleReminder(prog) {
    console.log(prog, this.showModal);
    this.program = prog;
    this.modalService.toggle();
  }

  getProfile() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log('if ', this.profile);
      this.getPrograms(this.profile.nickname);
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log(this.profile, 'else');
        this.getPrograms(this.profile.nickname);
      });
    }
  }

}
