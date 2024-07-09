import { Component, OnInit, ViewChild } from "@angular/core";
import { BasePageView } from "../../base-page.view";
import { GiftService } from "../../../../services/gift.service";
import { RsvpService } from "../../../../services/rsvp.service";
import { RsvpAnswerDto } from "../../../../models/rsvp-answer.dto";
import { CheckoutMessageDto } from "../../../../models/checkout-message.dto";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { InputOption } from "../../../components/atoms/input-radiogroup/input-radiogroup.component";
import { SelectOption } from "../../../components/atoms/select-single-choice/select-single-choice.component";

@Component({
    selector: "app-admin-main",
    templateUrl: "./admin-main.page.html",
    styles: ``,
})
export class AdminMainPage extends BasePageView implements OnInit {
    @ViewChild("modalCheckoutMessage") modalCheckoutMessage;
    @ViewChild("modalEditRsvp") modalEditRsvp;
    @ViewChild("modalDeleteRsvp") modalDeleteRsvp;
    active = 1;
    rsvpAnswers: RsvpAnswerDto[] = [];
    checkoutMessages: CheckoutMessageDto[] = [];
    selectedCheckoutMessage: CheckoutMessageDto;
    selectedRsvpAnswer: RsvpAnswerDto;
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

    constructor(
        private readonly giftService: GiftService,
        private readonly rsvpService: RsvpService,
        private readonly modalService: NgbModal
    ) {
        super();
    }

    public get guestQty(): number {
        return this.rsvpAnswers?.reduce((total, answer) => total + (answer.guestQty || 0), 0);
    }

    public get giftsTotalPrice(): number {
        return this.checkoutMessages?.reduce((total, checkoutMessage) => total + checkoutMessage.giftsTotalPrice(), 0);
    }
    public get giftsTotalQty(): number {
        return this.checkoutMessages?.reduce(
            (total, checkoutMessage) => total + (checkoutMessage.gifts ? checkoutMessage.gifts.length : 0),
            0
        );
    }

    ngOnInit(): void {
        this.rsvpService.getFindAllAnswers().subscribe((response) => {
            this.rsvpAnswers = response;
        });
        this.giftService.getCheckoutMessages().subscribe((response) => {
            this.checkoutMessages = response;
        });
    }

    onShowModalCheckoutMessage(checkoutMessageId): void {
        this.selectedCheckoutMessage = this.checkoutMessages.find(
            (checkoutMessage) => checkoutMessage.id === checkoutMessageId
        );
        this.modalService.open(this.modalCheckoutMessage, {
            centered: true,
        });
    }

    onShowEditModalRsvpAnswer(rsvpAnswerId: string): void {
        this.selectedRsvpAnswer = this.rsvpAnswers.find((rsvpAnswer) => rsvpAnswer.id === rsvpAnswerId);
        this.modalService.open(this.modalEditRsvp, {
            centered: true,
        });
    }

    onSaveRsvpAnswer(): void {}

    onShowDeleteModalRsvpAnswer(rsvpAnswerId: string): void {
        this.selectedRsvpAnswer = this.rsvpAnswers.find((rsvpAnswer) => rsvpAnswer.id === rsvpAnswerId);
        this.modalService.open(this.modalDeleteRsvp, {
            centered: true,
        });
    }

    onDeleteRsvpAnswer(): void {}
}
