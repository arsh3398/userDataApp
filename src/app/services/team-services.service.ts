import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamServicesService {
  team: any[] = [];

  constructor() {
    const storedTeam = sessionStorage.getItem('teamMembers');
    if (storedTeam) {
      this.team = JSON.parse(storedTeam);
    } //this is to store team details on session storage
  }

  getTeam(): any[] {
    return this.team;
  } //this method is to get data of users.

  addToTeam(user: any) {
    const isUserOnTeam = this.team.some((member) => member.id === user.id); //to check whether user already on team or not
    const isDomainOnTeam = this.team.some((member) => member.domain === user.domain); //to check whether user with one domain already on team or not
    const isUserAvaiable = user.available == true; //to check if user is available or not
    if (!isUserOnTeam && isUserAvaiable && !isDomainOnTeam) {
      this.team.push(user); //if user is not on team
      this.saveTeamToSessionStorage();
      alert('User Added to Team');
    } else {
      if (isUserOnTeam) {
        alert('User Already On Team');
      } 
      else if(isDomainOnTeam){
        alert('User With Same Domain Already On Team');
      }
      else {
        alert('User is Not Available');
      }
    }
  } //this method is to add user to team

  saveTeamToSessionStorage() {
    sessionStorage.setItem('teamMembers', JSON.stringify(this.team));
  } //this method is to save data of team to session storage.

  removeFromTeam(user: any) {
    this.team = this.team.filter((member) => member.id !== user.id); //to remove user from team
    sessionStorage.setItem('teamMembers', JSON.stringify(this.team)); // Update session storage
  }
} //this method is to save data of team after removing a user to session storage.

function elseif() {
  throw new Error('Function not implemented.');
}

