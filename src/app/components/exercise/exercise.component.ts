import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProgramService} from '../../services/program.service';
import {AuthService} from '../../services/auth.service';



@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  programs: Array<Object>;
  profile;

  constructor(private router: Router,
              private programService: ProgramService,
              private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }


  edit() {

  }

  exercise() {

  }

  newProgram() {
    this.router.navigate([`program`]);
  }
}
