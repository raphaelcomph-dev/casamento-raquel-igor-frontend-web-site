import { Component, OnInit } from "@angular/core";
import * as dayjs from "dayjs";
import { Duration } from "dayjs/plugin/duration";
import { BaseView } from "../../../base.view";

@Component({
    selector: "app-main-hero",
    templateUrl: "./main-hero.component.html",
    styleUrl: "./main-hero.component.scss",
})
export class MainHeroComponent extends BaseView implements OnInit {
    private readonly ONE_SECOND_IN_MILISEC = 1000;

    targetDate = dayjs("2024-10-24 21:00:00");
    duration: Duration;

    ngOnInit(): void {
        this.calculateDurationUntilTargetDate();

        setInterval(() => {
            this.calculateDurationUntilTargetDate();
        }, this.ONE_SECOND_IN_MILISEC);
    }

    private calculateDurationUntilTargetDate(): void {
        this.duration = dayjs.duration(this.targetDate.diff(dayjs()));
    }
}
