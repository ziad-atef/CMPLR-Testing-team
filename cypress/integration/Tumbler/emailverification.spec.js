import Login from '../../Page Objects/login';
import MailSlurp from '../../Page Objects/mailslurp';
import Verification from "../../Page Objects/verification"

describe('email verification', () => {
    let email, password;
    const verificationSentence = 'All the finest Tumblr users verify their email address. Check your inbox for the message we just sent.';
    const emailVerificationMessages = [
        "Verify your email address",
        "Hello! Just need you to verify that this is your email address. Is this you?",
        "Thanks! Gotta keep the internet safe from spambots and all that."
    ];
    const emailVerificationButtonText = "This is me!";
    const MailSlurpPOM = new MailSlurp();
    const VerificationPOM = new Verification();

    before(function () {
        // // cy.visit('https://www.tumblr.com/register');
        // // cy.log("Wrap inbox before test");
        // // cy.mailslurp()
        // //     .then(mailslurp => mailslurp.createInbox())
        // //     .then(inbox => {
        // //         cy.log(`Inbox id ${inbox.id}`);
        // //         // save inbox id and email address to this (make sure you use function and not arrow syntax)
        // //         cy.wrap(inbox.id).as('inboxId');
        // //         cy.wrap(inbox.emailAddress).as('emailAddress');
        // //         expect(inbox.emailAddress).to.contain("@mailslurp");
        // //     })
        cy.fixture('userLoginData').then((user) => {
            email = user.dumpyEmail;
            password = user.dumpyPassword;
        });
    });

    it('Signup New Email To Be Verified', function () {

        cy.visit('https://www.tumblr.com/register');
        expect(email).to.contain("@mailslurp");

        cy.get('input[placeholder="Email"]').type(email);
        cy.get('input[placeholder="Password"]').type(password);
        cy.get('input[placeholder="Blog name"]').type("ToTestEmailVerification77777");
        cy.get('button[aria-label="Sign up"]').click();

        cy.get('input[placeholder="How old are you?"]').type(22);
        cy.get('button[aria-label="Next"]').click();

        cy.url().should('contain', 'getting_to_know_tumblr');
        cy.get('span.skip-button-container').contains("Skip").should('have.text', 'Skip').click();


        cy.url().should('contain', 'dashboard');

        cy.get('h3.RUFdS').should('exist').contains(verificationSentence);

        cy.mailslurp()
            .then(mailslurp => mailslurp.waitForLatestEmail(password, 30000, false))
            .then(email => {
                // verify we received an email
                assert.isDefined(email);
                expect(email.subject).to.contain(emailVerificationMessages[0]);
            })
    })

    it("Check That Email Is Not Verified", function () {
        cy.visit('https://www.tumblr.com/login');
        cy.login(new Login(), email, password);

        cy.url().should('contain', 'dashboard');

        cy.get('h3.RUFdS').should('exist').contains(verificationSentence);
    });

    it("Verify email", function () {
        cy.mailslurp()
            .then(mailslurp => mailslurp.waitForLatestEmail(password, 30000, false))
            .then(email => {
                // verify we received an email
                assert.isDefined(email);
                expect(email.subject).to.contain(emailVerificationMessages[0]);

                cy.visit(`https://app.mailslurp.com/emails/${email.id}/`, { failOnStatusCode: false });
                cy.contains("Login with Google").click();
                cy.wait(3000)
                cy.visit(`https://app.mailslurp.com/emails/${email.id}/`, { failOnStatusCode: false });

                MailSlurpPOM.VerificationLink().invoke('attr', 'src')
                    .then(link => {
                        cy.visit(link);

                        cy.contains(emailVerificationMessages[1]);
                        cy.contains(emailVerificationMessages[2]);
                        cy.contains(emailVerificationButtonText).click();

                        VerificationPOM.recaptcha().click();

                        cy.wait(10000);
                        VerificationPOM.verificationButton().contains("Verify Email").click();
                    });

            });
    });

    it("check email has been verified", function () {
        cy.visit('https://www.tumblr.com/login');
        cy.login(new Login(), email, password);

        cy.url().should('contain', 'dashboard');

        cy.get('h3.RUFdS').should('not.exist');
    });
});