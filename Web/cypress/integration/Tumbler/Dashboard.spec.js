import Postboard from "../../Page Objects/post";
import Dashboard from "../../Page Objects/dashboard";
import { success } from "../../Utils/Dashboard/pageassertion";
import {
  TextPost,
  QuotePost,
  TextPostAssertions,
  VisitMyBlog,
} from "../../Utils/Dashboard/utils";
const faker = require("faker/locale/en");
const PostboardPOM = new Postboard();
const DashboardPOM = new Dashboard();

describe("Dashboard Posting", () => {
  beforeEach(() => {
    cy.fixture("PersonalData").then((user) => {
      cy.authenticate(user.email, user.password);
      cy.visit("/");
    });
    cy.url().should("include", "dashboard");
    success();
  });
  it("Render Posts", () => {
    cy.wait(2000);
    DashboardPOM.DashboardPosts()
      .children()
      .should("have.length.greaterThan", 1);
  });
  it("Post a text post", () => {
    const Title = faker.lorem.sentence(3, 10);
    const Body = faker.lorem.paragraph(
      faker.random.number({
        min: 3,
        max: 10,
      })
    );
    const Tags = faker.lorem
      .words(
        faker.random.number({
          min: 3,
          max: 10,
        })
      )
      .split(" ");
    TextPost(Title, Body, Tags);

    PostboardPOM.postButton("button.button-area")
      .should("be.enabled")
      .should("have.text", "Post")
      .click();

    VisitMyBlog();

    TextPostAssertions(Title, Body, Tags);
  });

  it("Post A Text Post With Only Body", () => {
    const Body = faker.lorem.paragraph(
      faker.random.number({
        min: 3,
        max: 10,
      })
    );
    TextPost("", Body, []);

    PostboardPOM.postButton("button.button-area")
      .should("be.enabled")
      .should("have.text", "Post")
      .click();

    VisitMyBlog();

    TextPostAssertions("", Body, []);
  });
  it("(Text) Disable Post Button After Clearing", () => {
    const Title = faker.lorem.sentence(3, 10);
    const Body = faker.lorem.paragraph(
      faker.random.number({
        min: 3,
        max: 10,
      })
    );
    const Tags = faker.lorem
      .words(
        faker.random.number({
          min: 3,
          max: 10,
        })
      )
      .split(" ");
    TextPost(Title, Body, Tags);

    PostboardPOM.postTitleDOM().clear();
    PostboardPOM.postBodyDOM().clear();

    PostboardPOM.postButton("button.button-area")
      .should("be.disabled")
      .should("have.text", "Post");
  });
  it("(Text) Only Tags Doesn't Enable Post Button", () => {
    const Tags = faker.lorem
      .words(
        faker.random.number({
          min: 3,
          max: 10,
        })
      )
      .split(" ");
    TextPost("", "", Tags);

    PostboardPOM.postButton("button.button-area")
      .should("be.disabled")
      .should("have.text", "Post");
  });
  it("Post a Quote post", () => {
    const Quote = faker.lorem.sentences(
      faker.random.number({
        min: 1,
        max: 2,
      })
    );
    const Source = faker.name.firstName();
    const Tags = faker.lorem
      .words(
        faker.random.number({
          min: 0,
          max: 10,
        })
      )
      .split(" ");

    QuotePost(Quote, Source, Tags);

    PostboardPOM.postButton("button.button-area").should("be.enabled").click();

    VisitMyBlog();

    // QuotePostAssertions(Quote, Source, Tags);
    TextPostAssertions(Quote, Source, Tags);
  });
  it("(Quote) Disable Post Button After Clearing", () => {
    const Quote = faker.lorem.sentences(
      faker.random.number({
        min: 1,
        max: 2,
      })
    );
    const Source = faker.name.firstName();
    const Tags = faker.lorem
      .words(
        faker.random.number({
          min: 0,
          max: 10,
        })
      )
      .split(" ");

    QuotePost(Quote, Source, Tags);

    PostboardPOM.quoteDOM().clear();
    PostboardPOM.sourceDOM().clear();

    PostboardPOM.postButton("button.button-area")
      .should("be.disabled")
      .should("have.text", "Post");
  });

  it("(Quote) Only Tags Doesn't Enable Post Button", () => {
    const Tags = faker.lorem
      .words(
        faker.random.number({
          min: 3,
          max: 10,
        })
      )
      .split(" ");
    QuotePost("", "", Tags);

    PostboardPOM.postButton("button.button-area")
      .should("be.disabled")
      .should("have.text", "Post");
  });
  it.skip("Post a Photo post", () => {
    DashboardPOM.photoPostButton().click();

    PostboardPOM.postButton("button.button-area.disabled")
      .should("be.disabled")
      .should("have.text", "Post");

    const imageFile = "1.jpg";
    PostboardPOM.photoDOM().attachFile(imageFile);
    cy.wait(3000);

    PostboardPOM.postButton("button.button-area").should("be.enabled").click({
      force: true,
    });

    // NavbarPOM.accountButton().click();
    // NavbarPOM.accountLowerList().eq(0).click();
    VisitMyBlog();

    cy.get("figure").first().find("div").children();
  });
});

describe.skip("Dashboard Rebloging", () => {
  let postIndex = 0,
    owner,
    content = [];
  let contentLength, tags;
  beforeEach(() => {
    cy.fixture("PersonalData").then((user) => {
      cy.authenticate(user.email, user.password);
      cy.visit("/");
    });
    cy.wait(2000);
    cy.url().should("include", "dashboard");
    success();
  });

  it("Render Posts", () => {
    DashboardPOM.DashboardPosts()
      .children()
      .should("have.length.greaterThan", 1);
  });

  it("Reblog a Post", () => {
    DashboardPOM.DashboardPosts()
      .children()
      .should("have.length.greaterThan", 1);

    PostboardPOM.PostContentDom(postIndex).within(($content) => {
      $content.toArray().forEach((element) => {
        content.push(element.innerHTML);
      });
    });
    PostboardPOM.PostTagsDom(postIndex)
      .eq(0)
      .within(($tags) => {
        tags = $tags.text().split("#");
      });
    PostboardPOM.PostOwnerDom(postIndex)
      .within(($postOwner) => {
        owner = $postOwner.text();
      })
      .then(() => {
        PostboardPOM.reblogButtonDom(postIndex).click();

        // PostboardPOM.visitPostIframe(owner);

        PostboardPOM.reblogBodyDom();
        PostboardPOM.reblogTagsDom();
        // PostboardPOM.reblogCloseButtonDom();
        PostboardPOM.reblogReblogButtonDom().click({
          force: true,
        });
      });
  });

  it("Assert That Post Is Reblogged", () => {
    cy.visit("/blog/cmplr");
    cy.wait(2000);

    cy.get("article")
      .children("header")
      .within(($header) => {
        cy.log($header.attr("aria-label"));
        expect($header.attr("aria-label")).to.equal(
          `cmplr reblogged a post from ${owner}`
        );
      });
    cy.get("article")
      .children("div")
      .eq(1)
      .find("div.GzjsW")
      .children()
      .within(($currentContent) => {
        var i = 0;
        $currentContent.toArray().forEach((currentContent) => {
          expect(currentContent.innerHTML).to.equal(content[i++]);
        });
      });
  });
});
