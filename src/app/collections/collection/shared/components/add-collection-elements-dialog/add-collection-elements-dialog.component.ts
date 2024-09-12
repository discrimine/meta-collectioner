import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, Subscription, switchMap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { IsElementAddedPipe } from '../../pipes/is-element-added.pipe';
import { CollectionAdapterService } from '../../services/collection-adapter.service';
import {
    CollectionElement,
    CollectionType,
} from '../../../../shared/interfaces/collections.interfaces';

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
        MatPaginatorModule,
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
    public pageInfo: { pageIndex: number; length: number } = {
        pageIndex: 0,
        length: 0,
    };

    private subscriptions: Subscription = new Subscription();

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { collectionName: string; collectionType: CollectionType },
        private collectionAdapterService: CollectionAdapterService,
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
                        this.foundElements = [];
                        this.pageInfo.pageIndex = 0;

                        return this.collectionAdapterService.getList(
                            this.data.collectionType,
                            searchTerm,
                            0
                        );
                    })
                )
                .subscribe(collectionData => {
                    this.foundElements = collectionData.collections;
                    this.pageInfo.length = collectionData.total;
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

    public onPaginatorChange(event: PageEvent): void {
        this.pageInfo.pageIndex = event.pageIndex;

        if (this.searchInput.value) {
            this.isLoading = true;
            this.foundElements = [];

            this.subscriptions.add(
                this.collectionAdapterService
                    .getList(this.data.collectionType, this.searchInput.value, event.pageIndex)
                    .subscribe(collectionsData => {
                        this.foundElements = collectionsData.collections || [];
                        this.isLoading = false;
                    })
            );
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
