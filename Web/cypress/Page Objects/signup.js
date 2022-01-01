class Signup{
    signupButton() {
        return cy.get('a[data-testid="signup-btn"]').first();
    }
    appbarSignupButton() {
        return cy.get('a[href="/register"]').first();
    }
    secondarySignupButton() {
        return cy.get('a[data-testid="signup-btn"]').last();
    }
    emailField() {
        return cy.get('[data-testid="register_email"]');
    }
    passwordField() {
        return cy.get('[data-testid="register_password"]');
    }
    ageField() {
        return cy.get('[data-testid = "register_age"]');
    }
    blogNameField() {
        return cy.get('[data-testid="register_blogName"]');
    }
    signupButtoninside() {
        return cy.get('[data-testid="register_step1"]');
    }
    ageButton() {
        return cy.get('[data-testid="register_step2"]');
    }
}

export default Signup;