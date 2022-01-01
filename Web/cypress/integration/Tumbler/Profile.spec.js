import Profile from "../../Page Objects/Profile";
import BlogSideSlider from "../../Page Objects/BlogSideSlider";
import Dashboard from "../../Page Objects/dashboard";
import Navbar from "../../Page Objects/Navbar";
import { VisitMyBlog } from "../../Utils/Dashboard/utils";
import {
  FollowOrUnfollowABlog,
  FollowAsserion,
} from "../../Utils/Profile/utils";
const DashboardPOM = new Dashboard();
const BlogSideSliderPOM = new BlogSideSlider();
const NavbarPOM = new Navbar();

let blogName, anotherBlogName;

describe.skip("Profile", () => {
  let ProfilePOM;

  context.skip("UI Assertion", () => {
    let Posts_Counter, Followers_Counter;
    before(() => {
      cy.fixture("ProfileData").then((data) => {
        blogName = data.blogName;

        ProfilePOM = new Profile(blogName);
      });
      cy.authenticate();
      cy.visit(`/`);

      VisitMyBlog();
    });

    it("Visit Profile Page And Get Number Of Posts", () => {
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
        cy.log(Followers_Counter);
      });
    });

    it("Assert That Profile Posts Container Contains At Most The Number Of Posts", () => {
      ProfilePOM.PostsCounter().click();
      DashboardPOM.DashboardPosts()
        .children()
        .should("have.length.lte", parseInt(Posts_Counter));
    });

    it("Assert That Followers Container Contains At Most The Number Of Followers", () => {
      ProfilePOM.FollowersCounter().click();
      cy.wait(3000);
      ProfilePOM.FollowersContainer()
        .children()
        .should("have.length.lte", parseInt(Followers_Counter));
    });
  });

  context("Following", () => {
    before(() => {
      cy.fixture("ProfileData").then((data) => {
        blogName = data.blogName;
        anotherBlogName = data.anotherBlogName;
        ProfilePOM = new Profile(blogName);
      });
    });

    it("Another User Follow My Blog", () => {
      FollowOrUnfollowABlog("", "", blogName, true, true);

      FollowAsserion(blogName);
    });
    it("Follow Another Blog", () => {
      FollowOrUnfollowABlog("", "", anotherBlogName);

      FollowAsserion(anotherBlogName);
    });

    it("Another User UnFollow My Blog", () => {
      FollowOrUnfollowABlog("", "", blogName, false, true);

      UnfollowAsserion(blogName);
    });
    it("UnFollow Another Blog", () => {
      FollowOrUnfollowABlog("", "", anotherBlogName, false);

      UnfollowAsserion(anotherBlogName);
    });
  });
});
