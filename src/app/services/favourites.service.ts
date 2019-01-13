import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {


uri = 'http://localhost:4000/reviews';

constructor(private http: HttpClient) { }


addFavourite( image, title, favouriteId, userId) {
  const obj = {
    image: image,
    title: title,
    favouriteId: favouriteId,
    userId: userId,
  };
  this.http.post(`${this.uri}/addFave`, obj)
    .subscribe(res => console.log('Done ', res));
}
getFavourite(id) {
  console.log('get favoruite ');
  return this
    .http
    .get(`${this.uri}/fave/${id}`);
}

deleteFave(id) {
  console.log('del rev');
  return this
    .http
    .get(`${this.uri}/deleteFave/${id}`).subscribe(res => console.log('Done ', res));
}


  getFavourites(id) {
  console.log('getting faveourites');
    return this
      .http
      .get(`${this.uri}/getFave/${id}`);
  }



}
