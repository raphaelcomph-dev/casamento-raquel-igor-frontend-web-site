import { ErrorMessages } from "../../../models/enums/error-messages.enum";

export class BaseInputComponent {
    protected inputId: string;
    ERROR_MESSAGES = ErrorMessages;

    protected setInputId(label: string): void {
        const inputLabel =
            label ||
            Math.random()
                .toString(36)
                .substring(2, 6 + 2);
        this.inputId = `input-${inputLabel
            ?.toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .replaceAll(" ", "-")}`;
    }
}
