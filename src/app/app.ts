import { Component } from "@angular/core";
import packageJson from "../../package.json";

@Component({
    selector: "app-root",
    templateUrl: "./app.html",
    styleUrls: [],
})
export class AppComponent {
    public version: string = packageJson.version;

    ngOnInit(): void {
        console.log(`Casamento Raquel & Igor - Frontend - Web Site v${this.version}`);
    }
}
