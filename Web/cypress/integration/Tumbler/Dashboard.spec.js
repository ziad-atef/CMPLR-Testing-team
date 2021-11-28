import Login from '../../Page Objects/login';
import Postboard from '../../Page Objects/post';
import Dashboard from '../../Page Objects/dashboard';

describe("Dashboard", () => {
    var postsList;
    let PostboardPOM;
    let DashboardPOM;
    beforeEach(() => {
        cy.visit("https://www.tumblr.com/dashboard");

        cy.fixture('PersonalData').then((user) => {
            cy.login(new Login(), user.email, user.password);
        });

        cy.fixture('posts').then((posts) => {
            postsList = posts;
        });

        PostboardPOM = new Postboard();
        DashboardPOM = new Dashboard();
    });

    it("Post a text post", () => {
        let post = postsList.testpost1;     // first thing I do I grab text post stored in sample data
        DashboardPOM.textPostButton().click();      // then click on Text "Text" at the dashboard to post a text

        // not sure of this yet but dealing with iframes is a headache to me 
        // and this help to make it work because the iframe refers to another url
        cy.visit("https://www.tumblr.com/new/text");

        // here I assure that the post button is disabled as the post is still empty
        // then I fill the post data from the arbitrary data then press post
        PostboardPOM.postButton("button.button-area.disabled").should('be.disabled').should("have.text", "Post");
        // ^___ this is a bad practice to send the selector as a string to the function
        PostboardPOM.postTitleDOM().type(post.title);
        PostboardPOM.postBodyDOM().type(post.textcontent);
        PostboardPOM.postTagsDOM().type(`${post.tags[0]} {enter}`);
        PostboardPOM.postTagsDOM().type(`${post.tags[1]} {enter}`);

        PostboardPOM.postButton('button.button-area').should('be.enabled').should("have.text", "Post").click();

        // redirection to the dashboard then open posts page
        cy.visit("https://www.tumblr.com/dashboard");
        DashboardPOM.accountButton().click();
        DashboardPOM.accountLowerList().eq(0).click();      // this should be "posts" at the account menue

        // assure that tha post content are displayed at the screen 
        cy.contains(post.title);
        cy.contains(post.textcontent);
        cy.contains(post.tags[0]);
        cy.contains(post.tags[1]);

        // it's a better practice that I check the data content at the post itself, the first post on the page  .
        cy.get('article').children('div').eq(1).find('h1').should('have.text', post.title);
        cy.get('article').children('div').eq(1).find('p').should('have.text', post.textcontent);
    });

    it("Post a Quote post", () => {
        let post = postsList.quotepost1;
        DashboardPOM.quotePostButton().click();
        cy.visit("https://www.tumblr.com/new/quote");

        PostboardPOM.postButton("button.button-area.disabled").should('be.disabled').should("have.text", "Post");
        PostboardPOM.quoteDOM().type(post.quote);
        PostboardPOM.sourceDOM().type(post.source);
        PostboardPOM.postTagsDOM().type(`${post.tags[0]} {enter}`);
        PostboardPOM.postTagsDOM().type(`${post.tags[1]} {enter}`);

        PostboardPOM.postButton('button.button-area').should('be.enabled').click();


        cy.visit("https://www.tumblr.com/dashboard");
        DashboardPOM.accountButton().click();
        DashboardPOM.accountLowerList().eq(0).click();

        cy.contains(post.quote);
        cy.contains(post.source);
        cy.contains(post.tags[0]);
        cy.contains(post.tags[1]);


        cy.get('article').children('div').eq(1).find('span').should('have.text', post.quote);
        cy.get('article').children('div').eq(1).find('p').should('have.text', post.source);
    });

    it("Post a Photo post", () => {
        DashboardPOM.photoPostButton().click();
        cy.visit("https://www.tumblr.com/new/photo");

        PostboardPOM.postButton("button.button-area.disabled").should('be.disabled').should("have.text", "Post");

        const imageFile = "2.jpg";
        PostboardPOM.photoDOM().attachFile(imageFile);
        cy.wait(300);

        PostboardPOM.postButton('button.button-area').should('be.enabled').click({ force: true });

        DashboardPOM.accountButton().click();
        DashboardPOM.accountLowerList().eq(0).click();

        cy.get('figure').first().find('div').children();
    });
});

describe('logged', () => {
    var postsList;
    let PostboardPOM;
    let DashboardPOM;
    let Accesstoken;
    beforeEach(() => {
        cy.fixture('userLoginData').then((user) => {
            Accesstoken = user.token;
            cy.setCookie('sid', `${Accesstoken}`);
        });
        cy.visit("https://www.tumblr.com/dashboard");

        // cy.fixture('userLoginData').then((user) => {
        //     cy.login(new Login(), user.email, user.password);
        // });

        cy.fixture('posts').then((posts) => {
            postsList = posts;
        });

        PostboardPOM = new Postboard();
        DashboardPOM = new Dashboard();
    });

    it("Post a text post", () => {
        let post = postsList.testpost1;     // first thing I do I grab text post stored in sample data
        DashboardPOM.textPostButton().click();      // then click on Text "Text" at the dashboard to post a text

        // not sure of this yet but dealing with iframes is a headache to me 
        // and this help to make it work because the iframe refers to another url
        cy.visit("https://www.tumblr.com/new/text");

        // here I assure that the post button is disabled as the post is still empty
        // then I fill the post data from the arbitrary data then press post
        PostboardPOM.postButton("button.button-area.disabled").should('be.disabled').should("have.text", "Post");
        // ^___ this is a bad practice to send the selector as a string to the function
        PostboardPOM.postTitleDOM().type(post.title);
        PostboardPOM.postBodyDOM().type(post.textcontent);
        PostboardPOM.postTagsDOM().type(`${post.tags[0]} {enter}`);
        PostboardPOM.postTagsDOM().type(`${post.tags[1]} {enter}`);

        PostboardPOM.postButton('button.button-area').should('be.enabled').should("have.text", "Post").click();

        // redirection to the dashboard then open posts page
        cy.visit("https://www.tumblr.com/dashboard");
        DashboardPOM.accountButton().click();
        DashboardPOM.accountLowerList().eq(0).click();      // this should be "posts" at the account menue

        // assure that tha post content are displayed at the screen 
        cy.contains(post.title);
        cy.contains(post.textcontent);
        cy.contains(post.tags[0]);
        cy.contains(post.tags[1]);

        // it's a better practice that I check the data content at the post itself, the first post on the page  .
        cy.get('article').children('div').eq(1).find('h1').should('have.text', post.title);
        cy.get('article').children('div').eq(1).find('p').should('have.text', post.textcontent);
    });

    it("Post a Quote post", () => {
        let post = postsList.quotepost1;
        DashboardPOM.quotePostButton().click();
        cy.visit("https://www.tumblr.com/new/quote");

        PostboardPOM.postButton("button.button-area.disabled").should('be.disabled').should("have.text", "Post");
        PostboardPOM.quoteDOM().type(post.quote);
        PostboardPOM.sourceDOM().type(post.source);
        PostboardPOM.postTagsDOM().type(`${post.tags[0]} {enter}`);
        PostboardPOM.postTagsDOM().type(`${post.tags[1]} {enter}`);

        PostboardPOM.postButton('button.button-area').should('be.enabled').click();


        cy.visit("https://www.tumblr.com/dashboard");
        DashboardPOM.accountButton().click();
        DashboardPOM.accountLowerList().eq(0).click();

        cy.contains(post.quote);
        cy.contains(post.source);
        cy.contains(post.tags[0]);
        cy.contains(post.tags[1]);


        cy.get('article').children('div').eq(1).find('span').should('have.text', post.quote);
        cy.get('article').children('div').eq(1).find('p').should('have.text', post.source);
    });

    it("Post a Photo post", () => {
        DashboardPOM.photoPostButton().click();
        cy.visit("https://www.tumblr.com/new/photo");

        PostboardPOM.postButton("button.button-area.disabled").should('be.disabled').should("have.text", "Post");

        const imageFile = "2.jpg";
        PostboardPOM.photoDOM().attachFile(imageFile);
        cy.wait(300);

        PostboardPOM.postButton('button.button-area').should('be.enabled').click({ force: true });

        DashboardPOM.accountButton().click();
        DashboardPOM.accountLowerList().eq(0).click();

        cy.get('figure').first().find('div').children();
    });

    // it("Post a Video post", () => {
    //     DashboardPOM.photoPostButton().click();
    //     cy.visit("https://www.tumblr.com/new/video");

    //     PostboardPOM.postButton("button.button-area.disabled").should('be.disabled').should("have.text", "Post");

    //     const imageFile = "1.mp4";
    //     PostboardPOM.photoDOM().attachFile(imageFile);
    //     // cy.wait(30000);
    //     PostboardPOM.postButton("button.button-area.disabled").should('be.disabled').should("have.text", "Post");
    //     PostboardPOM.videoSwitchDOM().click({ force: true });

    //     PostboardPOM.postButton('button.button-area').should('be.enabled').click({ force: true });

    //     DashboardPOM.accountButton().click();
    //     DashboardPOM.accountLowerList().eq(0).click();

    //     cy.get('div[aria-label="Video Player"]').first().find('div').children();
    // });


});