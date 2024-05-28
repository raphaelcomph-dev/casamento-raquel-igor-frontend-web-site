import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RsvpAnswerDto } from "../models/rsvp-answer.dto";
import { Observable } from "rxjs";
import { AppUrls } from "../app.urls";

@Injectable({
    providedIn: "root",
})
export class RsvpService {
    constructor(private http: HttpClient) {}

    postRsvpAnswer(dto: RsvpAnswerDto): Observable<any> {
        return this.http.post(AppUrls.API_ENDPOINTS.RSVP.POST_ANSWER(), dto);
    }
}
