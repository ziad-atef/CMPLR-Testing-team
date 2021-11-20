import { getIframeBody } from '../Utils/utils';

const resetPasswordLabel = "Reset password";
const cancelPasswordLabel = "Cancel";
const doneLabel = "Done";
class ResetPassword {
    emailField() {
        return cy.get('input.text_field[name="email"]').should("exist");
    }
    resetButton() {
        return cy.get('button[type="submit"]')
            .should("exist")
            .should('have.text', resetPasswordLabel);
    }
    cancelButton() {
        return cy.get('a.cancel')
            .should("exist")
            .should("have.text", cancelPasswordLabel);
    }
    doneButton() {
        return cy.get('a.cancel')
            .contains(doneLabel);
    }
    recaptchaChecker() {
        return getIframeBody('iframe[title="reCAPTCHA"]')
            .find('span.recaptcha-checkbox')
            .should('exist');
    }



    setNewPasswordErrorParagraph() {
        return cy.get('p.error')
            .should("exist").and('be.enabled');
    }
    setNewPasswordButton() {
        return cy.get('button#submit_button[type="submit"]')
            .contains("Set new password")
            .should("exist").and('be.enabled');
    }
    emailFromEmailField() {
        return cy.get('input.text_field[name="email"]')
            .should('exist')
            .and('be.disabled');
    }
    newPasswordFromEmailField() {
        return cy.get('input.text_field[name="password"]')
            .should('exist')
            .and('not.be.disabled');
    }
    confirmNewPasswordFromEmailField() {
        return cy.get('input.text_field[name="password_confirm"]')
            .should('exist')
            .and('not.be.disabled');
    }
}

export default ResetPassword;