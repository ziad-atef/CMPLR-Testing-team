import { getIframeBody } from "../Utils/utils";

const resetPasswordLabel = "Reset Password";
const cancelPasswordLabel = "Cancel";
const doneLabel = "Done";
class ResetPassword {
  emailField() {
    return cy.get('input[data-testid="email-forget-password"]').should("exist");
  }
  resetButton() {
    return cy
      .get('button[data-testid="reset-password-btn"]')
      .should("exist")
      .should("have.text", resetPasswordLabel);
  }
  cancelButton() {
    return cy
      .get('button[data-testid="cancel-btn"]')
      .should("exist")
      .should("have.text", cancelPasswordLabel);
  }
  doneButton() {
    return cy.get('button[title="Done"]').contains(doneLabel);
  }
  recaptchaChecker() {
    return getIframeBody('iframe[title="reCAPTCHA"]')
      .find("div.recaptcha-checkbox-border")
      .should("exist");
  }

  setNewPasswordErrorParagraph() {
    return cy.get('div[data-testid="message-error"]').should("exist");
  }
  emailFromEmailField() {
    return cy
      .get('input[data-testid="input-labels"]')
      .eq(0)
      .should("exist")
      .and("be.enabled");
  }
  setNewPasswordButton() {
    return cy.get('button[data-testid="button-reset-password"]');
    // .should("exist")
    // .and("be.disabled");
  }
  newPasswordFromEmailField() {
    return cy
      .get('input[data-testid="input-labels"]')
      .eq(1)
      .should("exist")
      .and("not.be.disabled");
  }
  confirmNewPasswordFromEmailField() {
    return cy
      .get('input[data-testid="input-labels"]')
      .eq(2)
      .should("exist")
      .and("not.be.disabled");
  }
}

export default ResetPassword;
