import {Component, OnInit, ViewChild} from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import {AuthService} from '../../services/auth.service';
import {forEach} from '@angular/router/src/utils/collection';
import {BaseChartDirective} from 'ng2-charts';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;
  profile;
  workouts;


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'linear',
        time: {
          unit: 'day'
        }
      }]
    }
  };


  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Pull Ups'},

  ];

  constructor(private workoutService: WorkoutService,
              private auth: AuthService,
              ) { }

  ngOnInit() {
    this.getProfile();
  }

  getWorkouts(nick) {
    this.workoutService.getWorkouts(nick).subscribe(res =>  {
        console.log(res);
        this.workouts = res;
      }
    );
  }

  getProfile() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      this.getWorkouts(this.profile.nickname);
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.getWorkouts(this.profile.nickname);
      });
    }
  }

  filterPrograms(workouts) {
    const allProg = workouts.map(x =>  x.programName);
    console.log(allProg)
    return allProg.filter((v, i, a) => a.indexOf(v) === i);
  }

  filterEx(workouts) {
    const allEx = workouts.map(x =>  x.sets);
    console.log(allEx);
    let allExNames = [];
    for (let ex of allEx) {
      console.log(ex)
      for (let x of ex) {
        console.log(x.name);
        allExNames.push(x.name);
      }
    }
    allExNames = allExNames.filter((v, i, a) => a.indexOf(v) === i);
    console.log(allExNames);
    return allExNames;

  }
  test2() {
    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    const setNames = new Array<string>() ;
    for (const x of this.workouts) {
      for (const set of x.sets) {
        setNames.push(set.name);
      }
    }
    const uniqueSetNames = setNames.filter(unique);
    console.log(uniqueSetNames);
  }

  test() {
    this.barChartData = [
      {data: [], label: 'Pull Ups'},
      {data: [], label: 'Squats'},

    ];
    for (const x of this.workouts) {
      console.log(x);
        for (const set of x.sets) {
          console.log(set, ' first first')
          if (this.barChartData.find( i => i.label === set.name)) {
            const data = this.barChartData.find( i => i.label === set.name );
            console.log(set.valueOf());
            if (set.max) {
              console.log('max is here ', set.valueOf().max);
              data.data.push({t: new Date(x.date), y: set.valueOf().max});
            }
            // data.data.push({t: new Date(x.date), y: set.valueOf().set.weight});
          }
        }
    }
    console.log(this.barChartData);
    this.chart.chart.update();

  }
}



