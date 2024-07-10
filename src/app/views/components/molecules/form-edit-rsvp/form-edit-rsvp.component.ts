import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { BaseFormView, FormStateEnum } from "../../../base-form.view";
import { InputOption, InputRadiogroupComponent } from "../../atoms/input-radiogroup/input-radiogroup.component";
import { InputTextComponent } from "../../atoms/input-text/input-text.component";
import {
    SelectOption,
    SelectSingleChoiceComponent,
} from "../../atoms/select-single-choice/select-single-choice.component";
import { RsvpAnswerDto } from "../../../../models/rsvp-answer.dto";
import { NotificationService } from "../../../../services/notification.service";
import { RsvpService } from "../../../../services/rsvp.service";

@Component({
    selector: "app-form-edit-rsvp",
    templateUrl: "./form-edit-rsvp.component.html",
    styles: ``,
})
export class FormEditRsvpComponent extends BaseFormView {
    @ViewChild("inputName") inputName: InputTextComponent;
    @ViewChild("radioRsvpAnswer") radioRsvpAnswer: InputRadiogroupComponent;
    @ViewChild("selectGuestQty") selectGuestQty: SelectSingleChoiceComponent;
    @Input("originalRsvpAnswer") originalRsvpAnswer: RsvpAnswerDto;
    @Output("onFinish") onFinish = new EventEmitter<boolean>();
    formState = FormStateEnum.INITIAL;
    rsvpAnswerInputOptions: InputOption[] = [
        { value: "true", label: "Sim, eu estarei lá!" },
        { value: "false", label: "Desculpe, não poderei comparecer" },
    ];
    rsvpQtyGuestSelectOptions: SelectOption[] = [
        { value: "1", text: "01 (incluindo a mim)" },
        { value: "2", text: "02 (incluindo a mim)" },
        { value: "3", text: "03 (incluindo a mim)" },
        { value: "4", text: "04 (incluindo a mim)" },
        { value: "5", text: "05 (incluindo a mim)" },
        { value: "6", text: "06 (incluindo a mim)" },
    ];

    constructor(private readonly rsvpService: RsvpService, private readonly notifier: NotificationService) {
        super();
    }

    onCancel(): void {
        this.onFinish.emit(false);
    }

    onSaveRsvpAnswer(): void {
        if (this.isFormValid()) {
            this.formState = FormStateEnum.SUBMITTED_LOADING;
            const dto = this.extractDtoFromForm();

            this.rsvpService.putRsvpAnswer(dto).subscribe({
                next: (response) => {
                    this.formState = FormStateEnum.SUBMITTED_SUCCESSFULLY;
                    this.notifier.showSuccess("Confirmação de presença editada com sucesso!");
                    this.onFinish.emit(true);
                },
                error: (e) => {
                    this.formState = FormStateEnum.SUBMITION_FAILED;
                    throw e;
                },
            });
        } else {
            this.formState = FormStateEnum.SUBMITION_FAILED;
            this.notifier.showError(this.ERROR_MESSAGES.FORM_HAS_ERRORS());
        }
    }

    private isFormValid(): boolean {
        let isValid = true;
        isValid = this.inputName.validate() && isValid;
        isValid = this.radioRsvpAnswer.validate() && isValid;
        if (this.radioRsvpAnswer.getCheckedOptions()[0].parseBoolean() === true) {
            isValid = this.selectGuestQty.validate() && isValid;
        }

        return isValid;
    }

    private extractDtoFromForm(): RsvpAnswerDto {
        const dto: RsvpAnswerDto = {
            id: this.originalRsvpAnswer.id,
            name: this.inputName.getValue(),
            answer: this.radioRsvpAnswer.getCheckedOptions()[0].parseBoolean(),
            message: this.originalRsvpAnswer.message,
            answerDateTime: this.originalRsvpAnswer.answerDateTime,
        };
        if (this.radioRsvpAnswer.getCheckedOptions()[0].parseBoolean()) {
            dto.guestQty = this.selectGuestQty.getSelectedValue().parseInt();
        } else {
            dto.guestQty = null;
        }
        return dto;
    }
}
