import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  ingredients =  [];
  image: String;
  title: String;
  diets;
  instructions;
  readyInMinutes: number;
  sourceUrl;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipeService.getRecipe(params['id']).subscribe(res => {
        console.log(res);
        console.log(res.extendedIngredients);
        this.ingredients = res.extendedIngredients;
        console.log(this.ingredients);
        this.image = res.image;
        this.title = res.title;
        this.diets = res.diets;
        this.sourceUrl = res.sourceUrl;
        if (res.analyzedInstructions[0]) {
          this.instructions = res.analyzedInstructions[0].steps;
        }
        this.readyInMinutes = res.readyInMinutes;
        console.log(this.instructions);
      });
    });
  }
  viewSource() {
    window.location.href = this.sourceUrl;
  }

}
