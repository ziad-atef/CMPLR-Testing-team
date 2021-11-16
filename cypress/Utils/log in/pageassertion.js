const linux = true;
module.exports.success = () => {
  if (linux) {
    cy.get("div.j8ha0").should("exist");
    cy.get("div.e1knl").should("exist");
  } else {
    // cy.get('div.JmReO').should('exist');
    // cy.get('div._SeDR').should('exist');
  }
  cy.contains("Text").should("exist");
  cy.contains("Photo").should("exist");
  cy.contains("Quote").should("exist");
  cy.contains("Link").should("exist");
  cy.contains("Chat").should("exist");
  cy.contains("Audio").should("exist");
  cy.contains("Video").should("exist");
  cy.contains("Radar").should("exist");

  cy.url().should("not.include", "login");
};

module.exports.fail = (failMessage) => {
    if (linux) {
        cy.get("div.j8ha0").should("have.length", 0).and("not.exist");
        cy.get("div.e1knl").should("have.length", 0).and("not.exist");
      } else {
        // cy.get('div.JmReO').should('have.length', 0).and('not.exist');
        // cy.get('div._SeDR').should('have.length', 0).and('not.exist');
      }
  cy.contains("Text").should("have.length", 0).and("not.exist");
  cy.contains("Photo").should("have.length", 0).and("not.exist");
  cy.contains("Quote").should("have.length", 0).and("not.exist");
  cy.contains("Link").should("have.length", 0).and("not.exist");
  cy.contains("Chat").should("have.length", 0).and("not.exist");
  cy.contains("Audio").should("have.length", 0).and("not.exist");
  cy.contains("Video").should("have.length", 0).and("not.exist");
  cy.contains("Radar").should("have.length", 0).and("not.exist");

  cy.contains(failMessage);
  cy.url().should("include", "login");
};
