module.exports.success = () => {
  cy.get("div.dashboard-recommend-blogs").and("be.visible");
  cy.get("div.dashboard-recommend-blogs")
    .children()
    .should("have.length.greaterThan", 1);
  cy.get("div.Radar").find('h3').should("have.text", "Radar").and("be.visible");
};
