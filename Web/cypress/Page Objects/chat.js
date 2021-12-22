class Chat {
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
    chatsButton() {
        return cy.get('button.TRX6J.B1L2M[aria-label="Messaging"]');
    }
    newMessagesButton() {
        return cy.get('button.TRX6J[aria-label="New Message"]');
    }
    newMessageReciverField() {
        return cy.get('div.glTqf input');
    }
    newReciversButton() {
        cy.get('button.TRX6J[aria-label="New Message"]').then(($cov) => {
            const items = $cov.toArray(); 
            return Cypress._.sample(items);
        }).click()
    }
    conversationButton() {
        //return cy.get('button.TRX6J._vFtf[aria-label="Conversation"]');
        cy.get('button.TRX6J._vFtf[aria-label="Conversation"]').then(($cov) => {
            const items = $cov.toArray(); 
            return Cypress._.sample(items);
        }).click()
    }
    messageField() {
        return cy.get('textarea.xXTjk');
    }
    sendButton() {
        return cy.get('button.TRX6J.nWfaK.PbfxP[aria-label="Send"]');
    }
    gifButton() {
        return cy.get('button.TRX6J.PbfxP[aria-label="Gif Search"]');
    }
    GIF() {
        //return cy.get('button.TRX6J._vFtf[aria-label="Conversation"]');
        cy.get('img.nLowv.t5G6U[loading="lazy"]').then(($cov) => {
            const items = $cov.toArray(); 
            return Cypress._.sample(items);
        }).click()
    }
}
export default Chat;