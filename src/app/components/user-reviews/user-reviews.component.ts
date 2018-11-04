import {Component, Input, OnInit} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {
  @Input() reviewsString: string;
  reviews;
  constructor() { }

  ngOnInit() {
    this.reviews = JSON.parse(this.reviewsString);
  }

}
