import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Admin } from '../model/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private BASE_URL = 'http://localhost:8081/api/admin';

  constructor(private http: HttpClient) {}   // ✅ REQUIRED

  getAll() {
    return this.http
      .get<any>(`${this.BASE_URL}/all`)
      .pipe(map(res => res.data));
  }

  create(admin: Admin) {
    return this.http
      .post<any>(`${this.BASE_URL}/register`, admin)
      .pipe(map(res => res.data));
  }

  update(id: number, admin: Admin) {
    return this.http
      .put<any>(`${this.BASE_URL}/update/${id}`, admin)
      .pipe(map(res => res.data));
  }

  delete(id: number) {
    return this.http
      .delete<any>(`${this.BASE_URL}/delete/${id}`);
  }
}
