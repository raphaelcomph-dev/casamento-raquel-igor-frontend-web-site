import { Component, Input, OnInit } from "@angular/core";
import { BaseInputComponent } from "../base-input.component";

export interface SelectOption {
    value: string;
    label: string;
}

@Component({
    selector: "app-select-single-choice",
    templateUrl: "./select-single-choice.component.html",
    styleUrls: [],
})
export class SelectSingleChoiceComponent extends BaseInputComponent implements OnInit {
    @Input() label: string = null;
    @Input() placeholder: string = null;
    @Input() helperText: string = null;
    @Input() options: SelectOption[];
    @Input() initialSelectedValue: string = "";
    @Input() required: boolean = false;
    @Input() readOnly: boolean = false;
    @Input() displayInline: boolean = false;
    protected selectedValue: string = "";
    protected isValidated: boolean = false;
    protected valid: boolean = true;
    protected errorMessage: string = "";

    ngOnInit(): void {
        this.setInputId(this.label);
        this.selectedValue = this.initialSelectedValue ?? "";
    }

    getSelectedValue(): string {
        return !this.selectedValue?.trim() ? null : this.selectedValue;
    }

    setValue(value: string): void {
        this.selectedValue = value;
    }

    validate(): boolean {
        this.isValidated = true;
        this.valid = true;
        if (this.required && !this.getSelectedValue()) {
            this.valid = false;
            this.errorMessage = this.ERROR_MESSAGES.SELECT_FIELD_REQUIRED(this.label);
            console.info(`Componente ${this.label} está inválido por motivos de obrigatoriedade`);
        }
        return this.valid;
    }

    isValid(): boolean {
        return this.valid;
    }
}
