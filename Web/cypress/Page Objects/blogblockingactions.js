class BlogBlocking {
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
        return cy.get('input[name="email"]');

    }
    passwordField() {
        // return cy.get('input.o4KIk[name="password"]');
        return cy.get('input[name="password"]');
    }
    loginButtoninside() {
        return cy.get('button.TRX6J.CxLjL.qjTo7.CguuB.yC5pj[type="submit"]');
        //return cy.get('a[data-testid="login"]');
    }
    //searching for blogs
    searchField() {
        return cy.get('input.NaqPB[aria-label="Search"]');
    }
    searchResult() {
        return cy.get('div.Ut4iZ.veU9u a.BSUG4.wmRou').then(($cov) => {
            const items = $cov.toArray(); 
            return Cypress._.sample(items);
        });
    }
    //open blogs
    moreOptions() {
        return cy.get('header button.TRX6J[aria-label="More options"]').first();
    }
    blog() {
        cy.get('div.ED7XC').then(($cov) => {
            const items = $cov.toArray(); 
            return Cypress._.sample(items);
        }).click();
    }
    checkOutBlog() {
        return cy.get('span.BPf9u span.BPf9u a.BSUG4.wmRou[rel="noopener"]').then(($cov) => {
            const items = $cov.toArray(); 
            return Cypress._.sample(items);
        });
    }
    newReciversButton() {
        cy.get('button.TRX6J[aria-label="New Message"]').then(($cov) => {
            const items = $cov.toArray(); 
            return Cypress._.sample(items);
        }).click();
    }
    
}
export default BlogBlocking;