import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimeService } from './shared/services/anime.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AnimeEntity } from './shared/interfaces/anime.interfaces';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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

	private subscriptions = new Subscription();

	constructor(
		private animeService: AnimeService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.subscriptions.add(
			this.activatedRoute.params.subscribe(params => {
				console.log(params);
			})
		);

		this.subscriptions.add(
			this.animeService.getList().subscribe((anime: AnimeEntity[]) => {
				this.anime = anime;
				this.isLoading = false;
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
