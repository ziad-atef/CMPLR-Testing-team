import BlogBlocking from '../../Page Objects/blogblockingactions';
const faker = require('faker');

let BlogBlockPOM = new BlogBlocking();
let email1, password1;
let blockedURL;
describe("Blog Block", () => {
    beforeEach(() => {

        /*
            first you have to pass the url of the website, or the page you want
            to start your test with, you want to test
        */
        cy.visit("https://www.tumblr.com/login");
        cy.fixture('PersonalData').then((user) => {
            email1 = user.email;
            password1 = user.password;
        });
    });
    it("test1", () => {
        //loging in
        BlogBlockPOM.emailField().type(email1);
        BlogBlockPOM.passwordField().type(password1);
        BlogBlockPOM.loginButtoninside().click();
        BlogBlockPOM.checkOutBlog().should('be.visible');
        //get to the blog
        const word = faker.lorem.words(faker.random.number({min: 1,max: 1}));
        BlogBlockPOM.searchField().type(word);
        BlogBlockPOM.searchResult().click();
        cy.get('button.SaLOl[aria-label="Close"]').should('be.visible');
        //get more options menu
        cy.wait(3000);
        BlogBlockPOM.moreOptions().click({force:true});
        /*
        BlogBlockPOM.searchField().type(word);
        BlogBlockPOM.searchResult().click();
        cy.wait(3000);
        BlogBlockPOM.moreOptions().click();
        */
    });
  });