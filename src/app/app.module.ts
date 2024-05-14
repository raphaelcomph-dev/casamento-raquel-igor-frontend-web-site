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
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
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
