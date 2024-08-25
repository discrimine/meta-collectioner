import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, ProfileComponent, HeaderComponent, FooterComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'meta-collectioner';
}
