import Login from "../../Page Objects/login";
import Navbar from "../../Page Objects/Navbar";
import Blog from "../../Page Objects/blog";
import Profile from "../../Page Objects/Profile";
import { VisitMyBlog } from "../../Utils/Dashboard/utils";
const LoginPOM = new Login();
const NavbarPOM = new Navbar();
const BlogPOM = new Blog();
const ProfilePOM = new Profile();

module.exports.FollowOrUnfollowABlog = (
  email,
  password,
  anotherBlogName,
  blogName,
  makeFollow = true
) => {
  cy.authenticate(email, password, blogName);
  cy.visit("/dashboard");
  NavbarPOM.SearchInput().type(anotherBlogName);
  cy.wait(4000);
  NavbarPOM.SearchResultsBlogsSection().contains(anotherBlogName).click();
  BlogPOM.ProfileIcon().click();
  if (makeFollow) BlogPOM.FollowUnfollowIcon().contains("Follow");
  else BlogPOM.FollowUnfollowIcon().contains("Unfollow");
  BlogPOM.FollowUnfollowIcon().click();
};

module.exports.FollowAsserion = (
  email,
  password,
  anotherBlogName,
  blogName
) => {
  cy.visit("/");
  NavbarPOM.accountButton().click();
  NavbarPOM.accountUpperList().children().eq(1).click();

  cy.wait(3000);
  ProfilePOM.FollowingList().contains(anotherBlogName);
  ProfilePOM.FollowingList().contains(anotherBlogName).parent();

  cy.authenticate(email, password);
  VisitMyBlog(anotherBlogName);
  ProfilePOM.FollowersCounter().click();
  cy.wait(10000);
  ProfilePOM.FollowersContainer().contains(blogName);
};

module.exports.UnfollowAsserion = (
  email,
  password,
  anotherBlogName,
  blogName
) => {
  cy.visit("/");
  NavbarPOM.accountButton().click();
  NavbarPOM.accountUpperList().children().eq(1).click();

  cy.wait(3000);
  ProfilePOM.FollowingList().contains(`${anotherBlogName}`).should("not.exist");
};
