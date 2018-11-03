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
  metric = true;
  dishType: String;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipeService.getRecipe(params['id']).subscribe(res => {
        console.log(res);
        // @ts-ignore
        console.log(res.extendedIngredients);
        // @ts-ignore
        this.ingredients = res.extendedIngredients;
        console.log(this.ingredients);
        // @ts-ignore
        this.image = res.image;
        // @ts-ignore
        this.title = res.title;
        // @ts-ignore
        this.diets = res.diets;
        // @ts-ignore
        this.sourceUrl = res.sourceUrl;
        // @ts-ignore
        if (res.analyzedInstructions[0]) {
          // @ts-ignore
          this.instructions = res.analyzedInstructions[0].steps;
        }
        // @ts-ignore
        this.readyInMinutes = res.readyInMinutes;
        console.log(this.instructions);
        // @ts-ignore
        this.dishType = res.dishTypes;
      });
    });
  }
  viewSource() {
    window.location.href = this.sourceUrl;
  }

  toggleMetric() {
    this.metric = !this.metric;
  }
}
