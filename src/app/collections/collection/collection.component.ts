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
import { ActivatedRoute } from '@angular/router';
import { CollectionElement } from './shared/interfaces/collection-elements.interfaces';

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
    public isLoading: boolean = true;

    private readonly dialog = inject(MatDialog);
    private subscriptions = new Subscription();
    private collection!: Collection;

    constructor(
        private myCollectionsService: MyCollectionsService,
        private router: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.router.params
                .pipe(
                    switchMap(params => {
                        return this.myCollectionsService.getCollectionById(params['collectionId']);
                    })
                )
                .subscribe(collection => {
                    this.collection = collection;
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
