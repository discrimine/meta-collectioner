import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Collection } from '../shared/interfaces/collections.interfaces';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MyCollectionsService } from '../shared/services/my-collections.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCollectionDialogComponent } from './shared/components/add-collection-dialog/add-collection-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from '../shared/components/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, Subscription } from 'rxjs';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule,
        MatDividerModule,
        MatListModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
    public collections: Collection[] = [];
    public isDeleteMode: boolean = false;
    public currentlyOpenedCollection: string = '';

    private readonly dialog = inject(MatDialog);
    private readonly snackBar = inject(MatSnackBar);
    private subscriptions = new Subscription();

    constructor(
        private myCollectionsService: MyCollectionsService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.myCollectionsService.collections.subscribe(collections => {
                this.collections = collections;
            })
        );

        this.subscriptions.add(
            this.router.events
                .pipe(filter(event => event instanceof NavigationEnd))
                .subscribe(() => {
                    this.currentlyOpenedCollection =
                        this.activatedRoute.firstChild?.snapshot.params['collectionId'];
                })
        );
    }

    public openAddCollectionDialog(): void {
        const dialofRef = this.dialog.open(AddCollectionDialogComponent, {
            width: '300px',
        });

        dialofRef.afterClosed().subscribe(collection => {
            if (collection) {
                this.myCollectionsService.addCollection(collection).subscribe({
                    next: collections => {
                        this.collections = collections;
                        this.router.navigate(['collections', collection.id]);
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
        });
    }

    public removeCollection(collection: Collection): void {
        const dialofRef = this.dialog.open(DeleteDialogComponent, {
            width: '300px',
            data: {
                message: `Are you sure you want to delete collection ${collection.title}?`,
            },
        });
        dialofRef.afterClosed().subscribe(isDeleteConfirmed => {
            if (isDeleteConfirmed) {
                this.myCollectionsService.removeCollection(collection.id).subscribe(collections => {
                    this.collections = collections;
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
