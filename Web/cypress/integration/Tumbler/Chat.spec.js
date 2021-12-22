import Chat from '../../Page Objects/chat';
const faker = require('faker');

let ChatPOM = new Chat();
let email1, password1;
describe("Chatting", () => {

    beforeEach(() => {
      /*
              first you have to pass the url of the website, or the page you want
              to start your test with, you want to test
          */
        cy.visit("https://www.tumblr.com/");
        ChatPOM.appbarLoginButton().click({force:true});
        cy.fixture('PersonalData').then((user) => {
            email1 = user.email;
            password1 = user.password;
        });
    });

    it("sending messages to new people", () => {
        const word = faker.lorem.words(faker.random.number({min: 1,max: 1}));
        const Message = faker.lorem.sentence(3, 10);
        ChatPOM.emailField().type(email1);
        ChatPOM.passwordField().type(password1);
        ChatPOM.loginButtoninside().click();

        ChatPOM.chatsButton().click();
        ChatPOM.newMessagesButton().click();

        ChatPOM.newMessageReciverField().type(word);
        ChatPOM.newReciversButton();

        ChatPOM.messageField().type(Message);
        ChatPOM.sendButton().click();
    });

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

    it("sending messages to someone already in the conversations", () => {
        const Message = faker.lorem.sentence(3, 10);
        ChatPOM.emailField().type(email1);
        ChatPOM.passwordField().type(password1);
        ChatPOM.loginButtoninside().click();

        ChatPOM.chatsButton().click();
        ChatPOM.conversationButton();
        ChatPOM.messageField().type(Message);
        ChatPOM.sendButton().click();
    });

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
  });