import BlogBlocking from '../../Page Objects/blogblockingactions';
const faker = require('faker');

let BlogBlockPOM = new BlogBlocking();
let email1, password1;

describe("Blog Block", () => {
    beforeEach(() => {
        cy.visit("https://beta.cmplr.tech/login");
        cy.fixture('PersonalData').then((user) => {
            email1 = user.email;
            password1 = user.password;
        });
    });

    it("Block a blog", () => {
        //loging in
        BlogBlockPOM.emailField().type(email1);
        BlogBlockPOM.passwordField().type(password1);
        BlogBlockPOM.loginButtoninside().click();
        BlogBlockPOM.checkOutBlog().should('be.visible');
        //get to the blog
        const word = faker.lorem.words(faker.random.number({min: 1,max: 1}));
        BlogBlockPOM.searchField().type(word[0]);
        cy.wait(2000);
        BlogBlockPOM.searchResult().then(($res) => {
            const items = $res.toArray(); 
            return Cypress._.sample(items);
        }).click();
        cy.wait(2000);
        BlogBlockPOM.avatar().click({force: true});
        BlogBlockPOM.block().click({force: true});
    });
    it("Unblock a blog", () => {
        //loging in
        BlogBlockPOM.emailField().type(email1);
        BlogBlockPOM.passwordField().type(password1);
        BlogBlockPOM.loginButtoninside().click();
        BlogBlockPOM.checkOutBlog().should('be.visible');
        BlogBlockPOM.avatar().click();
        BlogBlockPOM.settings().click();
        BlogBlockPOM.avatar().click();
    });
  });