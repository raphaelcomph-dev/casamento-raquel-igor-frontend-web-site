import { Component, OnInit, ViewChild } from "@angular/core";
import { BaseFormPageView } from "../../base-form-page.view";
import { InputTextComponent } from "../../../components/atoms/input-text/input-text.component";
import { FormStateEnum } from "../../../base-form.view";
import { NotificationService } from "../../../../services/notification.service";
import { LoginFormDto } from "../../../../models/login.form.dto";
import { AuthService } from "../../../../services/auth.service";
import { Router } from "@angular/router";
import { HttpStatusCode } from "@angular/common/http";

@Component({
    selector: "admin-login-page",
    templateUrl: "./admin-login.page.html",
    styleUrl: "./admin-login.page.scss",
})
export class AdminLoginPage extends BaseFormPageView implements OnInit {
    @ViewChild("inputPassword") inputPassword: InputTextComponent;
    formState = FormStateEnum.INITIAL;
    remeberMe: boolean = false;

    constructor(
        private readonly notifier: NotificationService,
        private readonly authService: AuthService,
        private readonly router: Router
    ) {
        super();
    }

    ngOnInit(): void {
        this.redirectToAdminMainPageIfLoggedIn();
    }

    onSubmitLogin(): void {
        if (this.isFormValid()) {
            this.formState = FormStateEnum.SUBMITTED_LOADING;
            const dto = this.extractDtoFromForm();
            this.authService.postLogin(dto).subscribe({
                next: (response) => {
                    this.formState = FormStateEnum.SUBMITTED_SUCCESSFULLY;
                    this.notifier.showSuccess("Login realizado!");
                    setTimeout(() => {
                        this.router.navigate([this.URLS.PATHS.ADMIN.MAIN()]);
                    }, 500);
                },
                error: (e) => {
                    this.formState = FormStateEnum.SUBMITION_FAILED;

                    if (e.status === HttpStatusCode.Unauthorized) {
                        this.notifier.showError(e.error.message);
                    }

                    throw e;
                },
            });
        } else {
            this.formState = FormStateEnum.SUBMITION_FAILED;
            this.notifier.showError(this.ERROR_MESSAGES.FORM_HAS_ERRORS());
        }
    }

    private isFormValid(): boolean {
        let isValid = true;
        isValid = this.inputPassword.validate() && isValid;

        return isValid;
    }

    private extractDtoFromForm(): LoginFormDto {
        return {
            password: this.inputPassword.getValue(),
            rememberMe: this.remeberMe,
        };
    }

    private redirectToAdminMainPageIfLoggedIn(): void {
        if (this.authService.isLoggedIn) {
            this.router.navigate([this.URLS.PATHS.ADMIN.MAIN()]);
        }
    }
}
