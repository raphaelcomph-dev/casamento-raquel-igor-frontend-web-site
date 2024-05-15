import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Component({
    selector: "app-main-header",
    templateUrl: "./main-header.component.html",
    styleUrls: ["./main-header.component.scss"],
})
export class MainHeaderComponent implements OnInit {
    currentSection: string;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {}

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

    private scrollTo(elementId?: string, offsetY: number = 0): void {
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
