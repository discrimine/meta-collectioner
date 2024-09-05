export interface User {
    id: string;
    email: string;
    login: string;
}

export interface RegistrationData {
    email: string;
    login: string;
    password: string;
}

export interface LoginData {
    login: string;
    password: string;
}
