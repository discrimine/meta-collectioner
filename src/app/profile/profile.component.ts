import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from './shared/services/profile.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Collection } from './shared/interfaces/profile.interfaces';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatDividerModule, MatListModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  public collections: Collection[] = [{ title: 'Settings', path: 'settings' }];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.collections.unshift(...this.profileService.getProfileCollections());
  }
}
