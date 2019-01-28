import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ProgramService} from '../../../services/program.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';


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
  nameControl = new FormControl();
  options: Exercise[] = [
    {name: 'Bench Press'},
    {name: 'Squats'},
    {name: 'Pull Ups'}
  ]
  program: Exercise[] = new Array<Exercise>();
  profile;
  name: string;
  filteredOptions: Observable<Exercise[]>;

  constructor(private programService: ProgramService,
              private auth: AuthService,
              private route: ActivatedRoute) {

    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        console.log('params')
        this.programService.getProgram(params['id']).subscribe((res  => {
          console.log(Object.values(res));
          console.log(res);
          // @ts-ignore
          this.program = res.program;
          // @ts-ignore
          this.nameControl.setValue(res.name);

        }));
      }
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Exercise>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(exercise ?: Exercise): string | undefined {
    return exercise ? exercise.name : undefined;
  }

  private _filter(name: string): Exercise[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  addExercise() {
    console.log(this.myControl.value)
    this.program.push(this.myControl.value);
    this.myControl.setValue('');
  }

  saveProgram() {
    console.log('Save program');
    this.programService.addProgram(this.program, this.profile.nickname, this.nameControl.value);

  }

  inputer() {
    console.log(this.name);
  }
}
