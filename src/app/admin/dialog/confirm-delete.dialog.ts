import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <div mat-dialog-content>
      Are you sure you want to delete this admin?
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close="false">Cancel</button>
      <button mat-raised-button color="warn" mat-dialog-close="true">
        Delete
      </button>
    </div>
  `
})
export class ConfirmDeleteDialog {}
