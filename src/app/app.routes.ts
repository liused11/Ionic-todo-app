import { Routes } from '@angular/router';
import { MainLayoutPage } from './main-layout/main-layout.page'; 
import { HomePage } from './home/home.page';
import { AboutPage } from './pages/about/about.page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutPage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePage },
      { path: 'about', component: AboutPage },
    ]
  }
];
