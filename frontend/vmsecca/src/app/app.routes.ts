import { Routes } from '@angular/router';
import { Chat } from './components/chat';
import { Login } from './components/login/login';

export const routes: Routes = [

  {path: '', redirectTo: 'chat', pathMatch: 'full'}, // default route

  {path: 'chat', component: Chat},

  {path: 'login', component: Login}



];
