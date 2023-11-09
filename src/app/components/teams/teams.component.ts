import { Component } from '@angular/core';
import { TeamServicesService } from 'src/app/services/team-services.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  teamMembers: any[] = [];

  constructor(private teamService: TeamServicesService) {
    this.teamMembers = this.teamService.getTeam();
  }
  removeFromTeam(user: any) {
    this.teamService.removeFromTeam(user);
  } //this method calls a team service that removes a user form team
}
