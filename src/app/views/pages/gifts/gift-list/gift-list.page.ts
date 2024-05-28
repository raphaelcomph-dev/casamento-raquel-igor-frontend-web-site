import { Component, OnInit } from "@angular/core";
import { BaseView } from "../../../base.view";
import { GiftService } from "../../../../services/gift.service";
import { GiftItemDto } from "../../../../models/gift.dto";

@Component({
    selector: "app-gift-list",
    templateUrl: "./gift-list.page.html",
    styles: ``,
})
export class GiftListPage extends BaseView implements OnInit {
    gifts: GiftItemDto[] = [];
    filterList: GiftItemDto[] = [];
    filterCategory: string;

    public get categories(): string[] {
        return this.gifts
            .map((e) => e.categories)
            .reduce((a, b) => a.concat(b), [])
            .filter((value, index, self) => self.indexOf(value) === index);
    }

    constructor(private readonly giftService: GiftService) {
        super();
    }

    ngOnInit(): void {
        this.giftService.findAll().subscribe((gifts) => {
            console.log("buscando a lista de presentes", gifts);
            this.gifts = gifts;
            this.applySortAndFilterToList();
        });
    }

    onFilterByCategory(category): void {
        this.filterCategory = category;
        this.applySortAndFilterToList();
    }

    private applySortAndFilterToList(): void {
        this.filterList = this.gifts;
        if (this.filterCategory) {
            this.filterList = this.filterList.filter((gift) => gift.categories.includes(this.filterCategory));
        }
    }

    // TODO: arrumar uma forma de limpar os filtros
}
