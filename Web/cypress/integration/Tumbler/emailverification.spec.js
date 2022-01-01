import Login from "../../Page Objects/login";
import Navbar from "../../Page Objects/Navbar";
import AccountSettings from "../../Page Objects/accountSettings";
import { beforeEach } from "mocha";

var faker = require("faker/locale/en");
var verifyEmailLink;
const NavbarPOM = new Navbar();
const AccountSettingsPOM = new AccountSettings();

describe("email verification", () => {
  let email, password;
  const verificationSentence =
    "All the finest CMPlr users verify their email address. Check your inbox for the message we just sent.";
  const emailVerificationMessages = [
    "Verify Email Address",
    // "Hello! Just need you to verify that this is your email address. Is this you?",
    // "Thanks! Gotta keep the internet safe from spambots and all that.",
  ];
  const linkExtractStart = 'href="https://beta.cmplr.tech/verify-email',
    linkExtractEnd = '" ';
  const linkExtractIndex = 6;

  beforeEach(function () {
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
    cy.visit(verifyEmailLink);
    cy.wait(5000);
    cy.visit("/");

    cy.contains(verificationSentence).should("not.exist");
  });

  it("Try To Delete Email With Wrong Password", function () {
    cy.authenticate(email, password);
    cy.visit("/settings/account");

    AccountSettingsPOM.deleteAccountButton().click();
    AccountSettingsPOM.deleteAccountEmailField().type(email);
    AccountSettingsPOM.deleteAccountPasswordField().type(
      faker.internet.password()
    );
    AccountSettingsPOM.deleteAccountDeleteButton().click();
    cy.contains("email or password is incorrect");
  });

  it("Try To Delete Email With Wrong Email", function () {
    cy.authenticate(email, password);
    cy.visit("/settings/account");

    AccountSettingsPOM.deleteAccountButton().click();
    AccountSettingsPOM.deleteAccountEmailField().type(faker.internet.email());
    AccountSettingsPOM.deleteAccountPasswordField().type(password);
    AccountSettingsPOM.deleteAccountDeleteButton().click();
    cy.contains("email or password is incorrect");
  });

  it("Try To Delete Email With Another Registered Email", function () {
    cy.fixture("PersonalData").then((user) => {
      cy.authenticate(email, password);
      cy.visit("/settings/account");

      AccountSettingsPOM.deleteAccountButton().click();
      AccountSettingsPOM.deleteAccountEmailField().type(user.email);
      AccountSettingsPOM.deleteAccountPasswordField().type(user.password);
      AccountSettingsPOM.deleteAccountDeleteButton().click();
      cy.contains("email or password is incorrect");
    });
  });

  it("Delete Email", function () {
    cy.authenticate(email, password);
    cy.visit("/settings/account");

    AccountSettingsPOM.deleteAccountButton().click();
    AccountSettingsPOM.deleteAccountEmailField().type(email);
    AccountSettingsPOM.deleteAccountPasswordField().type(password);
    AccountSettingsPOM.deleteAccountDeleteButton().click();

    cy.url().should("include", "login");
  });
  it("Check That Email Is Deleted", function () {
    cy.visit("/login");
    cy.login(
      new Login(),
      email,
      password,
      false,
      "email or password is not valid"
    );
  });
});
