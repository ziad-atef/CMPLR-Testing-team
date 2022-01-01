import Blogcreation from '../../Page Objects/SecBlogCreation';

const faker = require('faker');
const BlogcreationPOM = new Blogcreation();

let email1,password1;
let createdBlogURL;

const urlFilling = () => {
    const url = faker.lorem.words(faker.random.number({min: 1,max: 1}));
    createdBlogURL = url;
    if (url !== '') {
        BlogcreationPOM.urlField().clear();
        BlogcreationPOM.urlField().type(url);
    }
    BlogcreationPOM.createButton().click();
    cy.wait(1000);
    cy.location().its("href").then( $url => {
        if(String($url) == "https://beta.cmplr.tech/blog/new")
        {
            urlFilling();
        }
    });
};

describe("Secondary blog creation", () => {

    beforeEach(() => {
      /*
              first you have to pass the url of the website, or the page you want
              to start your test with, you want to test
          */
        cy.visit("/login");
        cy.fixture('PersonalData').then((user) => {
            email1 = user.email;
            password1 = user.password;
        });
    });
    it("Creating blog with used url", () => {
        //Login
        BlogcreationPOM.emailField().type(email1);
        BlogcreationPOM.passwordField().type(password1);
        BlogcreationPOM.loginButtoninside().click();
        //get to account menu
        BlogcreationPOM.accountMenu().click();
        //Click new blog button
        BlogcreationPOM.newBlog().click();
        //Typing title
        const Title = faker.lorem.words(faker.random.number({min: 1,max: 5}));
        if (Title !== '') {
            BlogcreationPOM.titleField().type(Title);
        }
        //Typing url and completing test
        urlFilling();
        //get to account menu
        BlogcreationPOM.accountMenu().click();
        //Click new blog button
        BlogcreationPOM.newBlog().click();
        //Typing title
        if (Title !== '') {
            BlogcreationPOM.titleField().type(Title);
        }
        //Typing used url
        BlogcreationPOM.urlField().type(createdBlogURL);
        
        //Creating blog
        BlogcreationPOM.createButton().click();

        //checking the appearence of an error
        BlogcreationPOM.existingUrlError().contains(BlogcreationPOM.existingURLMessage()).should("exist").and("be.visible");
        
    });
    
    it("Creating blog without password", () => {
        //Login
        BlogcreationPOM.emailField().type(email1);
        BlogcreationPOM.passwordField().type(password1);
        BlogcreationPOM.loginButtoninside().click();
        //get to account menu
        BlogcreationPOM.accountMenu().click();
        //Click new blog button
        BlogcreationPOM.newBlog().click();
        //Typing title
        const Title = faker.lorem.words(faker.random.number({min: 1,max: 5}));
        if (Title !== '') {
            BlogcreationPOM.titleField().type(Title);
        }
        //Typing url and completing test
        urlFilling();
    });
    it("Creating blog with password", () => {
        //Login
        BlogcreationPOM.emailField().type(email1);
        BlogcreationPOM.passwordField().type(password1);
        BlogcreationPOM.loginButtoninside().click();
        //get to account menu
        BlogcreationPOM.accountMenu().click();
        //Click new blog button
        BlogcreationPOM.newBlog().click();
        //Typing title
        const Title = faker.lorem.words(faker.random.number({min: 1,max: 5}));
        if (Title !== '') {
            BlogcreationPOM.titleField().type(Title);
        }
        //Password entry
        const Password = faker.lorem.words(faker.random.number({min: 5,max: 8}));
        BlogcreationPOM.blogPasswordField().click();
        BlogcreationPOM.blogPasswordField().type(String(Password));
        //Typing url and completing test
        urlFilling();
    });
  });
  