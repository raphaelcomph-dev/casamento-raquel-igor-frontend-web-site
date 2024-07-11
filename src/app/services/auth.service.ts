import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginFormDto } from "../models/login.form.dto";
import { Observable, tap } from "rxjs";
import { AppUrls } from "../app.urls";
import jwt_decode from "jwt-decode";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private static readonly ACCESS_TOKEN = "ACCESS_TOKEN";
    private _isLoggedIn = false;
    public get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    constructor(private http: HttpClient) {
        if (AuthService.tokenExistsAndIsNotExpired()) {
            this._isLoggedIn = true;
        }
    }

    postLogin(dto: LoginFormDto): Observable<any> {
        return this.http.post(AppUrls.API_ENDPOINTS.AUTH.LOGIN(), dto).pipe(
            tap((response) => {
                this._isLoggedIn = true;
                this.storeTokenInSession(response.accessToken, dto.rememberMe);
            })
        );
    }

    logout(): void {
        this._isLoggedIn = false;
        localStorage.removeItem(AuthService.ACCESS_TOKEN);
        sessionStorage.removeItem(AuthService.ACCESS_TOKEN);
        window.location.reload();
    }

    private static tokenExistsAndIsNotExpired(): boolean {
        const accessToken = AuthService.getTokenFromSession();
        if (!accessToken) {
            return false;
        }
        const tokenDecoded = jwt_decode(accessToken);
        const exp = tokenDecoded["exp"];
        const now = new Date().getTime() / 1000;
        return exp > now;
    }

    static getTokenFromSession(): string {
        if (localStorage.getItem(AuthService.ACCESS_TOKEN)) {
            return localStorage.getItem(AuthService.ACCESS_TOKEN);
        } else {
            return sessionStorage.getItem(AuthService.ACCESS_TOKEN);
        }
    }

    private storeTokenInSession(accessToken: string, storeForLong: boolean): void {
        if (storeForLong) {
            localStorage.setItem(AuthService.ACCESS_TOKEN, accessToken);
        } else {
            sessionStorage.setItem(AuthService.ACCESS_TOKEN, accessToken);
        }
    }
}
