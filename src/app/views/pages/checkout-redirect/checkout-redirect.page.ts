import { Component, OnInit } from "@angular/core";
import { BasePageView } from "../base-page.view";

@Component({
    selector: "redirect-page",
    templateUrl: "./checkout-redirect.page.html",
    styleUrl: "./checkout-redirect.page.scss",
})
export class CheckoutRedirectPage extends BasePageView implements OnInit {
    checkoutUrl: string;

    ngOnInit(): void {
        setTimeout(() => {
            this.checkoutUrl = localStorage.getItem("checkout-url");
        }, 5000);
    }
}
