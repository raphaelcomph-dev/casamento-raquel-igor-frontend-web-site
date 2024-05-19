export abstract class BaseValidator {
    public static MASKS = {
        PHONE: "(00) 000 00 00 00",
    };
    public static FIELDS = {
        TEXT: {
            MIN_LENGTH: 2,
            MAX_LENGTH: 256,
        },
        PHONE: {
            MIN_LENGTH: 10,
            MAX_LENGTH: 11,
        },
        EMAIL: {
            USERNAME: {
                MIN_LENGTH: 2,
                MAX_LENGTH: 64,
            },
            DOMAIN: {
                HOST: {
                    MIN_LENGTH: 1,
                    MAX_LENGTH: 64,
                },
                TOP_LEVEL: {
                    MIN_LENGTH: 2,
                    MAX_LENGTH: 64,
                },
            },
        },
    };

    private _errorMessage: string;

    public get errorMessage(): string {
        return this._errorMessage;
    }

    constructor(errorMessage: string = null) {
        this._errorMessage = errorMessage;
    }

    public abstract isValid(text: string): boolean;
}
