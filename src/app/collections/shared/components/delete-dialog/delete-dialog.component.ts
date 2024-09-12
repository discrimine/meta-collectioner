import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './delete-dialog.component.html',
    styleUrl: './delete-dialog.component.scss',
})
export class DeleteDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { message: string }
    ) {}
    onCancel(): void {
        this.dialogRef.close(false);
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }
}
