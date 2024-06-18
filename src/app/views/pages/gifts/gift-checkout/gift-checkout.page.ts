import { Component, OnInit, ViewChild } from "@angular/core";
import { BaseView } from "../../../base.view";
import { BaseFormView, FormStateEnum } from "../../../base-form.view";
import { InputTextAreaComponent } from "../../../components/atoms/input-text-area/input-text-area.component";
import { InputTextComponent } from "../../../components/atoms/input-text/input-text.component";
import { NotificationService } from "../../../../services/notification.service";
import { RsvpService } from "../../../../services/rsvp.service";

@Component({
    selector: "gift-checkout-page",
    templateUrl: "./gift-checkout.page.html",
    styles: ``,
})
export class GiftCheckoutPage extends BaseFormView implements OnInit {
    @ViewChild("inputName") inputName: InputTextComponent;
    @ViewChild("inputPhone") inputPhone: InputTextComponent;
    @ViewChild("inputEmail") inputEmail: InputTextComponent;
    @ViewChild("textAreaMessage") textAreaMessage: InputTextAreaComponent;
    messageFormState = FormStateEnum.INITIAL;

    constructor(private readonly notifier: NotificationService, private readonly rsvp: RsvpService) {
        super();
    }

    ngOnInit(): void {}

    onSubmitMessage(): void {
        if (this.isFormValid()) {
        } else {
            this.messageFormState = FormStateEnum.SUBMITION_FAILED;
            this.notifier.showError(this.ERROR_MESSAGES.FORM_HAS_ERRORS());
        }
    }

    private isFormValid(): boolean {
        let isValid = true;
        isValid = this.inputName.validate() && isValid;
        isValid = this.inputPhone.validate() && isValid;
        isValid = this.textAreaMessage.validate() && isValid;

        return isValid;
    }
}
