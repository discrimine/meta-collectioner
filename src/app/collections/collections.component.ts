import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MyCollectionsService } from './shared/services/my-collections.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-collections',
    standalone: true,
    imports: [RouterOutlet, ProfileComponent],
    templateUrl: './collections.component.html',
    styleUrl: './collections.component.scss',
})
export class CollectionsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription();
    constructor(
        private myCollectionsService: MyCollectionsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.myCollectionsService.getCollections().subscribe(collections => {
                if (collections.length) {
                    this.router.navigate(['collections', collections[0].id]);
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
