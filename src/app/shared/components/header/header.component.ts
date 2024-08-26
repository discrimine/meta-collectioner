import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [MatToolbarModule, MatIconModule, MatButtonModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	constructor(private router: Router) {}

	goToHome(): void {
		this.router.navigate(['/']);
	}

	goToCollections(): void {
		this.router.navigate(['/collections/:collection']);
	}

	goToAbout(): void {
		this.router.navigate(['/about']);
	}
}
