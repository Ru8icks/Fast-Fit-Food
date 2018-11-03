
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AdunitService } from '../../services/adunit.service';
import { RecipeService } from '../../services/recipe.service';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {ArrayLikeObservable} from 'rxjs-compat/observable/ArrayLikeObservable';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-create',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  angForm: FormGroup;
  searchTerm: FormControl = new FormControl();
  ingredients: String[] = new Array<String>();

  searchResult;
  recipesResults;



  constructor(private adunitservice: AdunitService, private recipeService: RecipeService, private fb: FormBuilder) {
    this.searchTerm.valueChanges
      .debounceTime(400)
      .subscribe(data => {
        this.recipeService.getIngredient(data).subscribe(response => {
          console.log(response);
          this.searchResult = response;
        });
      });

  }



  ngOnInit() {
  }

  addIngredient(ingredient) {
    console.log(ingredient);
    this.ingredients.push(ingredient.trim());
    this.searchTerm.setValue('');
    return;
  }

  searchForRecipes(ingredients) {
    const search = this.createSearchString(ingredients);
    this.recipeService.searchForRecipes(search).subscribe(response => {
      this.recipesResults = response;
    });
  }

  private  createSearchString(ingredients ) {
    let searchString = '';
    for (const i of ingredients) {
      const searchItem = i.replace(' ', '+');
      searchString += searchItem + '%2C';
    }
    return searchString;
  }
}
