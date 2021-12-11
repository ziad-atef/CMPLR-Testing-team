class Login {
    loginButton() {
        // return cy.get('a.HhR12._xpjA.kmijQ.QqnsM[href="/login"]').first();
        return cy.get('a[data-testid="login-btn"]').first();
        // return cy.get('form').last();
    }
    appbarLoginButton() {
        // return cy.get('a.HhR12._xpjA.i_kY6[href="/login"]');
        return cy.get('a[href="/login"]').first();
    }
    secondaryLoginButton() {
        return cy.get('a[data-testid="login-btn"]').last();
    }
    emailField() {
        // return cy.get('input.o4KIk[name="email"]');
        return cy.get('input[data-testid="email"]');

    }
    passwordField() {
        // return cy.get('input.o4KIk[name="password"]');
        return cy.get('input[data-testid="password"]');
    }
    loginButtoninside() {
        // return cy.get('button.xBRdB.ZYq7T._xpjA.kmijQ.FJv1f[type="submit"]');
        return cy.get('a[data-testid="login"]');
    }
    resetPassword() {
        return cy.get('a[href="/forget_password"]').contains("Forgot your password?").should('exist');
    }
}

export default Login;