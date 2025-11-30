import { Routes } from '@angular/router';
import { Chat } from './components/chat';

export const routes: Routes = [

  {path: '', redirectTo: 'chat', pathMatch: 'full'}, // default route

  {path: 'chat', component: Chat}


];
