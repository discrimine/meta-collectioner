import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';

@Component({
    selector: 'app-remove-collection-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './remove-collection-dialog.component.html',
    styleUrl: './remove-collection-dialog.component.scss',
})
export class RemoveCollectionDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<RemoveCollectionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { collectionName: string }
    ) {}

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }
}
