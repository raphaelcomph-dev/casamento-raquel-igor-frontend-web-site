import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import localePt from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";

import * as duration from "dayjs/plugin/duration";
import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { CarouselModule } from "ngx-owl-carousel-o";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app";
import { MainHeroComponent } from "./views/components/organisms/main-hero/main-hero.component";
import { MainHeaderComponent } from "./views/components/organisms/main-header/main-header.component";
import { MainPage } from "./views/pages/main/main.page";
import { MainAboutUsComponent } from "./views/components/organisms/main-about-us/main-about-us.component";
import { MainOurHistoryComponent } from "./views/components/organisms/main-our-history/main-our-history.component";
import { MainGalleryComponent } from "./views/components/organisms/main-gallery/main-gallery.component";
import { MainLocationComponent } from "./views/components/organisms/main-location/main-location.component";
import { FooterComponent } from "./views/components/organisms/footer/footer.component";
import { MainRsvpComponent } from "./views/components/organisms/main-rsvp/main-rsvp.component";
import { InputTextComponent } from "./views/components/atoms/input-text/input-text.component";

import "./extensions/string.extension";
import "./extensions/array.extension";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectSingleChoiceComponent } from "./views/components/atoms/select-single-choice/select-single-choice.component";
import { GiftListPage } from "./views/pages/gifts/gift-list/gift-list.page";
import { GiftDetailsPage } from "./views/pages/gifts/gift-details/gift-details.page";
import { InputRadiogroupComponent } from "./views/components/atoms/input-radiogroup/input-radiogroup.component";
import { InputTextAreaComponent } from "./views/components/atoms/input-text-area/input-text-area.component";
import { GiftHeaderComponent } from "./views/components/organisms/gift-header/gift-header.component";
import { GiftCartComponent } from "./views/components/organisms/gift-cart/gift-cart.component";
import { GiftCheckoutPage } from "./views/pages/gifts/gift-checkout/gift-checkout.page";
import { GiftHeroComponent } from "./views/components/molecules/gift-hero/gift-hero.component";
import { CheckoutRedirectPage } from "./views/pages/checkout-redirect/checkout-redirect.page";
import { AdminLoginPage } from "./views/pages/admin/admin-login/admin-login.page";
import { AdminMainPage } from "./views/pages/admin/admin-main/admin-main.page";
import { FormEditRsvpComponent } from './views/components/molecules/form-edit-rsvp/form-edit-rsvp.component';

dayjs.extend(duration);
dayjs.locale("pt-br");

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AppComponent,
        MainHeroComponent,
        MainHeaderComponent,
        MainAboutUsComponent,
        MainPage,
        MainOurHistoryComponent,
        MainGalleryComponent,
        MainLocationComponent,
        FooterComponent,
        MainRsvpComponent,
        InputTextComponent,
        InputRadiogroupComponent,
        InputTextAreaComponent,
        SelectSingleChoiceComponent,
        GiftListPage,
        GiftDetailsPage,
        GiftHeaderComponent,
        GiftCartComponent,
        GiftCheckoutPage,
        GiftHeroComponent,
        CheckoutRedirectPage,
        AdminLoginPage,
        AdminMainPage,
        FormEditRsvpComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        CarouselModule,
        AppRoutingModule,
        NgbModule,
        NgxMaskDirective,
        NgxMaskPipe,
        NgxSpinnerModule,
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: "toast-top-center",
            preventDuplicates: true,
            progressBar: true,
        }),
    ],
    providers: [provideNgxMask()],
    bootstrap: [AppComponent],
})
export class AppModule {}
