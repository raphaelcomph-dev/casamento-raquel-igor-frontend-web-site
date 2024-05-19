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
        },
    };

    public static readonly EXTERNAL_URLS = {};
}
