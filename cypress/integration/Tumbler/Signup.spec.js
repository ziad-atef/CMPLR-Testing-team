import Signup from "../../Page Objects/signup";

let SignupPOM;
let email;
let takenEmail = "sfd@gmail.com"
let password;
let blogName;

const emptyEmailMessage = "You forgot to enter your email!";
const emptyPasswordMessage = "You forgot to enter your password!";
const emptyBlogNameMessage = "You forgot to enter your blog name!";
const emptyEmailPasswordAndBlogNameMessage = "You do have to fill this stuff out, you know.";
const takenEmailMessage = "This email address is already in use.";
const invalidEmailMessage = "That's not a valid email address. Please try again.";

const fillSignupData = (email, password, blogName) => {
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

const ageEntry = (age) =>{
    cy.get('input[name = "age"]').type(age);
    cy.get('button[type = "submit"]').click({ force: true });

    if(age<13){
        ageFail();
    }
    else{
        ageSucess();
    }
}

const failAssertions = (failMessage) =>{

    cy.contains(failMessage);
    cy.url().should("include", "register?source=login_register_center")
}

const successAssertions = () =>{

    cy.contains("Sign up").should("not.exist");
    cy.get('input[name = "age"]').should("be.enabled").and("be.visible");
    cy.get('button[type = "submit"]').should("be.enabled").and("be.visible");
}

const ageFail = () =>{
    cy.contains("Sorry");
    cy.contains("We could not complete your registration at this time");
}

const ageSucess = () =>{

}

describe('Signup', () => {
    beforeEach(() => {
        /*
            first you have to pass the url of the website, or the page you want
            to start your test with, you want to test
        */
        cy.visit('https://www.tumblr.com/');

        /*
            POM refers to Page Object Model so we wrap all the Doms we will
            interact with in our tests into one class at 
            (../../Page Objects/signup) to maintain useability
        */
        SignupPOM = new Signup();


        /*
            Data is all what matters at testing so you can use fixtures to 
            add sample data or even real-time data.
            in this case I need to use my personal email to log in successfully
            so I added my email and password at userLoginData.json to use it
            at "successfully log in" test case but I didn't upload it.
            so in my opinion it would be a good use of fixtures :).
            so if you want to try this on your own add userLoginData.json file 
            at fixtures and add your authenticated email and password.
        */
        cy.fixture('userSignupData').then((user) => {
            email = user.email;
            password = user.password;
            blogName = user.blogName;
        });
    });
    
    it('signup with empty email', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData("", password, blogName);

        failAssertions(emptyEmailMessage);
    });

    it('signup with empty password', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData(email, "", blogName);

        failAssertions(emptyPasswordMessage);
    });

    it('signup with empty blog name', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData(email, password, "");

        failAssertions(emptyBlogNameMessage);
    });

    it('signup with empty email and password', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData("", "", blogName);

        failAssertions(emptyEmailMessage);
    });

    it('signup with empty email and blog name', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData("", password, "");

        failAssertions(emptyEmailMessage);
    });

    it('signup with empty password and blog name', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData(email, "", "");

        failAssertions(emptyPasswordMessage);
    });

    it('signup with empty data', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData("", "", "");

        failAssertions(emptyEmailPasswordAndBlogNameMessage);
    });

    it('signup taken email', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData(takenEmail, password, blogName);

        failAssertions(takenEmailMessage);
    });

    it('signup invalid email', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData("lsdfnfgd.com", password, blogName);

        failAssertions(invalidEmailMessage);
    });

    it('signup valid info but invalid age', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData(email, password, blogName);

        successAssertions();

        ageEntry(10);

    });

    it('signup valid info and age', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData(email, password, blogName);

        successAssertions();

        ageEntry(18);

        cy.get('button[class = "onboarding-skip-button"]').click({ force: true });
    });

});
