import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';
import { RegistrationData } from '../shared/intefaces/user.interfaces';

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatSnackBarModule,
        CommonModule,
    ],
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
    signUpObj: RegistrationData = {
        login: '',
        email: '',
        password: '',
    };

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar
    ) {}

    onRegister(form: NgForm) {
        if (form.valid) {
            this.authService.registration(this.signUpObj).subscribe(
                user => {
                    this.snackBar.open(`${user.login} successfully registered!`, 'Close', {
                        duration: 3000,
                    });
                },
                error => {
                    console.log(error);
                    this.snackBar.open(error, 'Close', {
                        duration: 3000,
                    });
                }
            );
        }
    }
}
