import { Component, ElementRef, Renderer2 } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
    selector: "app-main-gallery",
    templateUrl: "./main-gallery.component.html",
    styles: ``,
})
export class MainGalleryComponent {
    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        setTimeout(() => {
            const owlCarousel = this.el.nativeElement.querySelectorAll(".owl-carousel");
            owlCarousel.forEach((element) => {
                this.renderer.addClass(element, "portfolio-grids");
            });
        }, 500);
    }

    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        navSpeed: 2000,
        navText: ["", ""],
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 2,
            },
            740: {
                items: 3,
            },
            940: {
                items: 6,
            },
        },
        nav: false,
    };
}
