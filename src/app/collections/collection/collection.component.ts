import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Subscription, switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AddCollectionElementsDialogComponent } from './shared/components/add-collection-elements-dialog/add-collection-elements-dialog.component';
import { MyCollectionsService } from '../shared/services/my-collections.service';
import { Collection } from '../shared/interfaces/collections.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionElement } from './shared/interfaces/collection-elements.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    ],
    templateUrl: './collection.component.html',
    styleUrl: './collection.component.scss',
})
export class CollectionComponent implements OnInit, OnDestroy {
    public anime: CollectionElement[] = [];
    public isLoading: boolean = false;
    public collection!: Collection;

    private readonly dialog = inject(MatDialog);
    private readonly snackBar = inject(MatSnackBar);
    private subscriptions = new Subscription();

    constructor(
        private myCollectionsService: MyCollectionsService,
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
        this.dialog.open(AddCollectionElementsDialogComponent, {
            data: { collectionName: this.collection.title },
            width: '80vw',
            height: '80vh',
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
