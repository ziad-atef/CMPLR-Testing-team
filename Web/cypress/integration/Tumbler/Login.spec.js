import Login from "../../Page Objects/login";
import { success, fail } from "../../Utils/log in/pageassertion";
import {
  pressAppBarLoginButton,
  pressBodyLoginButton,
  pressLowerLoginButton,
  fillEmailAndPassword,
} from "../../Utils/log in/utils";
let LoginPOM = new Login();
let email, spacedEmail, semiSpacedEmail;
let password;

const emptyEmailMessage = "please enter your email";
const emptyPasswordMessage = "please enter your password";
const InvalidEmailMessage = "The email must be a valid email address.";
const InvalidLoginMessage = "email or password is not valid";

describe("Logging In With App Bar Button", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.fixture("PersonalData").then((user) => {
      email = user.email;
      spacedEmail = user.spacedEmail;
      semiSpacedEmail = user.semiSpacedEmail;
      password = user.password;
    });
  });

  it("log in with empty email", () => {
    pressAppBarLoginButton();

    fillEmailAndPassword("", password);

    fail(emptyEmailMessage);
  });

  it("log in with empty password", () => {
    pressAppBarLoginButton();

    fillEmailAndPassword(email, "");

    fail(emptyPasswordMessage);
  });

  it("log in with empty email and password", () => {
    pressAppBarLoginButton();

    fillEmailAndPassword("", "");

    fail(emptyEmailMessage);
  });

  it("log in with valid email not valid password", () => {
    pressAppBarLoginButton();

    fillEmailAndPassword(email, "WRONG PASSWORD");

    fail(InvalidLoginMessage);
  });

  it("log in with not valid email valid password (1)", () => {
    pressAppBarLoginButton();

    fillEmailAndPassword("TEST_EMAIL", password);

    fail(InvalidEmailMessage);
  });

  it("log in with not valid email valid password (2)", () => {
    pressAppBarLoginButton();

    fillEmailAndPassword("TEST_EMAIL@gmail", password);

    fail(InvalidEmailMessage);
  });

  it("log in with not valid email valid password (3)", () => {
    pressAppBarLoginButton();

    fillEmailAndPassword("TEST_EMAIL.com", password);

    fail(InvalidEmailMessage);
  });

  it("log in with not registered email valid password", () => {
    pressAppBarLoginButton();

    fillEmailAndPassword("TEST_EMAIL@yahoo.com", password);

    fail(InvalidLoginMessage);
  });

  it("successfully log in", () => {
    pressAppBarLoginButton();

    fillEmailAndPassword(email, password);

    success();
    cy.url().should("include", "dashboard");
  });

  it("successfully log in with command", () => {
    pressAppBarLoginButton();
    cy.login(LoginPOM, email, password);
    cy.url().should("include", "dashboard");
  });

  it("Spaced Email Login", () => {
    pressAppBarLoginButton();
    cy.login(LoginPOM, spacedEmail, password, false, InvalidEmailMessage);
  });

  it("Spaced Email Login", () => {
    pressAppBarLoginButton();
    cy.login(LoginPOM, semiSpacedEmail, password, false, InvalidEmailMessage);
  });

  it("Login With Registered Invalid Email", () => {
    pressAppBarLoginButton();
    cy.login(
      LoginPOM,
      email.slice(0, 19),
      password,
      false,
      InvalidEmailMessage
    );
  });
});

describe("Logging In With Body And Lower Button", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.fixture("PersonalData").then((user) => {
      email = user.email;
      password = user.password;
    });
  });

  it("log in with Body Button", () => {
    pressBodyLoginButton();

    fillEmailAndPassword(email, password);

    cy.url().should("include", "login");
  });
  it("log in with Lower Button", () => {
    pressLowerLoginButton();

    fillEmailAndPassword(email, password);

    cy.url().should("include", "login");
  });
});
