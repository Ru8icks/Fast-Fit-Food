import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {


uri = 'http://localhost:4000/reviews';

constructor(private http: HttpClient) { }


addFavourite(ingredients, image, title, diets, instructions, instructionsBySteps, readyInMinutes, sourceUrl, dishType, recipeId) {
  const obj = {
    ingredients: ingredients,
    image: image,
    title: title,
    diets: diets,
    instructions: instructions,
    instructionsBySteps: instructionsBySteps,
    readyInMinutes: readyInMinutes,
    sourceUrl: sourceUrl,
    dishType: dishType,
    favouriteId: recipeId,
  };
  this.http.post(`${this.uri}/addFave`, obj)
    .subscribe(res => console.log('Done'));
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
    .get(`${this.uri}/deleteFave/${id}`).subscribe(res => console.log('Done'));
}


  getFavourites() {
  console.log('getting faveourites');
    return this
      .http
      .get(`${this.uri}/`);
  }



}
