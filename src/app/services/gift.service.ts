import { Injectable } from "@angular/core";
import { GiftItemDto } from "../models/gift-item.dto";
import { AppUrls } from "../app.urls";
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class GiftService {
    constructor(private http: HttpClient) {}

    findAll(): Observable<GiftItemDto[]> {
        return this.http.get(AppUrls.API_ENDPOINTS.GIFTS.FIND_ALL()).pipe(
            map((gifts) => {
                const convertedGifts: GiftItemDto[] = [];
                for (const key in gifts) {
                    if (gifts.hasOwnProperty(key)) {
                        convertedGifts.push({
                            ...gifts[key],
                            id: key,
                        });
                    }
                }
                return convertedGifts;
            })
        );
    }
}
