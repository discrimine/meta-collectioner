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

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [MatDividerModule, MatListModule, RouterModule, MatButtonModule],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
	public readonly dialog = inject(MatDialog);
	public collections: Collection[] = [
		{ id: 'settings', title: 'Settings', path: 'settings' },
	];

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

		dialofRef.afterClosed().subscribe(collections => {
			if (collections?.length) {
				this.collections = collections;
			}
		});
	}
}
