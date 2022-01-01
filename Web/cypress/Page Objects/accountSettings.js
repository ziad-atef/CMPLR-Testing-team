class AccountSettings {
  deleteAccountButton() {
    return cy.get('button[title="Delete account"]');
  }
  deleteAccountEmailField() {
    return cy.get('input[type="email"]');
  }
  deleteAccountPasswordField() {
    return cy.get('input[type="password"]');
  }
  deleteAccountDeleteButton() {
    return cy.get('button[title="Delete Everything"]');
  }
  deleteAccountCancelButton() {
    return cy.get('button[title="Nevermind"]');
  }
}

export default AccountSettings;
