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

  filterPrograms() {
    const allProg = this.workouts.map(x =>  x.programName);
    console.log(allProg)
    const test = allProg.filter((v, i, a) => a.indexOf(v) === i);
    console.log(test);
  }

  filteredEx(){
    let allEx = this.workouts.map(x =>  x.sets);
    console.log(allEx);
    let allExNames = [];
    for (let ex of allEx) {
      console.log(ex)
      for (let x of ex) {
        console.log(x.name);
        allExNames.push(x.name);
      }
      // let exNames = ex.map(x => x.name)
      // allExNames.push(exNames)
      // console.log(ex.valueOf());
    }
    allExNames = allExNames.filter((v, i, a) => a.indexOf(v) === i);
    console.log(allExNames);

  }

  test() {
    for (const x of this.workouts) {
      console.log(x);
      if ( true ) {
        for (const set of x.sets) {
          if (this.barChartData.find( i => i.label === set.name)) {
            const data = this.barChartData.find( i => i.label === set.name);
            console.log(set.valueOf());
            data.data.push({t: new Date(x.date), y: set.valueOf().set.weight});
          }
        }

      }
    }
    console.log(this.barChartData);
    this.chart.chart.update();

  }
}



