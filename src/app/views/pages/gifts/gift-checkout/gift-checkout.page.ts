import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { NgbModal, NgbOffcanvas } from "@ng-bootstrap/ng-bootstrap";
import { CheckoutMessageDto } from "../../../../models/checkout-message.dto";
import { GiftItemDto } from "../../../../models/gift-item.dto";
import { GiftService } from "../../../../services/gift.service";
import { NotificationService } from "../../../../services/notification.service";
import { BaseValidator } from "../../../../services/validators/base.validator";
import { EmailValidator } from "../../../../services/validators/email.validator";
import { FormStateEnum } from "../../../base-form.view";
import { InputTextAreaComponent } from "../../../components/atoms/input-text-area/input-text-area.component";
import { InputTextComponent } from "../../../components/atoms/input-text/input-text.component";
import { BasePageView } from "../../base-page.view";
import { BaseFormPageView } from "../../base-form-page.view";

@Component({
    selector: "gift-checkout-page",
    templateUrl: "./gift-checkout.page.html",
    styles: ``,
})
export class GiftCheckoutPage extends BaseFormPageView implements OnInit {
    @ViewChild("inputName") inputName: InputTextComponent;
    @ViewChild("inputPhone") inputPhone: InputTextComponent;
    @ViewChild("inputEmail") inputEmail: InputTextComponent;
    @ViewChild("textAreaMessage") textAreaMessage: InputTextAreaComponent;
    @ViewChild("modalLoading") modalLoading;
    messageFormState = FormStateEnum.INITIAL;
    gifts: GiftItemDto[] = [];
    PHONE_MASK = BaseValidator.MASKS.PHONE;
    emailInputTextValidator = new EmailValidator();
    pixUrl: SafeResourceUrl;
    checkoutLink: string;

    public get total(): number {
        return this.gifts.reduce((total, gift) => total + gift.price, 0);
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
        this.loadCartItems();
        this.loadCheckoutMessageIfExists();
    }

    onSubmitMessage(): void {
        if (this.isFormValid()) {
            this.messageFormState = FormStateEnum.SUBMITTED_LOADING;
            const dto = this.extractDtoFromForm();

            this.giftService.postCheckoutMessage(dto).subscribe({
                next: (response) => {
                    this.messageFormState = FormStateEnum.SUBMITTED_SUCCESSFULLY;
                    this.notifier.showSuccess("Sua mensagem foi enviada com sucesso!");
                },
                error: (e) => {
                    this.messageFormState = FormStateEnum.SUBMITION_FAILED;
                    throw e;
                },
            });
        } else {
            this.messageFormState = FormStateEnum.SUBMITION_FAILED;
            this.notifier.showError(this.ERROR_MESSAGES.FORM_HAS_ERRORS());
        }
    }

    onGoToPaymentPage(): void {
        const startTime = Date.now();

        var checkoutRedirectPage = window.open(
            `${window.location.origin}${this.URLS.PATHS.CHECKOUT_REDIRECT(false)}`,
            "_blank"
        );
        this.modalService.open(this.modalLoading, {
            centered: true,
        });
        this.giftService.postCheckoutWithCreditCard(this.gifts).subscribe({
            next: (response) => {
                this.checkoutLink = response.checkoutUrl;
                const elapsedTime = Date.now() - startTime;
                const remainingTimeToShowForceRedirectCheckoutUrl = Math.max(5000 - elapsedTime, 0);

                setTimeout(() => {
                    checkoutRedirectPage.location.href = response.checkoutUrl;
                    this.modalService.dismissAll();
                }, remainingTimeToShowForceRedirectCheckoutUrl);
            },
            error: (e) => {
                checkoutRedirectPage.close();
                throw e;
            },
        });
    }

    private isFormValid(): boolean {
        let isValid = true;
        isValid = this.inputName.validate() && isValid;
        isValid = this.inputPhone.validate() && isValid;
        isValid = this.inputEmail.validate() && isValid;
        isValid = this.textAreaMessage.validate() && isValid;

        return isValid;
    }

    private extractDtoFromForm(): CheckoutMessageDto {
        return {
            name: this.inputName.getValue(),
            phone: this.inputPhone.getValue(),
            email: this.inputEmail.getValue(),
            message: this.textAreaMessage.getValue(),
            gifts: this.gifts,
            createdDateTime: new Date(),
        };
    }

    private loadCartItems(): void {
        this.giftService.getCartItems().subscribe((gifts) => {
            this.gifts = gifts;
        });
    }

    private loadCheckoutMessageIfExists(): void {
        setTimeout(() => {
            const dto = this.giftService.checkoutMessage;
            if (dto) {
                this.inputName.changeValue(dto.name);
                this.inputEmail.changeValue(dto.email);
                this.inputPhone.changeValue(dto.phone);
                this.textAreaMessage.changeValue(dto.message);
                this.messageFormState = FormStateEnum.SUBMITTED_SUCCESSFULLY;
            }
        }, 500);
    }
}
