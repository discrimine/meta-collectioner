import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

@Component({
    selector: 'app-collections',
    standalone: true,
    imports: [RouterOutlet, ProfileComponent],
    templateUrl: './collections.component.html',
    styleUrl: './collections.component.scss',
})
export class CollectionsComponent {}
