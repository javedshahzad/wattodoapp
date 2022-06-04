import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'ipage',
    loadChildren: () => import('./i-page/i-page.module').then( m => m.IPagePageModule)
  },
  {
    path: 'userco',
    loadChildren: () => import('./user-co/user-co.module').then( m => m.UserCoPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'addcard',
    loadChildren: () => import('./addcard/addcard.module').then( m => m.AddcardPageModule)
  },
  {
    path: 'favourites',
    loadChildren: () => import('./favourites/favourites.module').then( m => m.FavouritesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
