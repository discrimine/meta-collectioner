import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { filter, Subscription, switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AddCollectionElementsDialogComponent } from './shared/components/add-collection-elements-dialog/add-collection-elements-dialog.component';
import { MyCollectionsService } from '../shared/services/my-collections.service';
import { Collection, CollectionElement } from '../shared/interfaces/collections.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollectionElementsService } from './shared/services/collection-elements.service';
import { DeleteDialogComponent } from '../shared/components/delete-dialog/delete-dialog.component';
import { SearchPipe } from './shared/pipes/search.pipe';

@Component({
    selector: 'app-collection',
    standalone: true,
    imports: [
        HttpClientModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatProgressSpinnerModule,
        CommonModule,
        FormsModule,
        SearchPipe,
    ],
    templateUrl: './collection.component.html',
    styleUrl: './collection.component.scss',
})
export class CollectionComponent implements OnInit, OnDestroy {
    searchText: string = '';
    public isLoading: boolean = false;
    public collection!: Collection;

    private readonly dialog = inject(MatDialog);
    private readonly snackBar = inject(MatSnackBar);
    private subscriptions = new Subscription();

    constructor(
        private myCollectionsService: MyCollectionsService,
        private collectionElementsService: CollectionElementsService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.activatedRoute.params
                .pipe(
                    switchMap(params => {
                        return this.myCollectionsService.getCollectionById(params['collectionId']);
                    })
                )
                .subscribe({
                    next: collection => {
                        this.collection = collection;
                    },
                    error: error => {
                        this.snackBar.open(error, 'close', {
                            duration: 5000,
                            horizontalPosition: 'center',
                            verticalPosition: 'top',
                            panelClass: ['error-snackbar'],
                        });
                    },
                })
        );

        this.subscriptions.add(
            this.myCollectionsService.collections.subscribe(collections => {
                if (
                    !collections.find(
                        collection =>
                            collection.id === this.activatedRoute.snapshot.params['collectionId']
                    )
                ) {
                    if (collections.length) {
                        this.router.navigate(['collections', collections[0].id]);
                    } else {
                        this.router.navigate(['collections']);
                    }
                }
            })
        );
    }

    public openAddCollectionElementsDialog(): void {
        const dialofRef = this.dialog.open(AddCollectionElementsDialogComponent, {
            data: { collectionName: this.collection.title, collectionType: this.collection.id },
            width: '80vw',
            height: '80vh',
        });

        this.subscriptions.add(
            dialofRef
                .afterClosed()
                .pipe(
                    filter(
                        (elementsToAdd: CollectionElement[]) =>
                            Array.isArray(elementsToAdd) && !!elementsToAdd.length
                    ),
                    switchMap((elementsToAdd: CollectionElement[]) =>
                        this.collectionElementsService.addCollectionElements(
                            elementsToAdd,
                            this.collection.id
                        )
                    )
                )
                .subscribe((collections: Collection[]) => {
                    this.myCollectionsService.collections.next(collections);
                })
        );
    }

    public openDeleteCollectionDialog(): void {
        const dialofRef = this.dialog.open(DeleteDialogComponent, {
            width: '300px',
            data: {
                message: `Are you sure you want to delete collection ${this.collection.title}?`,
            },
        });

        this.subscriptions.add(
            dialofRef
                .afterClosed()
                .pipe(
                    filter(isDeleteConfirmed => !!isDeleteConfirmed),
                    switchMap(() => this.myCollectionsService.removeCollection(this.collection.id))
                )
                .subscribe(collections => {
                    this.myCollectionsService.collections.next(collections);
                })
        );
    }

    public openDeleteCollectionElementDialog(element: CollectionElement): void {
        const dialofRef = this.dialog.open(DeleteDialogComponent, {
            width: '300px',
            data: {
                message: `Are you sure you want to delete ${element.title} from the ${this.collection.title} collection?`,
            },
        });

        this.subscriptions.add(
            dialofRef
                .afterClosed()
                .pipe(
                    filter(isDeleteConfirmed => !!isDeleteConfirmed),
                    switchMap(() =>
                        this.collectionElementsService.deleteCollectionElement(
                            this.collection.id,
                            element.id
                        )
                    )
                )
                .subscribe(collections => {
                    this.myCollectionsService.collections.next(collections);
                })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
