import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReviewService} from '../../services/review.service';

import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css']
})
export class WriteReviewComponent implements OnInit {

  angForm: FormGroup;
  review: any = {};

  constructor( private router: Router,
               private route: ActivatedRoute,
               private fb: FormBuilder,
               private reviewService: ReviewService) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.review.id = params['id'];
    });
  }
  createForm() {
    this.angForm = this.fb.group({
      title: ['', Validators.required ],
      review: ['', Validators.required ],
      rating: ['', Validators.required ],
    });
  }
  addReview(title, review, rating) {
    console.log(this.review.id, title, review, rating)
    this.reviewService.addReview(title, review, rating, 'test', this.review.id );
  }

}
