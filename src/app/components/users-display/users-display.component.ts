import { Component } from '@angular/core';
import { TeamServicesService } from 'src/app/services/team-services.service';
import { UsersServicesService } from 'src/app/services/users-services.service';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css'],
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

  constructor(
    private userService: UsersServicesService,
    private teamService: TeamServicesService
  ) {
    this.userService.getUserData().subscribe((data: any) => {
      this.users = data;
      this.uniqueDomains = this.extractUniqueDomains(this.users);
      this.applyFilters();
      this.updateTotalPage();
    });
  }

  extractUniqueDomains(users: any[]) {
    return users.reduce((domains, user) => {
      if (!domains.includes(user.domain)) {
        domains.push(user.domain);
      }
      return domains;
    }, []); //this method is to get unique domain values so that domains dont get repeated in selection menu.
  }

  applyFilters() {
    this.filteredUsers = this.users.filter((user) => {
      const domainFilter =
        this.selectedDomainFilter === 'All' ||
        user.domain === this.selectedDomainFilter;
      const genderFilter =
        this.selectedGenderFilter === 'All' ||
        user.gender === this.selectedGenderFilter;
      const availabilityFilter =
        this.selectedAvailabilityFilter === 'All' ||
        user.available === this.selectedAvailabilityFilter;
      const nameSearch = this.searchName.toLowerCase().trim();
      const fullName =
        user.first_name.toLowerCase() + ' ' + user.last_name.toLowerCase();
      const nameFilter =
        nameSearch === '' || fullName.toLowerCase().includes(nameSearch);
      return domainFilter && genderFilter && availabilityFilter && nameFilter;
    }); //filters are here
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex); //here all filtered values are stored 20 at a time
    this.updateTotalPage();
  } //this is the method for filters, two way data binding is used here for filters, first it stores values of users(gone through filters) into a array, then out of that array saves 20 values in another array which is used to display users.

  updateTotalPage() {
    this.totalPage = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  } //this method updates the total page value to be displayed in pagination, total pages updates as we apply filters.

  skipFirst() {
    this.currentPage = 1;
    this.applyFilters();
  } //this method is used to skip to first page, it does so by setting current page to 1.

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  } //this method is used to move to page, it check for which page we are on, and then reduces its value by 1, it also keeps on check that page number should not be less than 1.

  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.applyFilters();
    }
  } //this method moves to next page, here it checks for which page we are on and then increases its value by 1,it also keeps on check that page number should not be more than total pages.

  skipLast() {
    this.currentPage = this.totalPage;
    this.applyFilters();
  } ///this method is used to skip to last page, it does so by setting current page equal to total pages.

  addToTeam(user: any): void {
    this.teamService.addToTeam(user);
  } // this methods calls the team service and then uses its method to add a user to a team

  clearAllFilters() {
    this.searchName = '';
    this.selectedDomainFilter = 'All';
    this.selectedGenderFilter = 'All';
    this.selectedAvailabilityFilter = 'All';
    this.applyFilters();
  } // this method sets all the filter values yo default to clear all filters.
}
