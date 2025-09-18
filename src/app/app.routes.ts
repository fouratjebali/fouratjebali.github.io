import { RouterModule, Routes } from '@angular/router';
import { App } from './app';
import { Experience } from '../components/experience/experience';
import { Projects } from '../components/projects/projects';
import { Contact } from '../components/contact/contact';
import { About } from '../components/about/about';
import { Home } from '../components/home/home';
import { Education } from '../components/education/education';

import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'experience', component: Experience },
    { path: 'projects', component: Projects },
    { path: 'contact', component: Contact },
    { path: 'education', component: Education},
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })    
  export class AppRoutingModule { }
