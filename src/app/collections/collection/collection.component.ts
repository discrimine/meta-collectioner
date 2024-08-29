import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AnimeService } from './shared/services/anime.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AnimeEntity } from './shared/interfaces/anime.interfaces';
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
    public anime: AnimeEntity[] = [];
    public isLoading: boolean = true;

    private readonly dialog = inject(MatDialog);
    private subscriptions = new Subscription();
    private collection!: Collection;

    constructor(
        private myCollectionsService: MyCollectionsService,
        private animeService: AnimeService,
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

        this.subscriptions.add(
            this.animeService.getList().subscribe((anime: AnimeEntity[]) => {
                this.anime = anime;
                this.isLoading = false;
            })
        );
    }

    public openAddCollectionElementsDialog(): void {
        this.dialog.open(AddCollectionElementsDialogComponent, {
            data: { collectionName: this.collection.title },
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
