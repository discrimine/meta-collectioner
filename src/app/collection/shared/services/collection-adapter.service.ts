import { Injectable } from '@angular/core';
import { AnimeService } from './anime.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionAdapterService {

  constructor(private animeService: AnimeService) { }

  public getCollection(collection: string) {

  }
}
