const getIframeDocument = (query) => {
    // return cy.get('iframe.RXu2m').its('0.contentDocument').should('exist')
    return cy.get(query).its('0.contentDocument').should('exist')
}
module.exports.getIframeBody = (query) => {
    return getIframeDocument(query).its('body').should('not.be.undefined').then(cy.wrap)
}

