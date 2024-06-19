import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BaseView } from "../../../base.view";
import { BaseFormView, FormStateEnum } from "../../../base-form.view";
import { InputTextAreaComponent } from "../../../components/atoms/input-text-area/input-text-area.component";
import { InputTextComponent } from "../../../components/atoms/input-text/input-text.component";
import { NotificationService } from "../../../../services/notification.service";
import { RsvpService } from "../../../../services/rsvp.service";
import { GiftService } from "../../../../services/gift.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GiftItemDto } from "../../../../models/gift-item.dto";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

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
    gifts: GiftItemDto[] = [];

    public get total(): number {
        return this.gifts.reduce((total, gift) => total + gift.price, 0);
    }

    public get pixUrl(): SafeResourceUrl {
        const pixUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.URLS.API_ENDPOINTS.GIFTS.PAYMENT.PIX(this.total)
        );
        console.log(pixUrl);
        pixUrl;

        return pixUrl;
    }

    constructor(
        private readonly notifier: NotificationService,
        private readonly giftService: GiftService,
        private readonly modalService: NgbModal,
        private readonly sanitizer: DomSanitizer
    ) {
        super();
    }

    ngOnInit(): void {
        this.giftService.getCartItems().subscribe((gifts) => {
            this.gifts = gifts;
        });
    }

    onSubmitMessage(): void {
        if (this.isFormValid()) {
        } else {
            this.messageFormState = FormStateEnum.SUBMITION_FAILED;
            this.notifier.showError(this.ERROR_MESSAGES.FORM_HAS_ERRORS());
        }
    }

    onPayWithPIX(content: TemplateRef<any>): void {
        this.modalService.open(content, { size: "lg", scrollable: true, centered: true });
    }

    private isFormValid(): boolean {
        let isValid = true;
        isValid = this.inputName.validate() && isValid;
        isValid = this.inputPhone.validate() && isValid;
        isValid = this.textAreaMessage.validate() && isValid;

        return isValid;
    }
}
