module.exports.success = () => {
    cy.get('ul[aria-label="Check out these blogs"]').and('be.visible');
    cy.get('h1.hF8Wr').eq(1).should('have.text', 'Radar').and('be.visible');
};