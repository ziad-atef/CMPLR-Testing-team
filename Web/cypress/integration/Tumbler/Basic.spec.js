describe("Basic", () => {
  beforeEach(() => {
    /*
            first you have to pass the url of the website, or the page you want
            to start your test with, you want to test
        */
    cy.visit("/");
  });
  it("when reload the page the background changes", () => {
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
});
