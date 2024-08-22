import { Component, OnInit } from '@angular/core';
import { AnimeService } from './shared/services/anime.service';
import { HttpClientModule } from '@angular/common/http';
import { AnimeEntity } from './shared/interfaces/anime.interfaces';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [HttpClientModule, MatInputModule, MatIconModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {
  public anime: AnimeEntity[] = [];

  private subscriptions = new Subscription();

  constructor(private animeService: AnimeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params, 222)
    });

    this.animeService.getList().subscribe((anime: AnimeEntity[]) => {
      this.anime = anime;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
