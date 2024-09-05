import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../shared/services/auth.service';
import { LoginData } from '../shared/intefaces/user.interfaces';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatSnackBarModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    loginObj: LoginData = {
        login: '',
        password: '',
    };

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    onLogin() {
        this.authService.login(this.loginObj).subscribe(
            () => {
                this.snackBar.open('User found...', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
                this.router.navigate(['/collections']);
            },
            () => {
                this.snackBar.open('Invalid username or password. Please try again.', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
            }
        );
    }
}
