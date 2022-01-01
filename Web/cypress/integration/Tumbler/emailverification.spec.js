import Login from "../../Page Objects/login";
import MailSlurp from "../../Page Objects/mailslurp";
import Verification from "../../Page Objects/verification";
var faker = require("faker/locale/en");
var verifyEmailLink;
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
    linkExtractEnd = '" ';
  const linkExtractIndex = 6;

  before(function () {
    cy.fixture("PersonalData").then((user) => {
      email = user.newEmail;
      password = user.newPassword;
    });
  });

  it("Signup New Email To Be Verified", function () {
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

    cy.url().should("contain", "dashboard");
    cy.contains(verificationSentence);

    cy.contains("Resend").click();
    cy.wait(10000);
    cy.mailslurp()
      .then((mailslurp) => mailslurp.waitForLatestEmail(password, 30000, false))
      .then((sentEmail) => {
        const subEmail = sentEmail.body.substring(
          sentEmail.body.indexOf(linkExtractStart)
        );
        verifyEmailLink = subEmail.substring(
          linkExtractIndex,
          subEmail.indexOf(linkExtractEnd)
        );

        assert.isDefined(sentEmail);
        expect(sentEmail.subject).to.contain(emailVerificationMessages[0]);
      });
  });

  it("Check That Email Is Not Verified", function () {
    cy.visit("/login");
    cy.login(new Login(), email, password);

    cy.url().should("contain", "dashboard");
    cy.contains(verificationSentence);
  });

  it("Verify email", function () {
    cy.authenticate(email, password);
    cy.visit(verifyEmailLink);

    cy.contains(verificationSentence).should("not.exist");
  });
});
