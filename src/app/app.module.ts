import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { IndexComponent } from './components/index/index.component';
import { EditComponent } from './components/edit/edit.component';
import {RouterModule} from '@angular/router';
import { routes } from './app.routes';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { HttpClientModule } from '@angular/common/http';

import { AdunitService } from './services/adunit.service';
import { RecipeService } from './services/recipe.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth/auth.guard';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatSelectModule } from '@angular/material';
import { RecipesComponent } from './components/recipes/recipes.component';

import {MatCardModule} from '@angular/material/card';
import { RecipeComponent } from './components/recipe/recipe.component';
import { CallbackComponent } from './components/callback/callback.component';


@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    IndexComponent,
    EditComponent,
    RecipesComponent,
    RecipeComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SlimLoadingBarModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
  ],
  providers: [
    AdunitService,
    RecipeService,
    AuthService,
    AuthGuard,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
