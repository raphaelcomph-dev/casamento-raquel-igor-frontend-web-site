import { Component, OnInit } from "@angular/core";
import { BaseView } from "../../../base.view";
import { GiftService } from "../../../../services/gift.service";
import { GiftItemDto } from "../../../../models/gift-item.dto";
import { NgbOffcanvas } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({
    selector: "app-gift-cart",
    templateUrl: "./gift-cart.component.html",
    styles: ``,
})
export class GiftCartComponent extends BaseView implements OnInit {
    cartItems: GiftItemDto[] = [];

    public get total(): number {
        return this.cartItems.reduce((total, gift) => total + gift.price, 0);
    }

    constructor(
        private readonly offcanvasService: NgbOffcanvas,
        private readonly giftService: GiftService,
        private readonly router: Router
    ) {
        super();
    }
    ngOnInit(): void {
        this.giftService.getCartItems().subscribe((cartItems) => {
            this.cartItems = cartItems;
        });
    }

    onRemoveGift(giftId: string): void {
        this.giftService.removeFromCart(giftId);
    }

    onGoToCheckoutPage(): void {
        this.offcanvasService.dismiss();
        this.router.navigate([this.URLS.PATHS.GIFTS.CHECKOUT.ABSOLUTE_PATH()]);
    }
}
