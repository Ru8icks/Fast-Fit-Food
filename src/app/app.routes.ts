
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from './components/index/index.component';
import {EditComponent} from './components/edit/edit.component';
import {CreateComponent} from './components/create/create.component';
import {RecipeComponent} from './components/recipe/recipe.component';


export const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'recipe/:id',
    component: RecipeComponent
  }
];
