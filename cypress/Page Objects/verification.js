const getIframeDocument = () => {
    // return cy.get('iframe.RXu2m').its('0.contentDocument').should('exist')
    return cy.get('iframe[title="reCAPTCHA"]').its('0.contentDocument').should('exist')
}

const getIframeBody = () => {
    return getIframeDocument().its('body').should('not.be.undefined').then(cy.wrap)
}


class Verification {
    recaptcha() {
        return getIframeBody().find('span.recaptcha-checkbox').should('exist');
    }

    verificationButton() {
        return cy.get('button[type="submit"]').should('exist');
    }
}

export default Verification;