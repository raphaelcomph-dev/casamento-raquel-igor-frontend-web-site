import { Component, Input } from "@angular/core";

@Component({
    selector: "app-gift-hero",
    templateUrl: "./gift-hero.component.html",
    styleUrls: ["./gift-hero.component.scss"],
})
export class GiftHeroComponent {
    @Input("subtitle") subtitle: string;
}
