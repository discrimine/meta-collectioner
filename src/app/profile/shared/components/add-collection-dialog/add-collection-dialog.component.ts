import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { Collection } from '../../interfaces/profile.interfaces';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-collection-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, MatIcon, CommonModule, ReactiveFormsModule],
  templateUrl: './add-collection-dialog.component.html',
  styleUrl: './add-collection-dialog.component.scss'
})
export class AddCollectionDialogComponent {
  public newCollectionForm: FormGroup = this.fb.group({
    select: '',
    input: ''
  }, { validators: this.oneFieldFilledValidator });
  public newCollection: Collection = { id: '', title: '', path: '' };

  constructor(private fb: FormBuilder) {}

  public onNewCollectionChange(e: MatSelectChange) {
    this.newCollection.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 11);
    this.newCollection.title = e.value;
    this.newCollection.path = (e.value as string).replace(' ', '').toLowerCase();
  }

  public clearSelection(): void {
    this.newCollection = { id: '', title: '', path: '' }
  }

  public oneFieldFilledValidator(form: FormGroup): ValidationErrors | null {
    const selectValue = form.get('select')?.value;
    const inputValue = form.get('input')?.value;

    console.log(selectValue, inputValue);

    if ((selectValue && inputValue) || (!selectValue && !inputValue)) {
      return { bothOrNoneFilled: true };
    }

    return null;
  }

  public saveNewCollection(): void {
    console.log(this.newCollectionForm)
  }
}
