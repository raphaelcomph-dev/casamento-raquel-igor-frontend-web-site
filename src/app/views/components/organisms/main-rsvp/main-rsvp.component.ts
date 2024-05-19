import { Component } from "@angular/core";
import { SelectOption } from "../../atoms/select-single-choice/select-single-choice.component";

@Component({
    selector: "app-main-rsvp",
    templateUrl: "./main-rsvp.component.html",
    styleUrls: ["./main-rsvp.component.scss"],
})
export class MainRsvpComponent {
    rsvpAnswer: boolean = undefined;
    rsvpQtyGuestSelectOptions: SelectOption[] = [
        { value: "1", label: "01 (incluindo a mim)" },
        { value: "2", label: "02 (incluindo a mim)" },
        { value: "3", label: "03 (incluindo a mim)" },
        { value: "4", label: "04 (incluindo a mim)" },
        { value: "5", label: "05 (incluindo a mim)" },
        { value: "6", label: "06 (incluindo a mim)" },
    ];

    onToggleRsvpAnswer(answer): void {
        this.rsvpAnswer = answer;
    }
}
