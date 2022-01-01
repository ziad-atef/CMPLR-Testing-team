class Blog {
  ProfileIcon() {
    return cy.get(":nth-child(2) > .fas");
  }
  FollowUnfollowIcon() {
    return cy.get(".section2 > :nth-child(2) > span");
  }
  BlockIcon() {
    return cy.get(":nth-child(3) > span");
  }
}

export default Blog;
