import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Collection } from '../interfaces/profile.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MyCollectionsService {

  constructor() { }

  public getCollections(): Observable<Collection[]> {
    return of(JSON.parse(localStorage.getItem('collections') || '[]'))
  }

  public addCollection(collectionName: string) {
    const collections = JSON.parse(localStorage.getItem('collections') || '[]');
    collections.collectionName = [];
    localStorage.setItem('collections', collections);
  }
}
