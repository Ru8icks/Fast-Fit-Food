import { Component, OnInit } from '@angular/core';
import {ProgramService} from '../../../services/program.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';



@Component({
  selector: 'app-exerciser',
  templateUrl: './exerciser.component.html',
  styleUrls: ['./exerciser.component.css']
})
export class ExerciserComponent implements OnInit {
  program;
  nameControl = new FormControl();

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
          this.nameControl.setValue(res.name);
        }));
    });
  }

}
