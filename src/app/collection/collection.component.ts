import { Component, OnInit } from '@angular/core';
import { AnimeService } from './shared/services/anime.service';
import { HttpClientModule } from '@angular/common/http';
import { AnimeEntity } from './shared/interfaces/anime.interfaces';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [HttpClientModule, MatInputModule, MatIconModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {
  public anime: AnimeEntity[] = [];

  constructor(private animeService: AnimeService) { }

  ngOnInit(): void {
    this.animeService.getList().subscribe((anime: AnimeEntity[]) => {
      this.anime = anime;
    })
  }
}
