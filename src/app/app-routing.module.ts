import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppUrls } from "./app.urls";
import { MainPage } from "./views/pages/main/main.page";
import { GiftListPage } from "./views/pages/gifts/gift-list/gift-list.page";
import { GiftDetailsPage } from "./views/pages/gifts/gift-details/gift-details.page";
import { GiftCheckoutPage } from "./views/pages/gifts/gift-checkout/gift-checkout.page";
import { CheckoutRedirectPage } from "./views/pages/checkout-redirect/checkout-redirect.page";

const routes: Routes = [
    { path: AppUrls.PATHS.ROOT.RELATIVE_PATH(), component: MainPage },
    { path: AppUrls.PATHS.GIFTS.LIST.RELATIVE_PATH(), component: GiftListPage },
    { path: AppUrls.PATHS.GIFTS.LIST.RELATIVE_PATH(), component: GiftListPage },
    { path: AppUrls.PATHS.GIFTS.DETAILS.RELATIVE_PATH(), component: GiftDetailsPage },
    { path: AppUrls.PATHS.GIFTS.CHECKOUT.RELATIVE_PATH(), component: GiftCheckoutPage },
    { path: AppUrls.PATHS.CHECKOUT_REDIRECT(true), component: CheckoutRedirectPage },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
