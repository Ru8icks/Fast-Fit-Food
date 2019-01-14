import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import { ReviewService} from '../../services/review.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FavouritesService} from '../../services/favourites.service';
import {AuthService} from '../../services/auth.service';
import {EmailService} from '../../services/email.service';

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
  instructionsBySteps;
  readyInMinutes: number;
  sourceUrl;
  metric = true;
  dishType: String;
  recipeId: number;
  reviews;
  isAddButton: boolean;
  profile;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private reviewService: ReviewService,
              private auth: AuthService,
              private favouritesService: FavouritesService,
              private emailService: EmailService) {
  }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
    this.route.params.subscribe(params => {
      this.recipeService.getInstructions(params['id']).subscribe(res => {
        console.log(Object.values(res).length)
        if (Object.values(res).length > 1) {
          console.log('steps');
          this.instructionsBySteps = res[0].steps;
        }
      });
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
        console.log(this.instructions);
        console.log(!this.instructionsBySteps);
        if (!this.instructionsBySteps) {
          // @ts-ignore
          if (res.analyzedInstructions.length === 1) {
            // @ts-ignore
            console.log(res.analyzedInstructions[0].steps);
            // @ts-ignore
            this.instructionsBySteps = res.analyzedInstructions[0].steps;
            this.instructions = ' ';
          } else {
            // @ts-ignore
            this.instructions = res.instructions;
          }
        }
        // @ts-ignore
        this.readyInMinutes = res.readyInMinutes;
        console.log(this.instructions);
        // @ts-ignore
        this.dishType = res.dishTypes;
        // @ts-ignore
        this.recipeId = res.id;
      });
      this.favouritesService.getFavourite(params['id']).subscribe(res => {
        if (Object.values(res).length >= 1) {
          this.isAddButton = true;
        } else {
          this.isAddButton = false;
        }
      });
    });
  }
  viewSource() {
    window.location.href = this.sourceUrl;
  }

  toggleMetric() {
    this.metric = !this.metric;
    console.log(this.profile);
  }

  viewReviews() {
    console.log(this.recipeId)
    this.reviewService.getReviews(this.recipeId).subscribe(res => {
      console.log(res);
      this.reviews = JSON.stringify(res);
      console.log(this.reviews);
    });
  }
  addToFaveourites() {
    console.log(this.isAddButton);
    console.log('testy tesasdasdt');
    if (!this.isAddButton) {
      console.log('is add ', this.isAddButton,  this.profile.nickname)
      this.favouritesService.addFavourite(this.image, this.title, this.recipeId, this.profile.nickname);
    } else {
      this.favouritesService.deleteFave(this.recipeId);
      console.log('is add da ', this.isAddButton);
    }
    this.isAddButton = !this.isAddButton;


  }

  emailIngredients() {
    const shoppingList = this.ingredients.map(item =>  item.name);
    let mailString = JSON.stringify(shoppingList).replace( '[' , ' ');
    mailString = mailString.replace( ']' , ' ');
    mailString = mailString.replace( /"/g, ' ' );
    console.log(shoppingList, ' shopping shopping  ', JSON.stringify(shoppingList).replace( '[' , ' ') )
    this.emailService.sendmail(this.profile.email, mailString).subscribe( res => {
      console.log(res);
    });
  }
}
