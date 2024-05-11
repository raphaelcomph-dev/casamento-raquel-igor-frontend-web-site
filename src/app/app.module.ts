import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MainHeroComponent } from "./views/components/organisms/main-hero/main-hero.component";
import { MainHeaderComponent } from "./views/components/organisms/main-header/main-header.component";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { MainPage } from "./views/pages/main/main.page";
import { MainAboutUsComponent } from "./views/components/organisms/main-about-us/main-about-us.component";
import { MainOurHistoryComponent } from './views/components/organisms/main-our-history/main-our-history.component';
import { MainGalleryComponent } from './views/components/organisms/main-gallery/main-gallery.component';

@NgModule({
    declarations: [AppComponent, MainHeroComponent, MainHeaderComponent, MainAboutUsComponent, MainPage, MainOurHistoryComponent, MainGalleryComponent],
    imports: [
        BrowserModule,
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
