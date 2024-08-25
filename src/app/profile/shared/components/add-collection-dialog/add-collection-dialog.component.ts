import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
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
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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

	constructor(
		public dialogRef: MatDialogRef<AddCollectionDialogComponent>,
		private fb: FormBuilder
	) {}

	public clearSelection(): void {
		this.newCollectionForm.get('select')?.setValue('');
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
		const newCollectionName =
			this.newCollectionForm.get('select')?.value ||
			this.newCollectionForm.get('input')?.value;

		this.dialogRef.close({
			id:
				Date.now().toString(36) +
				Math.random().toString(36).slice(2, 11),
			title: newCollectionName,
			path: newCollectionName.replace(' ', '').toLowerCase(),
		});
	}
}
