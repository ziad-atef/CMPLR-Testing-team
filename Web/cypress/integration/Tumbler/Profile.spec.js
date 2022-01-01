import Profile from "../../Page Objects/Profile";
import Dashboard from "../../Page Objects/dashboard";
import { VisitMyBlog } from "../../Utils/Dashboard/utils";
import {
  FollowOrUnfollowABlog,
  FollowAsserion,
  UnfollowAsserion
} from "../../Utils/Profile/utils";
const DashboardPOM = new Dashboard();

let blogName, anotherBlogName;

describe("Profile", () => {
  let ProfilePOM;

  context("UI Assertion", () => {
    let Posts_Counter, Followers_Counter;
    beforeEach(() => {
      cy.fixture("ProfileData").then((data) => {
        blogName = data.blogName;

        ProfilePOM = new Profile(blogName);
      });
      cy.fixture("PersonalData").then((user) => {
        cy.authenticate(user.email, user.password);
        cy.visit("/dashboard");
      });
      cy.url().should("not.include", "login");

      VisitMyBlog();
    });

    it("Visit Profile Page And Get Number Of Posts", () => {
      cy.wait(2000);
      ProfilePOM.profileName().should("have.text", blogName);

      ProfilePOM.PostsCounter().within(($element) => {
        expect($element.text()).include("Posts");
        Posts_Counter = $element
          .text()
          .substring($element.text().indexOf("ts") + 2);
        cy.log(Posts_Counter);
      });
      ProfilePOM.FollowersCounter().within(($element) => {
        expect($element.text()).include("Followers");
        Followers_Counter = $element
          .text()
          .substring($element.text().indexOf("s") + 1);
      });
    });

    it("Assert That Profile Posts Container Contains At Most The Number Of Posts", () => {
      ProfilePOM.PostsCounter().click({ force: true });
      ProfilePOM.ProfilePosts()
        .children()
        .should("have.length.lte", parseInt(Posts_Counter));
    });

    it("Assert That Followers Container Contains At Most The Number Of Followers", () => {
      ProfilePOM.FollowersCounter().click();
      cy.wait(10000);
      ProfilePOM.FollowersContainer()
        .children()
        .should("have.length.lte", parseInt(Followers_Counter));
    });
  });

  context("Following", () => {
    var email, password, dumpyEmail, dumpyPassword;
    beforeEach(() => {
      cy.fixture("ProfileData").then((data) => {
        blogName = data.blogName;
        anotherBlogName = data.anotherBlogName;
        ProfilePOM = new Profile(blogName);
      });
      cy.fixture("PersonalData").then((user) => {
        email = user.email;
        password = user.password;
        dumpyEmail = user.dumpyEmail;
        dumpyPassword = user.dumpyPassword;
      });
    });

    it("Another User Follow My Blog", () => {
      FollowOrUnfollowABlog(email, password, anotherBlogName, blogName);

      FollowAsserion(dumpyEmail, dumpyPassword, anotherBlogName, blogName);
    });
    it("Follow Another Blog", () => {
      FollowOrUnfollowABlog(
        dumpyEmail,
        dumpyPassword,
        blogName,
        anotherBlogName
      );

      FollowAsserion(email, password, blogName, anotherBlogName);
    });

    it("Another User UnFollow My Blog", () => {
      FollowOrUnfollowABlog(email, password, anotherBlogName, blogName, false);

      UnfollowAsserion(blogName);
    });
    it("UnFollow Another Blog", () => {
      FollowOrUnfollowABlog(
        dumpyEmail,
        dumpyPassword,
        blogName,
        anotherBlogName,
        false
      );

      UnfollowAsserion(anotherBlogName);
    });
  });
});
