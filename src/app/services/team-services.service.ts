import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamServicesService {
  private team: any[] = [];

  constructor() {

        const storedTeam = sessionStorage.getItem('teamMembers');
    if (storedTeam) {
      this.team = JSON.parse(storedTeam);
    }

  }

  getTeam(): any[] {
    return this.team;
  }

  addToTeam(user: any): void {
    const isUserOnTeam = this.team.some((member) => member.id === user.id); //to check whether user already on team or not
    const isUserAvaiable = user.available == true;
    if (!isUserOnTeam && isUserAvaiable) {
      this.team.push(user); //if user is not on team
      this.saveTeamToSessionStorage();
      alert('User Added to Team')
    } else {
      if(isUserOnTeam){
        alert('User Already On Team')
      }
      else{
        alert('User is Not Available')
      }
    }
  }

  saveTeamToSessionStorage(): void {
    sessionStorage.setItem('teamMembers', JSON.stringify(this.team));
  }

  removeFromTeam(user: any): void {
    this.team = this.team.filter((member) => member.id !== user.id);//to remove user from team
    sessionStorage.setItem('teamMembers', JSON.stringify(this.team)); // Update session storage
  }
}
