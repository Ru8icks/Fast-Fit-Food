import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getIngredient(ing) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Mashape-Key', '6MxrlHD4rdmshUH0HFo3LE0ENz4np10m7vJjsnjlPnn47y5qzc');
    headers = headers.append('X-Mashape-Host', 'spoonacular-recipe-food-nutrition-v1.p.mashape.com');

    return this
      .http
      .get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete?query=${ing}
      &number=5&intolerances=egg`,
        {headers}).subscribe(res => console.log(res));
  }
}


