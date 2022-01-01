let count = 0;

const stress = () => {
  count=count+1;
  cy.log(count);
  cy.visit('https://beta.cmplr.tech/');
  stress();
}

describe("Stress", () => {
    it("Stress", () => {
      stress();
    }); 
});
  