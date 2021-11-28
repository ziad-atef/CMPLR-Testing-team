/*
need to add tests at set new password screen:
1- test the password constraints
2- test if the password in the new password field is not the same in the confirmation field
*/


import Login from '../../Page Objects/login';
import ResetPassword from '../../Page Objects/resetpassword';
import MailSlurp from '../../Page Objects/mailslurp';
import { success } from '../../Utils/log in/pageassertion'
const openResetPasswordScreen = (LoginPOM, ResetPasswordPOM) => {
    cy.visit("https://www.tumblr.com/login");

    LoginPOM.resetPassword().click();
    ResetPasswordPOM.recaptchaChecker().invoke('attr', 'aria-checked').then(isChecked => {
        expect(isChecked).eq("false");
    });
    ResetPasswordPOM.emailField()
    ResetPasswordPOM.cancelButton();
    ResetPasswordPOM.resetButton();
}
const InteractWithResetPasswordScreen = (ResetPasswordPOM, email) => {
    if (email === '')
        ResetPasswordPOM.emailField();
    else
        ResetPasswordPOM.emailField().type(email);

    ResetPasswordPOM.cancelButton();
    ResetPasswordPOM.resetButton().click();
}
var resetPasswordLink;
describe("reset password", () => {
    let emailAddress, password, newPassword, weakNewPassword;
    let LoginPOM, ResetPasswordPOM, MailSlurpPOM;
    let sentenceChecker = [
        "We've sent you an email with instructions to reset your password.",
        "Please make sure it didn't wind up in your Junk Mail.",
        "If you aren't receiving our password reset emails, see our "
    ]
    const emailVerificationMessages = [
        "Tumblr Password",
        "Forgot your password?",
        "Reset it below:"
    ];
    const linkExtractStart = 'href="https://mx.tumblr', linkExtractEnd = '">Reset password</a>';
    const linkExtractIndex = 6;
    const resetWithSamePasswordText = "Sorry, you've used that password before. You must choose a new password.";
    const loginFailMessage = "Your email or password were incorrect."
    const weakNewPasswordErrorMessage = "The password must be at least 8 characters."
    const notMatchingErrorMessage = "The new passwords do not match."

    before(function () {
        cy.fixture('PersonalData').then((user) => {
            emailAddress = user.dumpyEmail;
            password = user.dumpyPassword;
            newPassword = user.dumpyPasswordNew;
            weakNewPassword = user.dumpyWeakPasswordNew1;
        });
        LoginPOM = new Login();
        ResetPasswordPOM = new ResetPassword();
        MailSlurpPOM = new MailSlurp();
    });

    it("Log In With Old Password", () => {
        cy.visit("https://www.tumblr.com/login");
        cy.login(LoginPOM, emailAddress, password);
    });

    it("Send Reset Password Email", () => {
        openResetPasswordScreen(LoginPOM, ResetPasswordPOM);

        cy.wait(10000);
        ResetPasswordPOM.recaptchaChecker().invoke('attr', 'aria-checked').then(isChecked => {
            expect(isChecked).eq("true");
        });

        InteractWithResetPasswordScreen(ResetPasswordPOM, emailAddress)

        cy.url().should('include', 'forgot_password');
        cy.contains(sentenceChecker[0]);
        cy.contains(sentenceChecker[1]);
        cy.contains(sentenceChecker[2]);
        ResetPasswordPOM.doneButton()
            .should("exist").click();

        cy.url().should('eq', "https://www.tumblr.com/");
    });

    it("Click Reset Button With No Email", () => {
        openResetPasswordScreen(LoginPOM, ResetPasswordPOM);

        InteractWithResetPasswordScreen(ResetPasswordPOM, '');

        cy.contains("Please enter your email address.")

        cy.url().should('include', 'forgot_password');
        ResetPasswordPOM.doneButton()
            .should('not.exist');

        cy.url().should('not.eq', "https://www.tumblr.com/");
    });

    context("Reset With New Password", function () {
        it("Check Reset Password Email", function () {
            cy.mailslurp()
                .then(mailslurp => mailslurp.waitForLatestEmail(password, 30000, false))
                .then(email => {
                    // verify we received an email
                    assert.isDefined(email);
                    expect(email.subject).to.contain(emailVerificationMessages[0]);

                    resetPasswordLink = email.body.substring(
                        email.body.indexOf(linkExtractStart), email.body.indexOf(linkExtractEnd))
                        .substr(linkExtractIndex);
                });
        });

        it("Reset Password With Same Old Password", () => {
            cy.visit(resetPasswordLink);
            cy.url().should('include', 'reset_password');

            ResetPasswordPOM.emailFromEmailField(emailAddress)
                .should('have.value', emailAddress);
            ResetPasswordPOM.newPasswordFromEmailField().type(password);
            ResetPasswordPOM.confirmNewPasswordFromEmailField().type(password);
            ResetPasswordPOM.setNewPasswordButton().click();
            cy.url().should('include', 'reset_password');
            cy.contains("Sorry, you've used that password before. You must choose a new password.");
        });

        it("Reset Password With Weak New Password", () => {
            cy.visit(resetPasswordLink);
            cy.url().should('include', 'reset_password');

            ResetPasswordPOM.emailFromEmailField(emailAddress)
                .should('have.value', emailAddress);
            ResetPasswordPOM.newPasswordFromEmailField().type(weakNewPassword);
            ResetPasswordPOM.confirmNewPasswordFromEmailField().type(weakNewPassword);
            ResetPasswordPOM.setNewPasswordButton().click();
            cy.url().should('include', 'reset_password');
            ResetPasswordPOM.setNewPasswordErrorParagraph()
                .should('have.text', weakNewPasswordErrorMessage);
        });

        it("Reset Password With Weak New Password", () => {
            cy.visit(resetPasswordLink);
            cy.url().should('include', 'reset_password');

            ResetPasswordPOM.emailFromEmailField(emailAddress)
                .should('have.value', emailAddress);
            ResetPasswordPOM.newPasswordFromEmailField().type(weakNewPassword);
            ResetPasswordPOM.confirmNewPasswordFromEmailField().type(weakNewPassword);
            ResetPasswordPOM.setNewPasswordButton().click();
            cy.url().should('include', 'reset_password');
            ResetPasswordPOM.setNewPasswordErrorParagraph()
                .should('have.text', weakNewPasswordErrorMessage);
        });

        it("Reset Password Doesn't Match Confirmation", () => {
            cy.visit(resetPasswordLink);
            cy.url().should('include', 'reset_password');

            ResetPasswordPOM.emailFromEmailField(emailAddress)
                .should('have.value', emailAddress);
            ResetPasswordPOM.newPasswordFromEmailField().type(newPassword);
            ResetPasswordPOM.confirmNewPasswordFromEmailField().type(password);
            ResetPasswordPOM.setNewPasswordButton().click();
            cy.url().should('include', 'reset_password');
            ResetPasswordPOM.setNewPasswordErrorParagraph()
                .should('have.text', notMatchingErrorMessage);
        });

        it("Reset Password With New Password", () => {
            cy.visit(resetPasswordLink);
            cy.url().should('include', 'reset_password');

            ResetPasswordPOM.emailFromEmailField(emailAddress)
                .should('have.value', emailAddress);
            ResetPasswordPOM.newPasswordFromEmailField().type(newPassword);
            ResetPasswordPOM.confirmNewPasswordFromEmailField().type(newPassword);
            ResetPasswordPOM.setNewPasswordButton().click();
            cy.url().should('not.include', 'reset_password');
            cy.url().should('include', 'dashboard');

            success();
        });

        it("Log In With Old Password Again", () => {
            cy.visit("https://www.tumblr.com/login");
            cy.login(LoginPOM, emailAddress, password, false, loginFailMessage);
        });

        it("Log In With New Password Again", () => {
            cy.visit("https://www.tumblr.com/login");
            cy.login(LoginPOM, emailAddress, newPassword);
        });
    });


    context("Reset With Old Password", function () {
        it("Send Reset Password Email", () => {
            openResetPasswordScreen(LoginPOM, ResetPasswordPOM);
    
            cy.wait(10000);
            ResetPasswordPOM.recaptchaChecker().invoke('attr', 'aria-checked').then(isChecked => {
                expect(isChecked).eq("true");
            });
    
            InteractWithResetPasswordScreen(ResetPasswordPOM, emailAddress)
    
            cy.url().should('include', 'forgot_password');
            cy.contains(sentenceChecker[0]);
            cy.contains(sentenceChecker[1]);
            cy.contains(sentenceChecker[2]);
            ResetPasswordPOM.doneButton()
                .should("exist").click();
    
            cy.url().should('eq', "https://www.tumblr.com/");
        });

        it("Check Reset Password Email", function () {
            cy.mailslurp()
                .then(mailslurp => mailslurp.waitForLatestEmail(password, 30000, false))
                .then(email => {
                    // verify we received an email
                    assert.isDefined(email);
                    expect(email.subject).to.contain(emailVerificationMessages[0]);

                    resetPasswordLink = email.body.substring(
                        email.body.indexOf(linkExtractStart), email.body.indexOf(linkExtractEnd))
                        .substr(linkExtractIndex);
                });
        });

        it("Reset Password With Old Password", () => {
            cy.visit(resetPasswordLink);
            cy.url().should('include', 'reset_password');

            ResetPasswordPOM.emailFromEmailField(emailAddress)
                .should('have.value', emailAddress);
            ResetPasswordPOM.newPasswordFromEmailField().type(password);
            ResetPasswordPOM.confirmNewPasswordFromEmailField().type(password);
            ResetPasswordPOM.setNewPasswordButton().click();
            cy.url().should('not.include', 'reset_password');
            cy.url().should('include', 'dashboard');

            success();
        });

        it("Log In With Old Password Again", () => {
            cy.visit("https://www.tumblr.com/login");
            cy.login(LoginPOM, emailAddress, password);
        });

        it("Log In With New Password Again", () => {
            cy.visit("https://www.tumblr.com/login");
            cy.login(LoginPOM, emailAddress, newPassword, false, loginFailMessage);
        });
    });
});