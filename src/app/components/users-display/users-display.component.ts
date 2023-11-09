import { Component, HostListener, OnInit } from '@angular/core';
import { TeamServicesService } from 'src/app/services/team-services.service';
import { UsersServicesService } from 'src/app/services/users-services.service';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];
  searchName: string = '';
  selectedDomainFilter: string = 'All';
  selectedGenderFilter: string = 'All';
  selectedAvailabilityFilter: boolean | 'All' = 'All';
  selectedFilters: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  uniqueDomains: string[] = [];
  totalPage: number = 0;

  constructor(private userService: UsersServicesService, private teamService: TeamServicesService) {
    this.userService.getUserData().subscribe((data: any) => {
      this.users = data;
      this.uniqueDomains = this.extractUniqueDomains(this.users);
      this.applyFilters();
      this.updateTotalPage();
    });
   }

  extractUniqueDomains(users: any[]): string[] {
    return users.reduce((domains, user) => {
      if (!domains.includes(user.domain)) {
        domains.push(user.domain);
      }
      return domains;
    }, []);
  }

  applyFilters(){
    this.filteredUsers = this.users.filter(user => {
      const domainFilter = this.selectedDomainFilter === 'All' || user.domain === this.selectedDomainFilter;
      const genderFilter = this.selectedGenderFilter === 'All' || user.gender === this.selectedGenderFilter;
      const availabilityFilter = this.selectedAvailabilityFilter === 'All' || user.available === this.selectedAvailabilityFilter;
      const nameSearch = this.searchName.toLowerCase().trim();
      const fullName = user.first_name.toLowerCase() + ' ' + user.last_name.toLowerCase();
      const nameFilter = nameSearch === '' || fullName.toLowerCase().includes(nameSearch);
      return domainFilter && genderFilter && availabilityFilter && nameFilter;
    });
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
    this.updateTotalPage();
  }

  updateTotalPage(){
    this.totalPage = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  skipFirst(){
    this.currentPage=1;
    this.applyFilters();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  nextPage(){
    const totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  skipLast(){
    this.currentPage=this.totalPage;
    this.applyFilters();
  }

  addToTeam(user: any): void {
    this.teamService.addToTeam(user);
  }

    clearAllFilters() {
    this.searchName = '';
    this.selectedDomainFilter = 'All';
    this.selectedGenderFilter = 'All';
    this.selectedAvailabilityFilter = 'All';
    this.applyFilters();
  }

}
