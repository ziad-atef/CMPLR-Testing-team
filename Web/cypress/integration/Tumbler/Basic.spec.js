import Dashboard from "../../Page Objects/dashboard";
import Navbar from "../../Page Objects/Navbar";
const DashboardPOM = new Dashboard();
const NavbarPOM = new Navbar();

describe("Basic", () => {
  it("when reload the page the background changes", () => {
    cy.visit("/");
    cy.get('section[data-testid="home-sec1"]')
      .invoke("attr", "style")
      .then((prevBackground) => {
        cy.log(prevBackground);
        cy.reload();
        cy.get('section[data-testid="home-sec1"]')
          .invoke("attr", "style")
          .then((currBackground) => {
            cy.log(prevBackground);
            expect(currBackground).to.not.eq(prevBackground);
          });
      });
  });

  it("Log Out", () => {
    cy.fixture("PersonalData").then((user) => {
      cy.authenticate(user.email, user.password);
      cy.visit("/");
    });
    NavbarPOM.accountButton().click();
    NavbarPOM.LogoutButton().eq(0).click();
    cy.get('button.AuthBtn[title="OK"]').click();
    cy.url().should("equal", "https://beta.cmplr.tech/");
  });
});
