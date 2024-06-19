import { Component, Input, OnInit } from "@angular/core";
import { BaseInputTextModifier } from "./input-text-modifiers";
import { BaseValidator } from "../../../../services/validators/base.validator";
import { BaseInputComponent } from "../base-input.component";

type InputTypes = "email" | "text" | "tel";

@Component({
    selector: "app-input-text",
    templateUrl: "./input-text.component.html",
    styleUrls: [],
})
export class InputTextComponent extends BaseInputComponent implements OnInit {
    @Input() label: string;
    @Input() fieldName: string;
    @Input() type: InputTypes = "text";
    @Input() placeholder: string = "";
    @Input() required: boolean = false;
    @Input() mask: string;
    @Input() initialValue: string;
    @Input() helperText: string;
    @Input() showInfoPopover: boolean = false;
    @Input() validators: BaseValidator[] = [];
    @Input() modifier: BaseInputTextModifier;
    @Input() readOnly: boolean = false;
    @Input() showClearButton: boolean = false;
    protected value: string = "";
    protected isValidated: boolean = false;
    protected valid: boolean = true;
    protected errorMessage: string = "";

    ngOnInit(): void {
        this.setInputId(this.label);
        this.value = this.initialValue;
        this.fieldName = this.fieldName || this.label || this.placeholder;
    }

    getValue(): string {
        return this.value;
    }

    validate(): boolean {
        this.isValidated = true;
        this.valid = true;
        if (this.required && !this.value) {
            this.valid = false;
            this.errorMessage = this.ERROR_MESSAGES.INPUT_FIELD_REQUIRED(this.fieldName);
            console.info(`Componente ${this.fieldName} está inválido por motivos de obrigatoriedade`);
        } else if (this.mask && this.value && this.mask.length !== this.value.length) {
            this.valid = false;
            this.errorMessage = this.ERROR_MESSAGES.INPUT_FIELD_MASK_INCOMPLETE(this.fieldName);
            console.info(`Componente ${this.fieldName} está inválido por motivos de erro de máscara`);
        } else if (this.validators.length) {
            this.validators.forEach((v) => {
                if (this.value && !v.isValid(this.value)) {
                    this.valid = false;
                    this.errorMessage = v.errorMessage
                        ? v.errorMessage
                        : this.ERROR_MESSAGES.INPUT_FIELD_INVALID(this.fieldName);
                    console.info(`Componente ${this.label} está inválido por motivos de campo inválido`);
                }
            });
        }
        return this.valid;
    }

    isValid(): boolean {
        return this.valid;
    }

    changeValue(newValue: string): void {
        if (newValue) {
            this.value = newValue;
        }
    }

    protected onClearInput(): void {
        this.value = "";
    }

    protected onChange(): void {
        if (this.isValidated) {
            this.validate();
        }
    }
    protected onInputChange(event: any): void {
        this.value = event.target.value;
        if (this.modifier && this.value) {
            this.value = this.modifier.modify(this.value);

            if (event) {
                const htmlInput = event.target as HTMLInputElement;
                htmlInput.value = this.value;
            }
        }
    }
}
