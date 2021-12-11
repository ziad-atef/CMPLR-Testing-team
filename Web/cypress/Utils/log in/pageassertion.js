module.exports.success = () => {
  cy.get("div.Radar").should("exist");
  cy.get("div.dashboard-sidebar").should("exist");

  cy.contains("Text").should("exist");
  cy.contains("Photo").should("exist");
  cy.contains("Quote").should("exist");
  cy.contains("Link").should("exist");
  cy.contains("Chat").should("exist");
  cy.contains("Audio").should("exist");
  cy.contains("Video").should("exist");
  cy.contains("Radar").should("exist");

  cy.url().should("not.include", "login");
  cy.url().should("include", "dashboard");
};

module.exports.fail = (failMessage) => {
  cy.get("div.Radar").should("have.length", 0).and("not.exist");
  cy.get("div.dashboard-sidebar").should("have.length", 0).and("not.exist");

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
  cy.url().should("not.include", "dashboard");
};

module.exports.noAuth = () => {
  cy.contains("Text").should("have.length", 0).and("not.exist");
  cy.contains("Photo").should("have.length", 0).and("not.exist");
  cy.contains("Quote").should("have.length", 0).and("not.exist");
  cy.contains("Link").should("have.length", 0).and("not.exist");
  cy.contains("Chat").should("have.length", 0).and("not.exist");
  cy.contains("Audio").should("have.length", 0).and("not.exist");
  cy.contains("Video").should("have.length", 0).and("not.exist");
  cy.contains("Radar").should("have.length", 0).and("not.exist");
}