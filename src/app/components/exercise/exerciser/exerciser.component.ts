import { Component, OnInit } from '@angular/core';
import {ProgramService} from '../../../services/program.service';
import {WorkoutService} from '../../../services/workout.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  done = false;
  profile;

  constructor(private programService: ProgramService,
              private workoutService: WorkoutService,
              private auth: AuthService,
              private router: Router,
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
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
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
    // this.currentSet = this.sets.filter(x => x.name === this.currentEx);
    this.currentSet = this.exerciseFilter(this.sets, this.currentEx);

  }
  private exerciseFilter(sets, currentEx) {
    return sets.filter(x => x.name === currentEx);
  }

  nextExercise() {
    console.log(this.currentSet)
    if (this.currentSet.length === 0 ) {
      console.log('no skipping exercises fatty ')
      return;
    }
    console.log(this.sets[this.sets.length - 1], 'dubiduu');
    this.sets[this.sets.length - 1].max = this.max;
    console.log(this.sets);
    console.log(this.program);
    this.max = 0;
    if (this.program.length < 1) {
      console.log('yes');
      this.done = true;
      return;
    }

    this.currentEx = this.program.pop().name;
    // this.currentSet = this.sets.filter(x => x.name === this.currentEx);
    this.currentSet = this.exerciseFilter(this.sets, this.currentEx);
  }

  decReps() {
    if (this.reps < 1) {
      return;
    }
    this.reps--;
  }

  incReps() {
    this.reps++;
  }

  decWeight() {
    if (this.weight < 1) {
      return;
    }
    this.weight -= 5;
  }

  incWeight() {
    this.weight += 5;
  }

  saveWorkout() {
    console.log('save and exit ', new Date());
    this.workoutService.addWorkout(this.sets, this.profile.nickname, this.name);
    this.router.navigate([`exercise/`]);


  }
}
