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

        cy.visit('https://tumblr.zendesk.com/hc/en-us#');

        cy.get('a[class="article-list-link"]').each( ($el)=>{
            cy.wrap($el).click();
            cy.contains(helpPageContent).should("be.visible");
        });
    });


});