import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/shared/services/auth.service';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isLoggedIn = false;
    private authStatusSubscription: Subscription = new Subscription();

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authStatusSubscription.add(
            this.authService.loggedUser.subscribe(user => {
                this.isLoggedIn = !!user;
            })
        );
    }

    ngOnDestroy() {
        this.authStatusSubscription.unsubscribe();
    }

    onLogout() {
        this.authService.logout();
    }
}
