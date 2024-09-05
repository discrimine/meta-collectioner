import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, of, Observable } from 'rxjs';
import { User, RegistrationData, LoginData } from '../intefaces/user.interfaces';

// TODO: backend only interface, remove when app migrated to real backend
interface BackendUser {
    id: string;
    email: string;
    password: string;
    login: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public loggedUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

    constructor(private router: Router) {}

    public registration(userData: RegistrationData): Observable<User> {
        let registeredUsers: BackendUser[];

        try {
            registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        } catch (error) {
            registeredUsers = [];
        }

        const isUserAlreadyRegistered = registeredUsers.find(
            registeredUser =>
                registeredUser.login === userData.login || registeredUser.email === userData.email
        );

        if (isUserAlreadyRegistered) {
            return throwError('email or login is already used');
        } else {
            const newUser = {
                ...userData,
                id: Date.now().toString(36) + Math.random().toString(36).slice(2, 11),
            };

            registeredUsers.push(newUser);

            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

            return of(newUser);
        }
    }

    public login(loggingUser: LoginData): Observable<User> {
        let users: BackendUser[] = [];

        try {
            users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        } catch (e) {
            users = [];
        }

        const loggedUser = users.find(
            (existingUser: BackendUser) =>
                loggingUser.login == existingUser.login &&
                loggingUser.password == existingUser.password
        );

        if (loggedUser) {
            const user: User = {
                id: loggedUser.id,
                login: loggedUser.login,
                email: loggedUser.email,
            };
            this.loggedUser.next(user);

            return of(user);
        } else {
            return throwError('User not found');
        }
    }

    public logout() {
        localStorage.removeItem('loggedUser');
        this.loggedUser.next(null);
        this.router.navigate(['/login']);
    }
}
