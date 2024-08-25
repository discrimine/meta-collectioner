import { Component, inject, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Collection } from './shared/interfaces/profile.interfaces';
import { RouterModule } from '@angular/router';
import { MyCollectionsService } from './shared/services/my-collections.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddCollectionDialogComponent } from './shared/components/add-collection-dialog/add-collection-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RemoveCollectionDialogComponent } from './shared/components/remove-collection-dialog/remove-collection-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class ProfileComponent implements OnInit {
	private readonly dialog = inject(MatDialog);
	private readonly snackBar = inject(MatSnackBar);
	public collections: Collection[] = [
		{ id: 'settings', title: 'Settings', path: 'settings' },
	];
	public isDeleteMode: boolean = false;

	private subscriptions = new Subscription();

	constructor(private myCollectionsService: MyCollectionsService) {}

	ngOnInit(): void {
		this.subscriptions.add(
			this.myCollectionsService
				.getCollections()
				.subscribe((collections: Collection[]) => {
					this.collections = collections;
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
		const dialofRef = this.dialog.open(RemoveCollectionDialogComponent, {
			width: '300px',
			data: {
				collectionName: collection.title,
			},
		});
		dialofRef.afterClosed().subscribe(isDeleteConfirmed => {
			if (isDeleteConfirmed) {
				this.myCollectionsService
					.removeCollection(collection.id)
					.subscribe(collections => {
						this.collections = collections;
					});
				this.isDeleteMode = false;
			}
		});
	}
}
