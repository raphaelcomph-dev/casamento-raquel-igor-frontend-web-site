import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CheckoutMessageDto } from "../../../../models/checkout-message.dto";
import { RsvpAnswerDto } from "../../../../models/rsvp-answer.dto";
import { GiftService } from "../../../../services/gift.service";
import { NotificationService } from "../../../../services/notification.service";
import { RsvpService } from "../../../../services/rsvp.service";
import { FormStateEnum } from "../../../base-form.view";
import {
    InputOption,
    InputRadiogroupComponent,
} from "../../../components/atoms/input-radiogroup/input-radiogroup.component";
import {
    SelectOption,
    SelectSingleChoiceComponent,
} from "../../../components/atoms/select-single-choice/select-single-choice.component";
import { BaseFormPageView } from "../../base-form-page.view";
import { InputTextComponent } from "../../../components/atoms/input-text/input-text.component";

@Component({
    selector: "app-admin-main",
    templateUrl: "./admin-main.page.html",
    styles: ``,
})
export class AdminMainPage extends BaseFormPageView implements OnInit {
    @ViewChild("modalShowMessage") modalShowMessage;
    @ViewChild("modalEditRsvp") modalEditRsvp;
    @ViewChild("modalDeleteRsvp") modalDeleteRsvp;

    active = 1;
    rsvpAnswers: RsvpAnswerDto[] = [];
    checkoutMessages: CheckoutMessageDto[] = [];
    selectedMessage: {
        name: string;
        message?: string;
    };
    selectedRsvpAnswer: RsvpAnswerDto;

    constructor(
        private readonly giftService: GiftService,
        private readonly rsvpService: RsvpService,
        private readonly modalService: NgbModal,
        private readonly notifier: NotificationService,
        private readonly cdr: ChangeDetectorRef
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
        this.loadAllRsvpAnswers();
        this.giftService.getCheckoutMessages().subscribe((response) => {
            this.checkoutMessages = response;
        });
    }

    onShowModalCheckoutMessage(checkoutMessageId): void {
        this.selectedMessage = this.checkoutMessages.find(
            (checkoutMessage) => checkoutMessage.id === checkoutMessageId
        );
        this.modalService.open(this.modalShowMessage, {
            centered: true,
        });
    }

    onShowRsvpMessage(rsvpAnswerId: string): void {
        this.selectedMessage = this.rsvpAnswers.find((rsvpAnswer) => rsvpAnswer.id === rsvpAnswerId);
        this.modalService.open(this.modalShowMessage, {
            centered: true,
        });
    }

    onShowEditModalRsvpAnswer(rsvpAnswerId: string): void {
        this.selectedRsvpAnswer = JSON.parse(
            JSON.stringify(this.rsvpAnswers.find((rsvpAnswer) => rsvpAnswer.id === rsvpAnswerId))
        );
        this.modalService.open(this.modalEditRsvp, {
            centered: true,
        });
    }

    onShowDeleteModalRsvpAnswer(rsvpAnswerId: string): void {
        this.selectedRsvpAnswer = this.rsvpAnswers.find((rsvpAnswer) => rsvpAnswer.id === rsvpAnswerId);
        this.modalService.open(this.modalDeleteRsvp, {
            centered: true,
        });
    }

    onDeleteRsvpAnswer(): void {
        this.modalService.dismissAll();
        this.rsvpService.deleteRsvpAnswer(this.selectedRsvpAnswer.id).subscribe({
            next: () => {
                this.notifier.showSuccess("Confirmação de presença excluída com sucesso!");
                this.loadAllRsvpAnswers();
            },
            error: (e) => {
                throw e;
            },
        });
    }

    onFinishEditRsvp($event): void {
        if ($event) {
            this.loadAllRsvpAnswers();
        }
        this.modalService.dismissAll();
    }

    private loadAllRsvpAnswers() {
        this.rsvpService.getFindAllAnswers().subscribe((response) => {
            this.rsvpAnswers = response;
        });
    }
}
