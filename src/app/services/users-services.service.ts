import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersServicesService {

  private userDataURL = 'assets/heliverse_mock_data.json';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any[]> {
    return this.http.get<any[]>(this.userDataURL);
  } //method used to get data of all users from provided JSON file

  searchUsersByName(name: string, users: any[]): any[] {
    name = name.toLowerCase().trim(); //used to perform a case-insensitive search
    return users.filter((user) => user.first_name.toLowerCase().includes(name));
  } //method used to search users by name

}
