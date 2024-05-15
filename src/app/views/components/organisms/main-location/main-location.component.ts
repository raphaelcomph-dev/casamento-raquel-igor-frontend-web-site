import { Component, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-main-location",
    templateUrl: "./main-location.component.html",
    styleUrls: ["./main-location.component.scss"],
})
export class MainLocationComponent {
    @ViewChild("content") content: any;
    constructor(private modalService: NgbModal) {}

    onShowLocationVideo(): void {
        this.modalService.open(this.content, { centered: true });
    }
}
