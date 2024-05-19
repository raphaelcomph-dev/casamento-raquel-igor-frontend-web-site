export class ErrorMessages {
    public static FORM_HAS_ERRORS = (formName = "formulário"): string =>
        `Encontramos erros no preenchimento do ${formName}. Por favor, corrija e tente novamente`;
    public static INPUT_FIELD_REQUIRED = (fieldName: string): string => `O campo '${fieldName}' é obrigatório.`;
    public static SELECT_FIELD_REQUIRED = (fieldName: string): string =>
        `O campo '${fieldName}' é obrigatório. Por favor, selecione uma das opções disponíveis`;
    public static INPUT_FIELD_INVALID = (fieldName: string): string => `O campo '${fieldName}' está inválido.`;
    public static INPUT_FIELD_MASK_INCOMPLETE = (fieldName: string): string =>
        `O campo '${fieldName}' está incompleto.`;
    public static CHECKBOX_FIELD_REQUIRED = (isMultipleChoice: boolean): string =>
        `É obrigatório selecionar ${isMultipleChoice ? "pelo menos" : ""} uma opção.`;
    public static DATE_TIMELINE_INVALID = (
        fieldName: string,
        shouldBeInFuture: boolean,
        shouldBeInPast: boolean
    ): string => {
        if (shouldBeInFuture) {
            return `O campo '${fieldName}' precisa ser uma data posterior a data atual.`;
        }
        if (shouldBeInPast) {
            return `O campo '${fieldName}' precisa ser uma data anterior a data atual.`;
        }
        return "";
    };
}
