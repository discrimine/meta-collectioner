import { Injectable } from '@angular/core';
import { Collection } from '../interfaces/profile.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  public getProfileCollections(): Collection[] {
    return [{ title: 'Anime', path: 'anime' }, { title: 'Books', path: 'books' }, { title: 'TV Shows', path: 'tvshows' }];
  }
}
