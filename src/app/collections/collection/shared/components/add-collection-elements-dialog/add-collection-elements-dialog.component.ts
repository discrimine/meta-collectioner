import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, Subscription, switchMap } from 'rxjs';
import { AnimeService } from '../../services/anime.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { CollectionElement } from '../../interfaces/collection-elements.interfaces';
import { CommonModule } from '@angular/common';
import { IsElementAddedPipe } from '../../pipes/is-element-added.pipe';

@Component({
    selector: 'app-add-collection-elements-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatCardModule,
        IsElementAddedPipe,
    ],
    providers: [IsElementAddedPipe],
    templateUrl: './add-collection-elements-dialog.component.html',
    styleUrl: './add-collection-elements-dialog.component.scss',
})
export class AddCollectionElementsDialogComponent implements OnInit, OnDestroy {
    public searchInput: FormControl = new FormControl<string>('');
    public isLoading = false;
    public foundElements: CollectionElement[] = [];
    public elementsToAdd: CollectionElement[] = [];

    private subscriptions: Subscription = new Subscription();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { collectionName: string },
        private animeService: AnimeService,
        private isElementAdded: IsElementAddedPipe,
        private matDialogRef: MatDialogRef<AddCollectionElementsDialogComponent>
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.searchInput.valueChanges
                .pipe(
                    debounceTime(500),
                    switchMap(searchTerm => {
                        this.isLoading = true;
                        return this.animeService.getList(searchTerm);
                    })
                )
                .subscribe(value => {
                    this.foundElements = value;
                    this.isLoading = false;
                })
        );
    }

    public addRemoveElement(actionElement: CollectionElement): void {
        if (!this.isElementAdded.transform(actionElement, this.elementsToAdd)) {
            this.elementsToAdd.push(actionElement);
        } else {
            this.elementsToAdd = this.elementsToAdd.filter(
                element => element.id !== actionElement.id
            );
        }

        this.elementsToAdd = [...this.elementsToAdd];
    }

    public saveElementsInCollection(): void {
        this.matDialogRef.close(this.elementsToAdd);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
