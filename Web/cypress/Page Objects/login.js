class Login {
    loginButton() {
        return cy.get('a[data-testid="login-btn"]').first();
    }

    appbarLoginButton() {
        return cy.get('a[href="/login"]').first();
    }

    secondaryLoginButton() {
        return cy.get('a[data-testid="login-btn"]').last();
    }

    emailField() {
        return cy.get('input[data-testid="email"]');
    }

    passwordField() {
        return cy.get('input[data-testid="password"]');
    }

    loginButtoninside() {
        return cy.get('button[data-testid="login"]');
    }
    
    resetPassword() {
        return cy.get('a[href="/forget_password"]').contains("Forgot your password?").should('exist');
    }
}

export default Login;