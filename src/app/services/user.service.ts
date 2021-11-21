import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(user: User) {
    return this.http.post<any>('http://localhost:8080/add-user', user, { observe: 'response' });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/users');
  }

  deleteUser(id: number) {
    return this.http.delete<any>(`http://localhost:8080/delete-user/${id}`);
  }

  updateWarehouseState(user: User) {
    return this.http.put<any>(
      `http://localhost:8080/update-user`,
      user
    );
  }
}
