import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppUrls } from "./app.urls";
import { MainPage } from "./views/pages/main/main.page";
import { GiftListPage } from "./views/pages/gifts/gift-list/gift-list.page";

const routes: Routes = [
    { path: AppUrls.PATHS.ROOT.RELATIVE_PATH(), component: MainPage },
    { path: AppUrls.PATHS.GIFTS.LIST.RELATIVE_PATH(), component: GiftListPage },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
