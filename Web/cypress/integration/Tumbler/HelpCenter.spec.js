import Login from '../../Page Objects/login';

let LoginPOM;
let helpPageContent;

const fillEmailAndPassword = (passEmail, passPassword) => {
    if (passEmail === '')
        LoginPOM.emailField();
    else
        LoginPOM.emailField().type(passEmail);

    if (passPassword === '')
        LoginPOM.passwordField();
    else
        LoginPOM.passwordField().type(passPassword);

    LoginPOM.loginButtoninside().click();
}

describe('Help center', () => {

    it('Checking static pages', () => {
        /*
        cy.visit('https://www.tumblr.com/');
        
        LoginPOM = new Login();

        cy.fixture('userAuthData').then((user) => {
            email = user.email;
            password = user.password;
        });

        LoginPOM.loginButton().click({force:true});

        fillEmailAndPassword("ziad.yousef00@eng-st.cu.edu.eg","6102000z");
    
        cy.get('button[aria-label = "Account"]').click();
        cy.get('a[href="/help"]').click();
        */
        
        var head;
        cy.visit('/help');

        cy.get('a[class="help-center-container-category-content-link"]').then(($topic) => {
            const items = $topic.toArray(); 
            return Cypress._.sample(items);
        }).click({force: true});
        /*
        cy.get('a[class="help-center-container-category-content-link"]').then(($topic) => {
            const items = $topic.toArray(); 
            return Cypress._.sample(items);
        }).then( $el => {
            head = $el.get(0).innerText
            cy.log(head);
            cy.wrap($el).click({force: true});
            cy.get('h1[title="'+head+'"]').should("exist");
        });
        */
        /*
        first().invoke('text').then((text) => {
            head = text;
            cy.log(head);
            
        });
        cy.log(head);
        */
    });


});