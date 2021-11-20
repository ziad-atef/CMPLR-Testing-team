const getIframeDocument = () => {
    // return cy.get('iframe.RXu2m').its('0.contentDocument').should('exist')
    return cy.get('iframe.iframe.iframe-content.html-preview.form-control[data-name="html-preview"]').its('0.contentDocument').should('exist')
}

const getIframeBody = () => {
    return getIframeDocument().its('body').should('not.be.undefined').then(cy.wrap)
}
class MailSlurp {
    VerificationLink() {
        return cy.get('iframe.iframe.iframe-content.html-preview.form-control[data-name="html-preview"]');
    }
}

export default MailSlurp;