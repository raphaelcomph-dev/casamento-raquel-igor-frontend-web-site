import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RsvpAnswerDto } from "../models/rsvp-answer.dto";
import { map, Observable } from "rxjs";
import { AppUrls } from "../app.urls";

@Injectable({
    providedIn: "root",
})
export class RsvpService {
    constructor(private http: HttpClient) {}

    postRsvpAnswer(dto: RsvpAnswerDto): Observable<any> {
        return this.http.post(AppUrls.API_ENDPOINTS.RSVP.ANSWERS(), dto);
    }

    putRsvpAnswer(dto: RsvpAnswerDto): Observable<any> {
        return this.http.put(AppUrls.API_ENDPOINTS.RSVP.ANSWERS(dto.id), dto);
    }

    deleteRsvpAnswer(id: string): Observable<any> {
        return this.http.delete(AppUrls.API_ENDPOINTS.RSVP.ANSWERS(id));
    }

    getFindAllAnswers(): Observable<RsvpAnswerDto[]> {
        return this.http.get<RsvpAnswerDto[]>(AppUrls.API_ENDPOINTS.RSVP.ANSWERS()).pipe(
            map((responseAnswers) => {
                const answers: RsvpAnswerDto[] = [];
                for (const key in responseAnswers) {
                    if (responseAnswers.hasOwnProperty(key)) {
                        answers.push({
                            ...responseAnswers[key],
                            id: key,
                        });
                    }
                }
                return answers;
            })
        );
    }
}
