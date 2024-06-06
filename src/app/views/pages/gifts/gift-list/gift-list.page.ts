import { Component, OnInit, ViewChild } from "@angular/core";
import { BaseView } from "../../../base.view";
import { GiftService } from "../../../../services/gift.service";
import { GiftItemDto } from "../../../../models/gift-item.dto";
import {
    SelectOption,
    SelectSingleChoiceComponent,
} from "../../../components/atoms/select-single-choice/select-single-choice.component";
import * as _ from "lodash";
import { InputTextComponent } from "../../../components/atoms/input-text/input-text.component";
import { NumberInputTextModifier } from "../../../components/atoms/input-text/input-text-modifiers";

@Component({
    selector: "app-gift-list",
    templateUrl: "./gift-list.page.html",
    styles: ``,
})
export class GiftListPage extends BaseView implements OnInit {
    @ViewChild("selectSortBy") selectSortBy: SelectSingleChoiceComponent;
    @ViewChild("inputFilterByPriceMinimum") inputFilterByPriceMinimum: InputTextComponent;
    @ViewChild("inputFilterByPriceMaximum") inputFilterByPriceMaximum: InputTextComponent;
    priceTextModifier = new NumberInputTextModifier();
    gifts: GiftItemDto[] = [];
    filterList: GiftItemDto[] = [];
    filterCategories: string[] = [];
    searchText: string = "";
    sortBySelectOptions: SelectOption[] = [
        { text: "Padrão", value: "name" },
        { text: "Ordenar pelo menor preço", value: "lowest-first" },
        { text: "Ordenar pelo maior preço", value: "highest-first" },
    ];

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
            this.gifts = gifts;
            this.applySortAndFilterToList();
        });
    }

    onFilterByCategory(category): void {
        this.filterCategories = this.filterCategories.includes(category)
            ? this.filterCategories.filter((e) => e !== category)
            : this.filterCategories.concat([category]);
        this.applySortAndFilterToList();
    }

    onSortByChanged(): void {
        this.applySortAndFilterToList();
    }

    onFilterByPrice(): void {
        this.applySortAndFilterToList();
    }

    onFilterBySearch(): void {
        this.applySortAndFilterToList();
    }

    private applySortAndFilterToList(): void {
        this.filterList = this.gifts;
        this.applySortToFilterList();
        this.applyFilterBySearchTextToFilterList();
        this.applyFilterByPriceToFilterList();
        this.applyFilterByCategoriesToFilterList();
        // if (this.filterCategory) {
        //     this.filterList = this.filterList.filter((gift) => gift.categories.includes(this.filterCategory));
        // }
    }

    private applySortToFilterList(): void {
        const sortBy = this.selectSortBy.getSelectedValue();
        switch (sortBy) {
            case "name":
                this.filterList = _.orderBy(this.filterList, ["name"], ["asc"]);
                break;
            case "lowest-first":
                this.filterList = _.orderBy(this.filterList, ["price"], ["asc"]);
                break;
            case "highest-first":
                this.filterList = _.orderBy(this.filterList, ["price"], ["desc"]);
                break;
            default:
                break;
        }
    }

    private applyFilterBySearchTextToFilterList(): void {
        this.filterList = this.filterList.filter((gift) =>
            gift.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
    }

    private applyFilterByCategoriesToFilterList(): void {
        if (this.filterCategories.length) {
            this.filterList = this.filterList.filter((gift) =>
                gift.categories.some((category) => this.filterCategories.includes(category))
            );
        }
    }

    private applyFilterByPriceToFilterList(): void {
        debugger;
        const minPrice = this.inputFilterByPriceMinimum.getValue();
        const maxPrice = this.inputFilterByPriceMaximum.getValue();

        if (maxPrice) {
            this.filterList = this.filterList.filter((e) => e.price <= maxPrice.parseFloat());
        }
        if (minPrice) {
            this.filterList = this.filterList.filter((e) => e.price >= minPrice.parseFloat());
        }
    }

    // TODO: arrumar uma forma de limpar os filtros
}
