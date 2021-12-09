class Signup{
    signupButton() {
        return cy.get('a.Z8Ux2.qjTo7.CguuB.bS3ge[href="/register?source=login_register_center"]').first();
    }
    appbarSignupButton() {
        return cy.get('a.Z8Ux2.qjTo7.IMvK3[href="/register?source=login_register_header_landing"]');
    }
    secondarySignupButton() {
        return cy.get('a.Z8Ux2.qjTo7.CguuB.bS3ge[href="/register?source=login_register_center"]').last();
    }
    emailField() {
        return cy.get('input.gj_Aq[name="email"]');

    }
    passwordField() {
        return cy.get('input.gj_Aq[name="password"]');
    }
    ageField() {
        return cy.get('input[name = "age"]');
    }
    blogNameField() {
        return cy.get('input.gj_Aq[name = "blogName"]');
    }
    signupButtoninside() {
        return cy.get('button.TRX6J.CxLjL.qjTo7.CguuB.yC5pj[type="submit"]');
    }
    ageButton() {
        return cy.get('button[type = "submit"]');
    }
}

export default Signup;