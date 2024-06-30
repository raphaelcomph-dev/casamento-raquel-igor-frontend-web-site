import { Component, HostListener, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BaseView } from "../../../base.view";
import { NgbOffcanvas } from "@ng-bootstrap/ng-bootstrap";
import { AppUrls } from "../../../../app.urls";
import { GiftService } from "../../../../services/gift.service";

@Component({
    selector: "app-gift-header",
    templateUrl: "./gift-header.component.html",
    styles: ``,
})
export class GiftHeaderComponent extends BaseView implements OnInit {
    @Input() returnTo: "main-page" | "gift-list" = "gift-list";
    @ViewChild("content") cartOffcanvas;
    isBellowHeader = false;
    isSticky = false;
    cartCount = 0;
    static returnToOptions = [
        {
            value: "main-page",
            text: "Voltar à página principal",
            link: AppUrls.PATHS.ROOT.ABSOLUTE_PATH(),
        },
        {
            value: "gift-list",
            text: "Voltar à lista de presentes",
            link: AppUrls.PATHS.GIFTS.LIST.ABSOLUTE_PATH(),
        },
    ];

    public get returnToText(): string {
        return GiftHeaderComponent.returnToOptions.find((option) => option.value === this.returnTo)?.text;
    }
    public get returnToLink(): string {
        return GiftHeaderComponent.returnToOptions.find((option) => option.value === this.returnTo)?.link;
    }

    constructor(private offcanvasService: NgbOffcanvas, private giftService: GiftService) {
        super();
    }

    ngOnInit(): void {
        this.scrollTo();
        this.giftService.cartItemsCount$.subscribe((newCount) => {
            this.cartCount = newCount;
        });
        this.giftService.addNewItemsToCart$.subscribe(() => {
            this.showCart();
        });
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        this.isBellowHeader = window.pageYOffset > 90;
        this.isSticky = window.pageYOffset > 180;
    }

    showMenu(force?: boolean): void {
        const navbar = document.getElementById("navbar");
        const backdrop = document.getElementById("backdrop");

        if (navbar.classList.contains("slideInn") || force === false) {
            navbar.classList.remove("slideInn");
            backdrop.classList.add("d-none");
        } else {
            navbar.classList.add("slideInn");
            backdrop.classList.remove("d-none");
        }
    }

    showCart() {
        if (!this.offcanvasService.hasOpenOffcanvas()) {
            this.offcanvasService.open(this.cartOffcanvas, { position: "end" });
        }
    }

    onGoToCheckoutPage(): void {}
}
