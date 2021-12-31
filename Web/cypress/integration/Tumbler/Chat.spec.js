import Chat from '../../Page Objects/chat';
import Signup from "../../Page Objects/signup";

const faker = require('faker');

let ChatPOM = new Chat();
let SignupPOM = new Signup();
let email1, password1;
let email2, password2;
 
const blogNameFill = function() {
    const word = faker.lorem.words(faker.random.number({min: 1,max: 1}));

    SignupPOM.blogNameField().clear();

    SignupPOM.blogNameField().type(word);

    SignupPOM.signupButtoninside().click();

    cy.wait(1000);

    ChatPOM.loginCard().then( $cont => {
        if($cont.find('input[data-testid = "register_age"]').length)
        {
            blogNameFill();
        }
    });
}

const newReciver = () => {
    const word = faker.lorem.words(faker.random.number({min: 1,max: 1}));
    ChatPOM.newMessageReciverField().clear();
    ChatPOM.newMessageReciverField().type(word[0]);
    
    ChatPOM.newRecieverContainer().then( ($cont) => {
        if($cont.find(ChatPOM.newRecieverFieldVal()).length)
        {
            ChatPOM.newRecieverField().then(($cov) => {
                const items = $cov.toArray(); 
                return Cypress._.sample(items);
            }).click()
        }
        else
        {
            newReciver();
        }
    } )
}
describe("Chatting (send-only)", () => {

    beforeEach(() => {

        cy.visit("https://beta.cmplr.tech/login");
        cy.fixture('PersonalData').then((user) => {
            email1 = user.email;
            password1 = user.password;
        });
    });

    it("sending messages to new people", () => {
        const Message = faker.lorem.sentence(3, 10);
        ChatPOM.emailField().type(email1);
        ChatPOM.passwordField().type(password1);
        ChatPOM.loginButtoninside().click();

        ChatPOM.chatsButton().click();
        ChatPOM.newMessagesButton().click();

        newReciver();

        //add wait for load if time allows
        ChatPOM.chatHeader().should("exist").and("be.visible");

        ChatPOM.messageField().type(Message);

        cy.wait(1000);
        
        ChatPOM.sendButton().click();

        cy.wait(1000);

        ChatPOM.lastMessage().contains(Message).should("exist").and("be.visible");
        
    });

    /*
    it("sending GIF to someone already in the conversations", () => {
        const word = faker.lorem.words(faker.random.number({min: 1,max: 1}));
        const Message = faker.lorem.sentence(3, 10);
        ChatPOM.emailField().type(email1);
        ChatPOM.passwordField().type(password1);
        ChatPOM.loginButtoninside().click();

        ChatPOM.chatsButton().click();
        ChatPOM.newMessagesButton().click();

        ChatPOM.newMessageReciverField().type(word);
        ChatPOM.newReciversButton();
        ChatPOM.gifButton().click();
        cy.wait(1000)
        ChatPOM.GIF();
        ChatPOM.sendButton().click();
    });
    */
    it("sending messages to someone already in the conversations", () => {
        const Message = faker.lorem.sentence(3, 10);
        ChatPOM.emailField().type(email1);
        ChatPOM.passwordField().type(password1);
        ChatPOM.loginButtoninside().click();

        ChatPOM.chatsButton().click();
        ChatPOM.conversationButton().then(($cov) => {
            const items = $cov.toArray(); 
            return Cypress._.sample(items);
        }).click();

        //add wait for load if time allows
        ChatPOM.chatHeader().should("exist").and("be.visible");

        ChatPOM.messageField().type(Message);

        cy.wait(1000);

        ChatPOM.sendButton().click();

        cy.wait(1000);

        ChatPOM.lastMessage().contains(Message).should("exist").and("be.visible");
    });

    /*
    it("sending GIF to someone already in the conversations", () => {
        const Message = faker.lorem.sentence(3, 10);
        ChatPOM.emailField().type(email1);
        ChatPOM.passwordField().type(password1);
        ChatPOM.loginButtoninside().click();

        ChatPOM.chatsButton().click();
        ChatPOM.conversationButton();
        ChatPOM.gifButton().click();
        cy.wait(1000)
        ChatPOM.GIF();
        ChatPOM.sendButton().click();
    });
    */
});

describe('Sending and recieving checks', () => {
    let Message;
    beforeEach(function () {
        cy.fixture('PersonalData').then((user) => {
            email1 = user.email;
            password1 = user.password;
            email2 = user.email2;
            password2 = user.password2;
        });

        cy.visit("https://beta.cmplr.tech/login");
        /*
        return cy.mailslurp()
            .then(mailslurp => mailslurp.createInbox())
            .then(inbox => {
                // save inbox id and email address to this (make sure you use function and not arrow syntax)
                cy.wrap(inbox.id).as('newInboxId')
                cy.wrap(inbox.emailAddress).as('newEmailAddress')
            })
        */
    });
    it("sending messages", function() {
        Message = faker.lorem.sentence(3, 10);

        

        ChatPOM.emailField().type(email2);

        ChatPOM.passwordField().type(password2);

        ChatPOM.loginButtoninside().click();

        /*
        cy.visit("https://beta.cmplr.tech/login");

        SignupPOM.emailField().type(this.newEmailAddress);

        SignupPOM.passwordField().type("Qwer12334##");

        blogNameFill();

        SignupPOM.ageField().type(20,{ force: true });

        SignupPOM.ageButton().click({ force: true });
        */

        ChatPOM.chatsButton().click();

        ChatPOM.newMessagesButton().click();

        ChatPOM.newMessageReciverField().type("cmplr");

        ChatPOM.newRecieverField().first().click();

        ChatPOM.chatHeader().should("exist").and("be.visible");

        ChatPOM.messageField().type(Message);

        cy.wait(1000);

        ChatPOM.sendButton().click();

        cy.wait(1000);

        ChatPOM.lastMessage().contains(Message).should("exist").and("be.visible");
    });

    it("recieving messages", function() {

        ChatPOM.emailField().type(email1);

        ChatPOM.passwordField().type(password1);

        ChatPOM.loginButtoninside().click();

        ChatPOM.chatsButton().click();
        
        ChatPOM.unseenField().first().click();

        ChatPOM.chatHeader().should("exist").and("be.visible");

        cy.wait(1000);

        ChatPOM.lastMessage().contains(Message).should("exist").and("be.visible");
    });
});