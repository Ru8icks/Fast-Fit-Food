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
              private auth: AuthService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.profile = this.route.snapshot.data.profile;
    console.log(this.profile.nickname, 'here');
    this.programService.getPrograms(this.profile.nickname).subscribe(res => {
      console.log(res, ' programs');
      this.programs = Object.values(res);
    });
  }


  edit() {

  }

  exercise() {

  }

  newProgram() {
    this.router.navigate([`program`]);
  }
}
