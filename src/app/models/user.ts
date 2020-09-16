export class User {
    id: string;
    mail: string;
    password: string;
    role: string;
    jwtToken?: string;
    refreshToken?: string;
}