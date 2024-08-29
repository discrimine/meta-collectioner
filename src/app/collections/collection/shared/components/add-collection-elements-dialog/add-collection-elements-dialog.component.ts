import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-add-collection-elements-dialog',
    standalone: true,
    imports: [MatDialogModule, MatInputModule, MatButtonModule],
    templateUrl: './add-collection-elements-dialog.component.html',
    styleUrl: './add-collection-elements-dialog.component.scss',
})
export class AddCollectionElementsDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { collectionName: string }) {}
}
