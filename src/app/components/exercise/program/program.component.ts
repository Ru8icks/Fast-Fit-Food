import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ProgramService} from '../../../services/program.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import schedule from 'node-schedule';


import {EmailService} from '../../../services/email.service';



export interface Exercise {
  name: string;
}


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  myControl = new FormControl();
  nameControl = new FormControl('', [Validators.required]);
  options: Exercise[] = [
    {name: 'Bench Press'},
    {name: 'Squats'},
    {name: 'Pull Ups'}
  ]
  program: Exercise[] = new Array<Exercise>();
  profile;
  name: string;
  filteredOptions: Observable<Exercise[]>;
  private edit = false;
  id;
  programForm: FormGroup;

  constructor(private programService: ProgramService,
              private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              ) {  }

  ngOnInit() {
    this.getProfile();
    this.route.params.subscribe(params => {
      if (params['id']) {
        console.log('params');
        this.edit = true;
        this.programService.getProgram(params['id']).subscribe((res  => {
          console.log(Object.values(res));
          console.log(res);
          // @ts-ignore
          this.program = res.program;
          // @ts-ignore
          this.nameControl.setValue(res.name);
          console.log(this.nameControl.value);
          // @ts-ignore
          this.id = res._id;

        }));
      }
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Exercise>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
    this.programForm = new FormGroup({
      nameControl: new FormControl('', [Validators.required]),
    });
  }

  displayFn(exercise ?: Exercise): string | undefined {
    return exercise ? exercise.name : undefined;
  }
  isProgramValid() {
    if (this.program.length > 0 && this.nameControl.valid) {
      return true;
    }
    return false;
  }

  private _filter(name: string): Exercise[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  addExercise() {
    console.log(this.myControl.value);
    this.program.push({name: this.myControl.value});
    this.myControl.setValue('');
    console.log(this.program);

  }

  saveProgram() {
    console.log('Save program', this.program, this.profile.nickname, this.nameControl.value, this.id);

    if (this.edit) {
      this.programService.updateProgram(this.program, this.profile.nickname, this.nameControl.value, this.id);
      console.log('edit ', this.edit);
    } else {
      this.programService.addProgram(this.program, this.profile.nickname, this.nameControl.value);
      console.log('edit ', this.edit);
    }
    this.router.navigate([`exercise/`]);

  }

  getProfile() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }


  deleteExercise(name: string) {
    this.program = this.program.filter(exercise => exercise.name !== name);
  }
}
