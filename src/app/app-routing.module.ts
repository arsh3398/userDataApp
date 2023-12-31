import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './components/teams/teams.component';
import { UsersDisplayComponent } from './components/users-display/users-display.component';

const routes: Routes = [
  {path:'',component:UsersDisplayComponent},
  {path:'teams',component:TeamsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
