import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  @Input() recipe: any;
  title: String;
  image: String;
  id: number;

  constructor() { }

  ngOnInit() {
    console.log(this.recipe);
    this.title  = this.recipe.title;
    this.image = this.recipe.image;
    this.id = this.recipe.id;
  }

}
