import { Component, OnInit } from '@angular/core';
import {ProgramService} from '../../../services/program.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';

interface Set {
  name: string;
  set: {reps: number,
    weight: number
  };
  max?: number;
}

@Component({
  selector: 'app-exerciser',
  templateUrl: './exerciser.component.html',
  styleUrls: ['./exerciser.component.css']
})
export class ExerciserComponent implements OnInit {
  private program;
  private name;
  private reps = 8;
  private weight = 10;
  private type = 'Weight';
  private currentEx;
  private sets: Array<Set> = new Array<Set>();
  private max = 0;
  public currentSet:  Array<Set> = new Array<Set>();

  constructor(private programService: ProgramService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.programService.getProgram(params['id']).subscribe((res  => {
        console.log(Object.values(res));
        console.log(res);
          // @ts-ignore
          this.program = res.program;
          // @ts-ignore
          this.name = res.name;
          this.currentEx = this.program.pop().name;
        console.log(res);
        }));
    });
  }

  toggle() {
    if (this.type === 'Weight') {
      this.type = 'Time';
    } else {
      this.type = 'Weight';
    }
  }

  addSet() {
    const set: Set = {
      name: this.currentEx,
      set: {reps: this.reps,
            weight: this.weight
      },
    };
    console.log(set);
    this.sets.push(set);
    console.log(this.sets);
    if (this.weight > this.max) {
      this.max = this.weight;
    }
    this.currentSet = this.sets.filter(x => x.name === this.currentEx);

  }

  nextExercise() {
    console.log(this.sets[this.sets.length - 1], 'dubiduu')
    this.sets[this.sets.length - 1].max = this.max;
    console.log(this.sets);
    console.log(this.program);
    this.max = 0;
    if (this.program.length < 1) {
      console.log('yes');
      return;
    }

    this.currentEx = this.program.pop().name;
    this.currentSet = this.sets.filter(x => x.name === this.currentEx);
  }
}
