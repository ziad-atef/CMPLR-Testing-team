import Login from "../../Page Objects/login";
import MailSlurp from "../../Page Objects/mailslurp";
import Verification from "../../Page Objects/verification";
var faker = require("faker/locale/en");

describe("email verification", () => {
  let email, password;
  const verificationSentence =
    "All the finest CMPlr users verify their email address. Check your inbox for the message we just sent.";
  const emailVerificationMessages = [
    "Verify Email Address",
    // "Hello! Just need you to verify that this is your email address. Is this you?",
    // "Thanks! Gotta keep the internet safe from spambots and all that.",
  ];
  const emailVerificationButtonText = "This is me!";
  const MailSlurpPOM = new MailSlurp();
  const VerificationPOM = new Verification();
  const linkExtractStart = 'href="https://beta.cmplr.tech/verify-email',
    linkExtractEnd = '"';
  const linkExtractIndex = 6;

  before(function () {
    cy.fixture("PersonalData").then((user) => {
      email = user.newEmail;
      password = user.newPassword;
    });
  });

  it.only("Signup New Email To Be Verified", function () {
    cy.visit("/register");
    expect(email).to.contain("@mailslurp");

    cy.get('input[data-testid="register_email"]').type(email);
    cy.get('input[data-testid="register_password"]').type(password);
    cy.get('input[data-testid="register_blogName"]').type(
      `${faker.lorem.word(faker.datatype.number(5, 10))}-testblog`
    );
    cy.get('button[data-testid="register_step1"]').click();

    cy.get('input[data-testid="register_age"]').type(22);
    cy.get('button[data-testid="register_step2"]').click();

    // cy.url().should("contain", "getting_to_know_tumblr");
    // cy.get("span.skip-button-container")
    //   .contains("Skip")
    //   .should("have.text", "Skip")
    //   .click();

    cy.url().should("contain", "dashboard");

    cy.contains(verificationSentence);
      cy.contains("Resend").click();
    cy.wait(10000);
    cy.mailslurp()
      .then((mailslurp) => mailslurp.waitForLatestEmail(password, 30000, false))
      .then((sentEmail) => {
        cy.log(
          sentEmail.body
            .substring(
              sentEmail.body.indexOf('href="https://beta.cmplr.tech/verify-email'),
              sentEmail.body.indexOf('"')
            )
            .substr(linkExtractIndex)
        );

        assert.isDefined(sentEmail);
        expect(sentEmail.subject).to.contain(emailVerificationMessages[0]);
      });
  });

  it("Check That Email Is Not Verified", function () {
    cy.visit("https://www.tumblr.com/login");
    cy.login(new Login(), email, password);

    cy.url().should("contain", "dashboard");

    cy.get("h3.RUFdS").should("exist").contains(verificationSentence);
  });

  it("Verify email", function () {
    cy.mailslurp()
      .then((mailslurp) => mailslurp.waitForLatestEmail(password, 30000, false))
      .then((email) => {
        // verify we received an email
        assert.isDefined(email);
        expect(email.subject).to.contain(emailVerificationMessages[0]);

        cy.visit(`https://app.mailslurp.com/emails/${email.id}/`, {
          failOnStatusCode: false,
        });
        cy.contains("Login with Google").click();
        cy.wait(3000);
        cy.visit(`https://app.mailslurp.com/emails/${email.id}/`, {
          failOnStatusCode: false,
        });

        MailSlurpPOM.VerificationLink()
          .invoke("attr", "src")
          .then((link) => {
            cy.visit(link);

            cy.contains(emailVerificationMessages[1]);
            cy.contains(emailVerificationMessages[2]);
            cy.contains(emailVerificationButtonText).click();

            VerificationPOM.recaptcha().click();

            cy.wait(10000);
            VerificationPOM.verificationButton()
              .contains("Verify Email")
              .click();
          });
      });
  });

  it("check email has been verified", function () {
    cy.visit("/login");
    cy.login(new Login(), email, password);

    cy.url().should("contain", "dashboard");

    cy.get("h3.RUFdS").should("not.exist");
  });
});
