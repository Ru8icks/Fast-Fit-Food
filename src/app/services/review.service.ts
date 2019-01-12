import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  uri = 'http://localhost:4000/reviews';

  constructor(private http: HttpClient) { }


  addReview(title, review, rating, author, recipeId) {
    const obj = {
      title: title,
      review: review,
      rating: rating,
      author: author,
      reviewId: recipeId,
    };
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
  }
  getReviews(id) {
    console.log('reviewservicessses')
    return this
      .http
      .get(`${this.uri}/${id}`);
  }

  editReview(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }
  updateReview(title, review, rating, author, recipeId, id) {

    const obj = {
      title: title,
      review: review,
      rating: rating,
      author: author,
      reviewId: recipeId,
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
    return this.http.get(`${this.uri}`);
  }
  deleteReview(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }

}
