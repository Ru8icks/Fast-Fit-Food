
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AdunitService } from '../../services/adunit.service';
import { FavouritesService } from '../../services/favourites.service';
import { RecipeService } from '../../services/recipe.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {ArrayLikeObservable} from 'rxjs-compat/observable/ArrayLikeObservable';
import {BehaviorSubject} from 'rxjs';
import {ReviewService} from '../../services/review.service';


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
  cookbook;
  profile;
  rank: number;



  constructor(private adunitservice: AdunitService, private recipeService: RecipeService,   private auth: AuthService, private fb: FormBuilder, private favouritesService: FavouritesService) {
    this.searchTerm.valueChanges
      .debounceTime(400)
      .subscribe(data => {
        this.recipeService.getIngredient(data).subscribe(response => {
          console.log(response);
          this.searchResult = response;
        });
      });
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }



  ngOnInit() {
  }

  addIngredient(ingredient) {
    console.log(ingredient);
    this.ingredients.push(ingredient.trim());
    this.searchTerm.setValue('');
    return;
  }
  removeIngredient(ingredient) {
    console.log(ingredient);
    this.ingredients = this.ingredients.filter(item => item !== ingredient);
    console.log(this.ingredients);
  }

  searchForRecipes(ingredients) {
    const search = this.createSearchString(ingredients);
    this.recipeService.searchForRecipes(search, this.rank).subscribe(response => {
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
  getCookBook() {
    this.favouritesService.getFavourites(this.profile.nickname).subscribe(response => {
      this.cookbook = response;
    });
    this.favouritesService.sendmail(this.profile.email).subscribe( res => {
      console.log(res);
    });
  }
}
