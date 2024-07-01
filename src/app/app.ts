import { Component } from "@angular/core";
import packageJson from "../../package.json";
import { NavigationStart, Router } from "@angular/router";
import { Location } from "@angular/common";
import { NgbOffcanvas } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-root",
    templateUrl: "./app.html",
    styleUrls: [],
})
export class AppComponent {
    public version: string = packageJson.version;

    constructor(private router: Router, private location: Location, private offcanvasService: NgbOffcanvas) {}

    ngOnInit(): void {
        console.log(`Casamento Raquel & Igor - Frontend - Web Site v${this.version}`);

        this.hideOffCanvasAndAbortNavigationWhenItsOpenAndUserNavigatesBack();
    }

    private hideOffCanvasAndAbortNavigationWhenItsOpenAndUserNavigatesBack() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                if (event.navigationTrigger === "popstate" && this.offcanvasService.hasOpenOffcanvas()) {
                    // User is navigating back and OffCanvas is open
                    this.offcanvasService.dismiss();
                    // Prevent navigation
                    this.location.forward();
                }
            }
        });
    }
}
