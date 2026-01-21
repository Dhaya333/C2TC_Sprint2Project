import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Admin {
  id?: number;
  username: string;
  password: string;
  email: string;
  fullName: string;
  role?: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  private BASE_URL = 'http://localhost:8081/api/admin';

  admins: Admin[] = [];

  form: Admin = {
    username: '',
    password: '',
    email: '',
    fullName: ''
  };

  isEdit = false;

  displayedColumns: string[] = ['id', 'username', 'fullName', 'email', 'actions'];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.http.get<any>(`${this.BASE_URL}/all`)
      .subscribe({
        next: res => {
          console.log('Loaded admins:', res);
          this.admins = res.data || res || [];
        },
        error: (err) => {
          console.error('Failed to load admins:', err);
          this.snackBar.open('Failed to load admins', 'Close', { duration: 3000 });
        }
      });
  }

  submit(): void {
    if (!this.form.username || !this.form.password || !this.form.email || !this.form.fullName) {
      this.snackBar.open('All fields are required', 'Close', { duration: 2000 });
      return;
    }

    if (this.form.password.length < 8) {
      this.snackBar.open('Password must be at least 8 characters', 'Close', { duration: 2000 });
      return;
    }

    if (this.isEdit && this.form.id) {
      this.updateAdmin();
    } else {
      this.createAdmin();
    }
  }

  createAdmin(): void {
    const payload = {
      username: this.form.username,
      password: this.form.password,
      email: this.form.email,
      fullName: this.form.fullName
    };

    this.http.post<any>(`${this.BASE_URL}/register`, payload)
      .subscribe({
        next: res => {
          this.snackBar.open('Admin created successfully', 'Close', { duration: 2000 });
          this.resetForm();
          this.loadAdmins();
        },
        error: (err) => {
          console.error('Create failed:', err);
          this.snackBar.open('Create failed', 'Close', { duration: 3000 });
        }
      });
  }

  edit(admin: Admin): void {
    this.form = { ...admin };
    this.isEdit = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateAdmin(): void {
    this.http.put<any>(`${this.BASE_URL}/update/${this.form.id}`, this.form)
      .subscribe({
        next: res => {
          this.snackBar.open('Admin updated successfully', 'Close', { duration: 2000 });
          this.resetForm();
          this.loadAdmins();
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.snackBar.open('Update failed', 'Close', { duration: 3000 });
        }
      });
  }

  deleteAdmin(id: number): void {
    if (!confirm('Are you sure you want to delete this admin?')) return;

    this.http.delete<any>(`${this.BASE_URL}/delete/${id}`)
      .subscribe({
        next: res => {
          this.snackBar.open('Admin deleted successfully', 'Close', { duration: 2000 });
          this.loadAdmins();
        },
        error: (err) => {
          console.error('Delete failed:', err);
          this.snackBar.open('Delete failed', 'Close', { duration: 3000 });
        }
      });
  }

  resetForm(): void {
    this.form = {
      username: '',
      password: '',
      email: '',
      fullName: ''
    };
    this.isEdit = false;
  }
}