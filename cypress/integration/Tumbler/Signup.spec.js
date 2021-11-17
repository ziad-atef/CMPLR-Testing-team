import Signup from "../../Page Objects/signup";

let SignupPOM;
let email;
let password;
let blogName;

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
    
    it('signup with correct email', () => {

        SignupPOM.signupButton().click({ force: true });

        fillSignupData("zxcvasd@gmail.com", password, blogName);

    });


});
