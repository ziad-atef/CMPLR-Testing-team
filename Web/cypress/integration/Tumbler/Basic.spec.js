import Dashboard from "../../Page Objects/dashboard";
import Navbar from "../../Page Objects/Navbar";
import Profile from "../../Page Objects/Profile";
import { VisitMyBlog } from "../../Utils/Dashboard/utils";
const DashboardPOM = new Dashboard();
const NavbarPOM = new Navbar();
const ProfilePOM = new Profile();

describe("Basic", () => {
  it("Log Out", () => {
    cy.fixture("PersonalData").then((user) => {
      cy.authenticate(user.email, user.password);
      cy.visit("/");
    });
    NavbarPOM.accountButton().click();
    NavbarPOM.LogoutButton().eq(0).click();
    cy.get('button.AuthBtn[title="OK"]').click();
    cy.url().should("equal", "https://beta.cmplr.tech/");
  });
  // it.only("Like A Post", () => {
  //   cy.fixture("PersonalData").then((user) => {
  //     cy.authenticate(user.email, user.password);
  //     cy.visit("/");
  //   });
  //   cy.wait(5000);
  //   DashboardPOM.PostLikeButton(0).children().eq(0);
  // });
  
  // it.only("Delte A Post", () => {
  //   cy.fixture("PersonalData").then((user) => {
  //     cy.authenticate(user.email, user.password);
  //     cy.visit("/");
  //   });
  //   VisitMyBlog();
  //   cy.wait(5000);
  //   ProfilePOM
  //   // DashboardPOM.PostLikeButton(0).children().eq(0);
  // });

  // context("like and dislike", () => {
  //   let anotherBlogName;
  //   beforeEach(() => {
  //     cy.fixture("PersonalData").then((user) => {
  //       cy.authenticate(user.email, user.password);
  //       cy.visit("/");
  //     });
  //     cy.fixture("ProfileData").then((data) => {
  //       anotherBlogName = data.anotherBlogName;
  //     });
  //   });
  //   it.only("Like A Post", () => {
  //     cy.wait(5000);
  //     NavbarPOM.SearchInput().type(anotherBlogName);
  //     cy.wait(4000);
  //     NavbarPOM.SearchResultsBlogsSection().contains(anotherBlogName).click();
  //   });
  // });
});
