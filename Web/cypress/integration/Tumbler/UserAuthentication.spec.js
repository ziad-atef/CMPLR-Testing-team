import { success } from "../../Utils/log in/pageassertion";

describe("User Authentication", () => {
  before(() => {
    cy.fixture("PersonalData").then((user) => {
      cy.authenticate(user.email, user.password);
      cy.visit("/dashboard");
    });
    cy.url().should("not.include", "login");
  });

  it("Visit Dashboard", () => {
    cy.visit("/dashboard");
    cy.url().should("not.include", "login?redirect_to");
  });
});