import Postboard from "../../Page Objects/post";
import Dashboard from "../../Page Objects/dashboard";
import Navbar from "../../Page Objects/Navbar";
const PostboardPOM = new Postboard();
const DashboardPOM = new Dashboard();
const NavbarPOM = new Navbar();

module.exports.TextPost = (Title = "", Body = "", Tags = []) => {
  DashboardPOM.textPostButton().click();

  PostboardPOM.postButton().should("be.disabled").should("have.text", "Post");
  if (Title !== "") {
    PostboardPOM.postTitleDOM().type(Title);
    PostboardPOM.postTitleDOM().should("have.text", Title);
  }

  if (Body !== "") {
    PostboardPOM.postBodyDOM().type(Body);
    PostboardPOM.postBodyDOM().should("have.text", Body);
  }

  for (let i = 0; i < Tags.length; i++) {
    PostboardPOM.postTagsDOM().type(`${Tags[i]} {enter}`);
  }
};

module.exports.QuotePost = (Quote = "", Source = "", Tags = []) => {
  DashboardPOM.quotePostButton().click();

  PostboardPOM.postButton().should("be.disabled").should("have.text", "Post");

  if (Quote !== "") {
    PostboardPOM.quoteDOM().type(Quote);
    PostboardPOM.quoteDOM().should("have.text", Quote);
  }

  if (Source !== "") {
    PostboardPOM.sourceDOM().type(Source);
    PostboardPOM.sourceDOM().should("have.text", Source);
  }

  for (let i = 0; i < Tags.length; i++) {
    PostboardPOM.postTagsDOM().type(`${Tags[i]} {enter}`);
  }
};

module.exports.TextPostAssertions = (Title = "", Body = "", Tags = []) => {
  if (Title !== "") cy.contains(Title);
  cy.contains(Body);
  for (let i = 0; i < Tags.length; i++) {
    cy.contains(Tags[i]);
  }

  cy.get("span.text-title-content").eq(0).should("have.text", Title);
  cy.get("span.body-content").eq(0).should("have.text", Body);
  for (let i = 0; i < Tags.length; i++) {
    cy.get("article").children("div").eq(2).find("a").contains(Tags[i]);
  }
};

module.exports.QuotePostAssertions = (Quote = "", Source = "", Tags = []) => {
  cy.contains(Quote);
  cy.contains(Source);
  for (let i = 0; i < Tags.length; i++) {
    cy.contains(Tags[i]);
  }

  cy.get("article")
    .children("div")
    .eq(1)
    .find("span")
    .should("have.text", Quote);
  cy.get("article").children("div").eq(1).find("p").should("have.text", Source);
  for (let i = 0; i < Tags.length; i++) {
    cy.get("article").children("div").eq(2).find("a").contains(Tags[i]);
  }
};

module.exports.VisitMyBlog = (blogName = "cmplr") => {
  cy.wait(3000);
  cy.visit(`/blog/${blogName}`);
};
