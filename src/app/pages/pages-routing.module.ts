import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login_signUp/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from '../authentication/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: 'Login', pathMatch: 'full' }, //default route
  { path: 'Login', component: LoginComponent },
  { path: 'home', component: HomeComponent ,canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
