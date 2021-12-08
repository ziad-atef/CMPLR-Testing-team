import Postboard from '../../Page Objects/post';
import Dashboard from '../../Page Objects/dashboard';
import {
    success
} from '../../Utils/Dashboard/pageassertion';
import {
    TextPost,
    QuotePost,
    TextPostAssertions,
    QuotePostAssertions,
    VisitMyBlog
} from '../../Utils/Dashboard/utils';
const faker = require('faker');
const PostboardPOM = new Postboard();
const DashboardPOM = new Dashboard();


describe("Dashboard", () => {
    let postsList;
    beforeEach(() => {
        cy.authorize();

        cy.visit("https://www.tumblr.com/dashboard");
        success();

        cy.fixture('posts').then((posts) => {
            postsList = posts;
        });
    });
    it("Post a text post", () => {
        const Title = faker.lorem.sentence(3, 10);
        const Body = faker.lorem.paragraph(faker.random.number({
            min: 3,
            max: 10
        }));
        const Tags = faker.lorem.words(faker.random.number({
            min: 3,
            max: 10
        })).split(' ');
        TextPost(Title, Body, Tags);

        PostboardPOM.postButton('button.button-area').should('be.enabled').should("have.text", "Post").click();

        VisitMyBlog();

        TextPostAssertions(Title, Body, Tags);
    });
    it("(Text) Disable Post Button After Clearing", () => {
        const Title = faker.lorem.sentence(3, 10);
        const Body = faker.lorem.paragraph(faker.random.number({
            min: 3,
            max: 10
        }));
        const Tags = faker.lorem.words(faker.random.number({
            min: 3,
            max: 10
        })).split(' ');
        TextPost(Title, Body, Tags);


        PostboardPOM.postTitleDOM().clear();
        PostboardPOM.postBodyDOM().clear();

        PostboardPOM.postButton('button.button-area').should('be.disabled').should("have.text", "Post");
    });

    it("(Text) Only Tags Doesn't Enable Post Button", () => {
        const Tags = faker.lorem.words(faker.random.number({
            min: 3,
            max: 10
        })).split(' ');
        TextPost('', '', Tags);

        PostboardPOM.postButton('button.button-area').should('be.disabled').should("have.text", "Post");
    });

    it("Post a Quote post", () => {
        const Quote = faker.lorem.sentences(faker.random.number({
            min: 1,
            max: 2
        }));
        const Source = faker.name.firstName();
        const Tags = faker.lorem.words(faker.random.number({
            min: 0,
            max: 10
        })).split(' ');

        QuotePost(Quote, Source, Tags);



        PostboardPOM.postButton('button.button-area').should('be.enabled').click();

        VisitMyBlog();

        QuotePostAssertions(Quote, Source, Tags);
    });
    
    it("(Quote) Disable Post Button After Clearing", () => {
        const Quote = faker.lorem.sentences(faker.random.number({
            min: 1,
            max: 2
        }));
        const Source = faker.name.firstName();
        const Tags = faker.lorem.words(faker.random.number({
            min: 0,
            max: 10
        })).split(' ');

        QuotePost(Quote, Source, Tags);

        PostboardPOM.quoteDOM().clear();
        PostboardPOM.sourceDOM().clear();

        PostboardPOM.postButton('button.button-area').should('be.disabled').should("have.text", "Post");
    });

    it("(Quote) Only Tags Doesn't Enable Post Button", () => {
        const Tags = faker.lorem.words(faker.random.number({
            min: 3,
            max: 10
        })).split(' ');
        QuotePost('', '', Tags);

        PostboardPOM.postButton('button.button-area').should('be.disabled').should("have.text", "Post");
    });

    it("Post a Photo post", () => {
        DashboardPOM.photoPostButton().click();
        cy.visit("https://www.tumblr.com/new/photo");

        PostboardPOM.postButton("button.button-area.disabled").should('be.disabled').should("have.text", "Post");

        const imageFile = "2.jpg";
        PostboardPOM.photoDOM().attachFile(imageFile);
        cy.wait(300);

        PostboardPOM.postButton('button.button-area').should('be.enabled').click({
            force: true
        });

        DashboardPOM.accountButton().click();
        DashboardPOM.accountLowerList().eq(0).click();

        cy.get('figure').first().find('div').children();
    });
});