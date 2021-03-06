import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {APIKEY} from '../../../env';
import 'rxjs-compat/add/operator/map';
import {forEach} from '@angular/router/src/utils/collection';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getIngredient(ing) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Mashape-Key', APIKEY);
    headers = headers.append('X-Mashape-Host', 'spoonacular-recipe-food-nutrition-v1.p.mashape.com');
    const results = [];

    return this.http.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete?query=${ing}
      &number=5&intolerances=egg`,
      {headers}).map(res => {
        for (let i = 0; i < Object.keys(res).length ; i++) {
          console.log(res[i].name);
          results.push(res[i].name);

        }
        return results;
    });
  }
  searchForRecipes(ingredients, rank) {
    console.log(ingredients);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Mashape-Key', APIKEY);
    headers = headers.append('X-Mashape-Host', 'spoonacular-recipe-food-nutrition-v1.p.mashape.com');
    const results = [];
    console.log(rank, ' rank')

    return this.http.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?` +
      `ingredients=${ingredients}&number=50&ranking=${rank}`,
      {headers});


  }
  getRecipe(id) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Mashape-Key', APIKEY);
    headers = headers.append('X-Mashape-Host', 'spoonacular-recipe-food-nutrition-v1.p.mashape.com');

    return this.http.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information`,
      {headers});

  }
  getInstructions(id) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Mashape-Key', APIKEY);
    headers = headers.append('X-Mashape-Host', 'spoonacular-recipe-food-nutrition-v1.p.mashape.com');

    return this.http.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/analyzedInstructions?stepBreakdown=false`,
      {headers});
  }
}




