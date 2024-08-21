import { Component, OnInit } from '@angular/core';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  public collections: any = ['Add Collection','Settings'];
  constructor(private profileService: ProfileService){

  }

  ngOnInit(): void { 
    this.collections.unshift(...this.profileService.getProfileCollections());
    console.log(this.collections, 111)
  }
}
