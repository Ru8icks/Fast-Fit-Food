
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from './components/index/index.component';
import {EditComponent} from './components/edit/edit.component';
import {IngredientsComponent} from './components/ingredients/ingredients.component';
import {RecipeComponent} from './components/recipe/recipe.component';
import {CallbackComponent} from './components/callback/callback.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from './auth/auth.guard';
import {WriteReviewComponent} from './components/write-review/write-review.component';
import {ExerciseComponent} from './components/exercise/exercise.component';
import {ProgramComponent} from './components/exercise/program/program.component';

import {ExerciserComponent} from './components/exercise/exerciser/exerciser.component';


export const routes: Routes = [
  {
    path: 'ingredients',
    component: IngredientsComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'exercise',
    component: ExerciseComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'exerciser/:id',
    component: ExerciserComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'program',
    component: ProgramComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'program/:id',
    component: ProgramComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'home',
    component: IngredientsComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'recipe/:id',
    component: RecipeComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'writeReview/:id',
    component: WriteReviewComponent,
    canActivate: [
      AuthGuard
    ]
  }, {
    path: 'callback',
    component: CallbackComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    AuthGuard,
  ],
  exports: [RouterModule]
})
export class AppRoutes { }




