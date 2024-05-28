import { BaseView } from "./base.view";

export enum FormStateEnum {
    INITIAL = "INITIAL",
    SUBMITTED_LOADING = "SUBMITTED_LOADING",
    SUBMITTED_SUCCESSFULLY = "SUBMITTED_SUCCESSFULLY",
    SUBMITION_FAILED = "SUBMITION_FAILED",
}

export class BaseFormView extends BaseView {
    constructor() {
        super();
    }

    isFormInInitialState = (formState: FormStateEnum): boolean => formState === FormStateEnum.INITIAL;
    isFormInLoadingState = (formState: FormStateEnum): boolean => formState === FormStateEnum.SUBMITTED_LOADING;
    isFormInSuccessState = (formState: FormStateEnum): boolean => formState === FormStateEnum.SUBMITTED_SUCCESSFULLY;
    isFormInErrorState = (formState: FormStateEnum): boolean => formState === FormStateEnum.SUBMITION_FAILED;
    isFormInEditableState = (formState: FormStateEnum): boolean =>
        formState === FormStateEnum.INITIAL || formState === FormStateEnum.SUBMITION_FAILED;
}
