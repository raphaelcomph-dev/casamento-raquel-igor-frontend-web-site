import { Injectable } from "@angular/core";
import { GiftItemDto } from "../models/gift.dto";
import { AppUrls } from "../app.urls";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class GiftService {
    constructor(private http: HttpClient) {}

    findAll(): Observable<GiftItemDto[]> {
        return this.http.get<GiftItemDto[]>(AppUrls.API_ENDPOINTS.GIFTS.FIND_ALL());
    }
}
