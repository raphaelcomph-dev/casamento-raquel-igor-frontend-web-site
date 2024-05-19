import { Component, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";
import { BaseView } from "../../../base.view";

@Component({
    selector: "app-main-header",
    templateUrl: "./main-header.component.html",
    styleUrls: ["./main-header.component.scss"],
})
export class MainHeaderComponent extends BaseView implements OnInit {
    currentSection: string;
    isSticky = false;
    isBellowHeader = false;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        super();
    }

    ngOnInit(): void {}

    @HostListener("window:scroll", [])
    onWindowScroll() {
        this.isBellowHeader = window.pageYOffset > 90;
        this.isSticky = window.pageYOffset > 180;
    }

    showMenu(force?: boolean): void {
        const navbar = document.getElementById("navbar");
        const backdrop = document.getElementById("backdrop");

        if (navbar.classList.contains("slideInn") || force === false) {
            navbar.classList.remove("slideInn");
            backdrop.classList.add("d-none");
        } else {
            navbar.classList.add("slideInn");
            backdrop.classList.remove("d-none");
        }
    }

    scrollToSection(sectionId): void {
        this.showMenu(false);
        if (sectionId) {
            this.currentSection = sectionId;
            this.scrollTo(sectionId);
        } else {
            this.scrollTo();
        }
    }

    private scrollTo(elementId?: string, offsetY: number = 85): void {
        setTimeout(() => {
            if (elementId) {
                const element = document.getElementById(elementId);
                const y = element.getBoundingClientRect().top + window.scrollY - offsetY;

                window.scrollTo({ top: y, behavior: "smooth" });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }, 100);
    }
}
