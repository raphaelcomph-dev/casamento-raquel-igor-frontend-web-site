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

    sections = [];

    constructor(private el: ElementRef, private renderer: Renderer2) {
        super();
    }

    ngOnInit(): void {
        this.scrollTo();
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        this.isBellowHeader = window.pageYOffset > 90;
        this.isSticky = window.pageYOffset > 180;
        this.setNavLinkAsActiveOnScroll();
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

    scrollToSection(sectionId: string): void {
        this.showMenu(false);
        if (sectionId) {
            this.currentSection = sectionId;
            this.scrollTo(sectionId);
        } else {
            this.scrollTo();
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const sections = document.querySelectorAll("section");
            sections.forEach((section) => {
                if (section.id) {
                    // Use getBoundingClientRect to get the position of the element
                    const rect = section.getBoundingClientRect();

                    // rect.top gives you the distance from the top of the viewport to the top of the element
                    const elementTop = rect.top;

                    // rect.bottom gives you the distance from the top of the viewport to the bottom of the element
                    const elementBottom = rect.bottom;

                    this.sections.push({
                        id: section.id,
                        top: elementTop,
                        bottom: elementBottom,
                    });
                }
            });
        }, 1500);
    }

    private setNavLinkAsActiveOnScroll(): void {
        // Get the height of the viewport
        // Get the top position of the viewport
        const viewportTop = window.scrollY;

        // Get the bottom position of the viewport
        const viewportBottom = window.scrollY + window.innerHeight;
        const viewportMiddle = (viewportBottom - viewportTop) / 2 + viewportTop;

        this.sections.forEach((section) => {
            if (viewportMiddle > section.top) {
                this.currentSection = section.id;
                return;
            }
        });
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
