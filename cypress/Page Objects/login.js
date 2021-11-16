class Login {
    loginButton() {
        // return cy.get('a.HhR12._xpjA.kmijQ.QqnsM[href="/login"]').first();
        return cy.get('a.Z8Ux2.qjTo7.CguuB.bS3ge[href="/login"]').first();
        // return cy.get('form').last();
    }
    appbarLoginButton() {
        // return cy.get('a.HhR12._xpjA.i_kY6[href="/login"]');
        return cy.get('a.Z8Ux2.qjTo7.IMvK3[href="/login"]');
    }
    emailField() {
        // return cy.get('input.o4KIk[name="email"]');
        return cy.get('input.gj_Aq[name="email"]');

    }
    passwordField() {
        // return cy.get('input.o4KIk[name="password"]');
        return cy.get('input.gj_Aq[name="password"]');
    }
    loginButtoninside() {
        // return cy.get('button.xBRdB.ZYq7T._xpjA.kmijQ.FJv1f[type="submit"]');
        return cy.get('button.TRX6J.CxLjL.qjTo7.CguuB.yC5pj[type="submit"]');
    }
}

export default Login;