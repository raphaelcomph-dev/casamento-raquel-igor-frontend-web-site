import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
    selector: "app-main-gallery",
    templateUrl: "./main-gallery.component.html",
    styles: ``,
})
export class MainGalleryComponent {
    @ViewChild("content") content: any;
    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplaySpeed: 1000,
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
    zoomPhotoAssetUrl;

    photoList = [
        "assets/images/gallery/gallery-1.jpeg",
        "assets/images/gallery/gallery-2.jpeg",
        "assets/images/gallery/gallery-3.jpeg",
        "assets/images/gallery/gallery-4.jpeg",
        "assets/images/gallery/gallery-5.jpeg",
        "assets/images/gallery/gallery-6.jpeg",
        // "assets/images/gallery/gallery-7.jpeg",
        "assets/images/gallery/gallery-8.jpeg",
        "assets/images/gallery/gallery-9.jpeg",
        "assets/images/gallery/gallery-10.jpeg",
        "assets/images/gallery/gallery-11.jpeg",
        "assets/images/gallery/gallery-12.jpeg",
        "assets/images/gallery/gallery-13.jpeg",
        "assets/images/gallery/gallery-14.jpeg",
        "assets/images/gallery/gallery-15.jpeg",
        "assets/images/gallery/gallery-16.jpeg",
        "assets/images/gallery/gallery-17.jpeg",
        "assets/images/gallery/gallery-18.jpeg",
    ];

    constructor(private el: ElementRef, private renderer: Renderer2, private modalService: NgbModal) {}

    ngOnInit(): void {
        setTimeout(() => {
            const owlCarousel = this.el.nativeElement.querySelectorAll(".owl-carousel");
            owlCarousel.forEach((element) => {
                this.renderer.addClass(element, "portfolio-grids");
            });
        }, 500);
    }

    onZoomPhoto(photoAssetUrl: string): void {
        this.zoomPhotoAssetUrl = photoAssetUrl;
        this.modalService.open(this.content, { centered: true });
    }
}
