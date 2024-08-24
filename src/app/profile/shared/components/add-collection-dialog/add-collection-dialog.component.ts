import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	ValidationErrors,
} from '@angular/forms';
import { Collection } from '../../interfaces/profile.interfaces';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MyCollectionsService } from '../../services/my-collections.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-add-collection-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatButtonModule,
		MatSelectModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		MatIcon,
		CommonModule,
		ReactiveFormsModule,
	],
	templateUrl: './add-collection-dialog.component.html',
	styleUrl: './add-collection-dialog.component.scss',
})
export class AddCollectionDialogComponent {
	public newCollectionForm: FormGroup = this.fb.group(
		{
			select: [''],
			input: [''],
		},
		{
			validators: this.oneFieldFilledValidator,
		}
	);
	private snackBar = inject(MatSnackBar);
	public newCollection: Collection = { id: '', title: '', path: '' };

	constructor(
		public dialogRef: MatDialogRef<AddCollectionDialogComponent>,
		private fb: FormBuilder,
		private myCollectionService: MyCollectionsService
	) {}

	public onNewCollectionChange(e: MatSelectChange) {
		this.newCollection.id =
			Date.now().toString(36) + Math.random().toString(36).slice(2, 11);
		this.newCollection.title = e.value;
		this.newCollection.path = (e.value as string)
			.replace(' ', '')
			.toLowerCase();
	}

	public clearSelection(): void {
		this.newCollection = { id: '', title: '', path: '' };
	}

	public oneFieldFilledValidator(
		control: AbstractControl
	): ValidationErrors | null {
		const selectValue = control.get('select')?.value;
		const inputValue = control.get('input')?.value;

		if ((selectValue && inputValue) || (!selectValue && !inputValue)) {
			return { bothOrNoneFilled: true };
		}

		return null;
	}

	public saveNewCollection(): void {
		this.myCollectionService.addCollection(this.newCollection).subscribe({
			next: collections => {
				this.dialogRef.close(collections);
			},
			error: error => {
				this.snackBar.open(error, 'close', {
					duration: 5000,
					horizontalPosition: 'center',
					verticalPosition: 'top',
					panelClass: ['error-snackbar'],
				});
			},
		});
	}
}
