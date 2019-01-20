import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  programs: Array<Object>;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  edit() {

  }

  exercise() {

  }

  newProgram() {
    this.router.navigate([`program`]);
  }
}
