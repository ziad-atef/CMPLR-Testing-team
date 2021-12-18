import Dashboard from '../../Page Objects/dashboard';
const DashboardPOM = new Dashboard();

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

  it('Log Out', () => {
    cy.fixture('PersonalData').then((user) => {
      cy.authenticate(user.email, user.password);
      cy.visit('/');
    });
    DashboardPOM.accountButton();
  });
});