
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from './components/index/index.component';
import {EditComponent} from './components/edit/edit.component';
import {IngredientsComponent} from './components/ingredients/ingredients.component';
import {RecipeComponent} from './components/recipe/recipe.component';
import {CallbackComponent} from './components/callback/callback.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from './auth/auth.guard';
import {WriteReviewComponent} from './components/write-review/write-review.component';


export const routes: Routes = [
  {
    path: 'ingredients',
    component: IngredientsComponent,
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
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'index',
    component: IndexComponent,
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
    AuthGuard
  ],
  exports: [RouterModule]
})
export class AppRoutes { }




