import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProgramService} from '../../services/program.service';
import {AuthService} from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';


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
      console.log('if ', this.profile);
      this.getPrograms(this.profile.nickname);
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log(this.profile, 'else');
        this.getPrograms(this.profile.nickname);
      });
    }
    // this.profile = this.route.snapshot.data['profile'];
    // console.log(this.profile.nickname, 'here');
  }
  getPrograms(nick) {
    this.programService.getPrograms(nick).subscribe(res => {
      console.log(res, ' programs');
      this.programs = Object.values(res);
    });
  }


  edit(id) {
    this.router.navigate([`program`, id]);

  }

  exercise() {

  }

  newProgram() {
    this.router.navigate([`program`]);
  }
}
