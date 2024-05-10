import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MainHeroComponent } from "./views/components/organisms/main-hero/main-hero.component";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { MainPage } from "./views/pages/main/main.page";

@NgModule({
    declarations: [AppComponent, MainHeroComponent, MainPage],
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
