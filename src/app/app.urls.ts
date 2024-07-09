import { environment } from "../environments/environment";

export class AppUrls {
    public static readonly PATHS = {
        ROOT: {
            ABSOLUTE_PATH: () => `/`,
            RELATIVE_PATH: () => "",
        },
        GIFTS: {
            ABSOLUTE_PATH: () => `${AppUrls.PATHS.ROOT.ABSOLUTE_PATH()}presentes`,
            RELATIVE_PATH: () => `${AppUrls.PATHS.ROOT.RELATIVE_PATH()}presentes`,
            LIST: {
                ABSOLUTE_PATH: () => `${AppUrls.PATHS.GIFTS.ABSOLUTE_PATH()}/lista`,
                RELATIVE_PATH: () => `${AppUrls.PATHS.GIFTS.RELATIVE_PATH()}/lista`,
            },
            DETAILS: {
                ABSOLUTE_PATH: () => `${AppUrls.PATHS.GIFTS.ABSOLUTE_PATH()}/detalhes`,
                RELATIVE_PATH: () => `${AppUrls.PATHS.GIFTS.RELATIVE_PATH()}/detalhes`,
            },
            CHECKOUT: {
                ABSOLUTE_PATH: () => `${AppUrls.PATHS.GIFTS.ABSOLUTE_PATH()}/pagamento`,
                RELATIVE_PATH: () => `${AppUrls.PATHS.GIFTS.RELATIVE_PATH()}/pagamento`,
            },
        },
        CHECKOUT_REDIRECT: (relative: boolean = true) => `${relative ? "" : "/"}pagamento/redirecionando`,
        ADMIN: {
            MAIN: (relative: boolean = true) => `${relative ? "" : "/"}admin`,
            LOGIN: (relative: boolean = true) => `${relative ? "" : "/"}admin/login`,
        },
    };

    public static readonly EXTERNAL_URLS = {};

    public static readonly API_ENDPOINTS = {
        GIFTS: {
            FIND_ALL: (): string => {
                return `${environment.apiUrl.firebaseDb}/gifts.json`;
            },
            PAYMENT: {
                PIX: (totalPrice: number): string => {
                    // return `http://gerarqrcodepix.com.br/api/v1?nome=Igor Resende Pinheiro&cidade=Recife&saida=br&txid=PresenteCasorioRaquelIgor&valor=299.50&chave=+5581998212130`;
                    return `https://pix.ae?chave=f10f3e71-3ee4-4da1-825f-dab3c4056c9a&tipo=aleatoria&nome=Igor Resende Pinheiro&valor=${totalPrice}&info=Presente de Raquel e Igor&txid=PresenteCasamento`;
                },
                CREDIT_CARD: (): string => {
                    return `${environment.apiUrl.backend}/checkout`;
                },
            },
            CHECKOUT_MESSAGE: (): string => {
                if (environment.production) {
                    return `${environment.apiUrl.firebaseDb}/checkout-messages.json`;
                }
                return `http://localhost:3000/checkout-messages`;
            },
        },
        RSVP: {
            ANSWERS: (): string => {
                if (environment.production) {
                    return `${environment.apiUrl.firebaseDb}/rsvp.json`;
                }
                return `http://localhost:3000/rsvp`;
            },
        },
    };
}
