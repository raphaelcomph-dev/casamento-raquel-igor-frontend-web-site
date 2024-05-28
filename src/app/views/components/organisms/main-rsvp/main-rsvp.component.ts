import { Component, ViewChild } from "@angular/core";
import {
    SelectOption,
    SelectSingleChoiceComponent,
} from "../../atoms/select-single-choice/select-single-choice.component";
import { BaseView } from "../../../base.view";
import { InputTextComponent } from "../../atoms/input-text/input-text.component";
import { NotificationService } from "../../../../services/notification.service";
import { BaseFormView, FormStateEnum } from "../../../base-form.view";
import { RsvpAnswerDto } from "../../../../models/rsvp-answer.dto";
import { RsvpService } from "../../../../services/rsvp.service";
import { InputOption, InputRadiogroupComponent } from "../../atoms/input-radiogroup/input-radiogroup.component";
import { InputTextAreaComponent } from "../../atoms/input-text-area/input-text-area.component";

@Component({
    selector: "app-main-rsvp",
    templateUrl: "./main-rsvp.component.html",
    styleUrls: [],
})
export class MainRsvpComponent extends BaseFormView {
    @ViewChild("inputName") inputName: InputTextComponent;
    @ViewChild("radioRsvpAnswer") radioRsvpAnswer: InputRadiogroupComponent;
    @ViewChild("selectGuestQty") selectGuestQty: SelectSingleChoiceComponent;
    @ViewChild("textAreaMessage") textAreaMessage: InputTextAreaComponent;
    rsvpForm = {
        state: FormStateEnum.INITIAL,
        fields: {
            answer: undefined,
        },
    };
    rsvpQtyGuestSelectOptions: SelectOption[] = [
        { value: "1", label: "01 (incluindo a mim)" },
        { value: "2", label: "02 (incluindo a mim)" },
        { value: "3", label: "03 (incluindo a mim)" },
        { value: "4", label: "04 (incluindo a mim)" },
        { value: "5", label: "05 (incluindo a mim)" },
        { value: "6", label: "06 (incluindo a mim)" },
    ];
    rsvpAnswerInputOptions: InputOption[] = [
        { value: "true", label: "Sim, eu estarei lá!" },
        { value: "false", label: "Desculpe, não poderei comparecer" },
    ];

    constructor(private readonly notifier: NotificationService, private readonly rsvp: RsvpService) {
        super();
    }

    onToggleRsvpAnswer(): void {
        this.rsvpForm.fields.answer = JSON.parse(this.radioRsvpAnswer.getCheckedOptions()[0]);
    }

    onSubmitRsvp(): void {
        if (this.isFormValid()) {
            this.rsvpForm.state = FormStateEnum.SUBMITTED_LOADING;

            const dto = this.extractDtoFromForm();

            this.rsvp.postRsvpAnswer(dto).subscribe({
                next: (response) => {
                    this.rsvpForm.state = FormStateEnum.SUBMITTED_SUCCESSFULLY;
                    this.notifier.showSuccess("Sua resposta foi enviada com sucesso!");
                },
                error: (e) => {
                    this.rsvpForm.state = FormStateEnum.SUBMITION_FAILED;
                    throw e;
                },
            });
        } else {
            this.rsvpForm.state = FormStateEnum.SUBMITION_FAILED;
            this.notifier.showError(this.ERROR_MESSAGES.FORM_HAS_ERRORS());
        }
    }

    private isFormValid(): boolean {
        let isValid = true;
        isValid = this.inputName.validate() && isValid;
        isValid = this.radioRsvpAnswer.validate() && isValid;
        if (this.rsvpForm.fields.answer === true) {
            isValid = this.selectGuestQty.validate() && isValid;
        }

        return isValid;
    }

    private extractDtoFromForm(): RsvpAnswerDto {
        const dto: RsvpAnswerDto = {
            name: this.inputName.getValue(),
            answer: this.rsvpForm.fields.answer,
        };
        if (this.rsvpForm.fields.answer === true) {
            dto.guestQty = this.selectGuestQty.getSelectedValue().parseInt();
        } else {
            dto.message = this.textAreaMessage.getValue();
        }
        return dto;
    }
}
