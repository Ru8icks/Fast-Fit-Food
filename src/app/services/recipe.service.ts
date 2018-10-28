import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {APIKEY} from '../../../env';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getIngredient(ing) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Mashape-Key', APIKEY );
    headers = headers.append('X-Mashape-Host', 'spoonacular-recipe-food-nutrition-v1.p.mashape.com');

    return this
      .http
      .get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete?query=${ing}
      &number=5&intolerances=egg`,
        {headers}).subscribe(res => console.log(res));
  }
}


