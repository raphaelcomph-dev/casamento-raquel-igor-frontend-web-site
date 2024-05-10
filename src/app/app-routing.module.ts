import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppUrls } from "./app.urls";
import { MainPage } from "./views/pages/main/main.page";

const routes: Routes = [{ path: AppUrls.PATHS.ROOT.RELATIVE_PATH(), component: MainPage }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
