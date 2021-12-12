import Signup from "../../Page Objects/signup";

let SignupPOM;
let email;
let takenEmail = "testEmail@gmail.com";
let takenBlogName = "testBlog";
let password;
let blogName;
let inbox;

const emptyEmailMessage = "Email is required";
const emptyPasswordMessage = "Password must contain at least 8 char";
const emptyBlogNameMessage = "Blog name is required";
const emptyEmailPasswordAndBlogNameMessage = "Email is required";
const takenEmailMessage = "The email has already been taken.";
const invalidEmailMessage = "The email must be a valid email address.";
const invalidPasswordMessage = "Password must contain at least 8 char";
const takenBlogNameMessage = "The blog name has already been taken.";

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

const ageEntry = function (age) {
    SignupPOM.ageField().type(age,{ force: true });
    SignupPOM.ageButton().click({ force: true });

    if(age<16 || age>120){
        ageFail();
    }
    else{
        ageSucess();
    }
}

const failAssertions = (failMessage) =>{

    cy.contains(failMessage);
    cy.url().should("include", "register")
}

const successAssertions = () =>{

    SignupPOM.ageField().should("be.enabled").and("be.visible");
    SignupPOM.ageButton().and("be.visible");

}

const ageFail = () =>{
    cy.contains("Age must be between 16-120");
}

const ageSucess = () =>{

}

describe('Signup', () => {

    beforeEach(() => {
        /*
            first you have to pass the url of the website, or the page you want
            to start your test with, you want to test
        */
        cy.visit('/');

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

    it('signup invalid password', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData(email, "1234", blogName);

        failAssertions(invalidPasswordMessage);
    });

    it('signup taken blog name', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData(email, password, takenBlogName);

        failAssertions(takenBlogNameMessage);
    });

    describe('Signup2', () => {
        before(function () {
            return cy.mailslurp()
                .then(mailslurp => mailslurp.createInbox())
                .then(inbox => {
                    // save inbox id and email address to this (make sure you use function and not arrow syntax)
                    cy.wrap(inbox.id).as('newInboxId')
                    cy.wrap(inbox.emailAddress).as('newEmailAddress')
                })
        });
        it('signup valid info but invalid age', function() {

            SignupPOM.signupButton().click({ force: true });

            fillSignupData(this.newEmailAddress, password, this.newInboxId);

            successAssertions();

            ageEntry(10);

        });

        it('signup valid info and age', function() {

            SignupPOM.signupButton().click({ force: true });

            fillSignupData(this.newEmailAddress, password, this.newInboxId);

            successAssertions();

            ageEntry(18);
        });
    });
});