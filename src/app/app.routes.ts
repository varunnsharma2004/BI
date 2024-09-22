import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'User', pathMatch: 'full' }, 
{
    path:'User',loadChildren:()=>import('../app/pages/pages.module').then(m=> m.PagesModule)
}

];
