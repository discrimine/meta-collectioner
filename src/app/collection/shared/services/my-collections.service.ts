import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyCollectionsService {

  constructor() { }

  public getCollections() {
    localStorage.getItem('collections')
  }

  public addCollection(collectionName: string) {
    const collections = JSON.parse(localStorage.getItem('collections') || '{}');
    collections.collectionName = [];
    localStorage.setItem('collections', collections);
  }
}
