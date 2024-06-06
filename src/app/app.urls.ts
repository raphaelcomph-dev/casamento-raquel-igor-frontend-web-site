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
        },
    };

    public static readonly EXTERNAL_URLS = {};

    public static readonly API_ENDPOINTS = {
        GIFTS: {
            FIND_ALL: (): string => {
                if (environment.production) {
                    return `${environment.apiUrl}/gifts.json`;
                }
                // return `http://localhost:3000/gifts`;
                return `https://casamento-raquel-igor-default-rtdb.firebaseio.com/gifts.json`;
            },
        },
        RSVP: {
            POST_ANSWER: (): string => {
                if (environment.production) {
                    return `${environment.apiUrl}/rsvp.json`;
                }
                return `http://localhost:3000/rsvp`;
            },
        },
    };
}
