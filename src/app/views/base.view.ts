import * as dayjs from "dayjs";
import { v1 as uuidv1 } from "uuid";
import { environment } from "../../environments/environment";
import { AppUrls } from "../app.urls";
import { ErrorMessages } from "../models/enums/error-messages.enum";

export class BaseView {
    URLS = AppUrls;
    ERROR_MESSAGES = ErrorMessages;
    locale: string = "pt-br";
    now = new Date();
    env = environment;

    constructor() {}

    generateRandomCode(): string {
        const uuid: string = uuidv1();
        return uuid.substring(0, 8);
    }

    formatNumber(value: number): string {
        if (value != null && value != undefined) {
            return value.toLocaleString("pt-BR");
        }
        return `-`;
    }

    formatPercentage(value: number): string {
        if (value != null && value != undefined) {
            return (value / 100).toLocaleString("pt-BR", { style: "percent", minimumFractionDigits: 2 });
        }
        return `-`;
    }

    formatCurrency(value: number): string {
        if (value != null && value != undefined) {
            return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });
        }
        return `-`;
    }

    formatDate(value: Date, format: string = "DD/MM/YYYY"): string {
        if (value != null && value != undefined) {
            return dayjs(value).locale(this.locale).format(format);
        }
        return `-`;
    }

    formatDocument(value: string, format: "CNPJ" | "CPF"): string {
        if (value != null && value != undefined) {
            if (format == "CNPJ") {
                return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, `$1.$2.$3/$4-$5`);
            } else if (format == "CPF") {
                return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, `$1.$2.$3-$4`);
            }
        }
        return `-`;
    }

    scrollTo(elementId?: string, offsetY: number = 85): void {
        setTimeout(() => {
            if (elementId) {
                const element = document.getElementById(elementId);
                const y = element.getBoundingClientRect().top + window.scrollY - offsetY;

                window.scrollTo({ top: y, behavior: "smooth" });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }, 100);
    }
}
