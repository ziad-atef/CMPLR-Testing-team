class Chat {
    emailField() {
        // return cy.get('input.o4KIk[name="email"]');
        return cy.get('input[name="email"]');

    }
    passwordField() {
        // return cy.get('input.o4KIk[name="password"]');
        return cy.get('input[name="password"]');
    }
    loginButtoninside() {
        return cy.get('button[data-testid="login"]');
        //return cy.get('a[data-testid="login"]');
    }
    chatsButton() {
        if(Cypress.config("viewportWidth") > 950)
        {
            return cy.get('li[class="link-icon message "]');
        }
        else
        {
            return cy.get('class="navbar-menu-mobile-menu-item"]');
        }
    }
    newMessagesButton() {
        return cy.get('button').contains("new message");
    }
    newMessageReciverField() {
        return cy.get('input[name="search"]');
    }
    newRecieverContainer() {
        return cy.get('div[class="popup-newmessage"]');
    }
    newRecieverFieldVal() {
        return 'div[class="popup-messages-message"]';
    } 
    newRecieverField() {
        return cy.get('div[class="popup-messages-message"]');
    }
    conversationButton() {
        return cy.get('div[class="popup-messages-message "]');
    }
    chatHeader() {
        return cy.get('div[class="chat-popup-chat-header"] div[class="img"]')
    }
    messageField() {
        return cy.get('textarea[placeholder="Say your thing"]');
    }
    sendButton() {
        return cy.get('i[class="far fa-paper-plane"]');
    }
    lastMessage() {
        return cy.get('div[class="msg"]');
    }
    unseenField() {
        return cy.get('div[class="popup-messages-message notSeen"]');
    }
    gifButton() {
        return cy.get('button.TRX6J.PbfxP[aria-label="Gif Search"]');
    }
    GIF() {
        //return cy.get('button.TRX6J._vFtf[aria-label="Conversation"]');
        cy.get('img.nLowv.t5G6U[loading="lazy"]').then(($cov) => {
            const items = $cov.toArray(); 
            return Cypress._.sample(items);
        }).click()
    }
    loginCard() {
        return cy.get('div[class="LoginCard"]');
    }
    ageField() {
        return 'input[data-testid = "register_age"]';
    }
}
export default Chat;