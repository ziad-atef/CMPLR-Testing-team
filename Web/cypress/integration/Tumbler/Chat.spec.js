import Chat from '../../Page Objects/chat';
import Signup from "../../Page Objects/signup";

const faker = require('faker');


let ChatPOM = new Chat();
let SignupPOM = new Signup();
let email1, password1;

const fillSignupData = function(email, password, blogName) {
    if (email === '')
        SignupPOM.emailField();
    else
        SignupPOM.emailField().type(email);

    if (password === '')
        SignupPOM.passwordField();
    else
        SignupPOM.passwordField().type(password);

    if (blogName === '')
        SignupPOM.blogNameField();
    else
        SignupPOM.blogNameField().type(blogName);

    SignupPOM.signupButtoninside().click();
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
    before(function () {
        cy.fixture('PersonalData').then((user) => {
            email1 = user.email;
            password1 = user.password;
        });
        return cy.mailslurp()
            .then(mailslurp => mailslurp.createInbox())
            .then(inbox => {
                // save inbox id and email address to this (make sure you use function and not arrow syntax)
                cy.wrap(inbox.id).as('newInboxId')
                cy.wrap(inbox.emailAddress).as('newEmailAddress')
            })
    });
    it.only("sending messages", function() {
        const word = faker.lorem.words(faker.random.number({min: 1,max: 1}));
        Message = faker.lorem.sentence(3, 10);

        cy.visit("https://beta.cmplr.tech/register");

        fillSignupData(this.newEmailAddress, "Qwer12334##", word);

        SignupPOM.ageField().type(20,{ force: true });

        SignupPOM.ageButton().click({ force: true });

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

    it.only("recieving messages", function() {

        cy.visit("https://beta.cmplr.tech/login");

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