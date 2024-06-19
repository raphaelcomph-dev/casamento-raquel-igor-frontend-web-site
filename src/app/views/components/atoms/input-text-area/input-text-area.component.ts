import { Component, Input, OnInit } from "@angular/core";
import { BaseInputComponent } from "../base-input.component";

@Component({
    selector: "app-input-text-area",
    templateUrl: "./input-text-area.component.html",
    styles: [],
})
export class InputTextAreaComponent extends BaseInputComponent implements OnInit {
    @Input() label: string;
    @Input() fieldName: string;
    @Input() placeholder: string = "";
    @Input() required: boolean = false;
    @Input() rows: number = 6;
    @Input() initialValue: string;
    @Input() helperText: string;
    @Input() readOnly: boolean = false;

    protected value: string = "";
    protected isValidated: boolean = false;
    protected valid: boolean = true;
    protected errorMessage: string = "";

    ngOnInit(): void {
        this.setInputId(this.label);
        this.value = this.initialValue;
        this.fieldName = this.fieldName || this.label;
    }

    validate(): boolean {
        this.isValidated = true;
        this.valid = true;
        if (this.required && !this.value) {
            this.valid = false;
            this.errorMessage = this.ERROR_MESSAGES.INPUT_FIELD_REQUIRED(this.fieldName);
            console.info(`Componente ${this.fieldName} está inválido por motivos de obrigatoriedade`);
        }
        return this.valid;
    }

    isValid(): boolean {
        return this.valid;
    }

    getValue(): string {
        return this.value;
    }

    changeValue(newValue: string): void {
        if (newValue) {
            this.value = newValue;
        }
    }

    protected onChange(event: any): void {
        if (this.isValidated) {
            this.validate();
        }
    }
}
