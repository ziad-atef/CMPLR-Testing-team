class Profile {
  Profile(_blogName) {
    this.blogName = _blogName;
  }

  profileName() {
    return cy.get('span[data-testid="list-item-span"]').eq(0);
  }
  PostsCounter() {
    return cy.get('a[data-testid="list-item-anchor"]').eq(1);
  }
  FollowersCounter() {
    return cy.get('a[data-testid="list-item-anchor"]').eq(3);
  }
  ProfilePosts() {
    return cy.get('div[data-testid="posts-region-myprofile"]');
  }
  FollowersContainer() {
    return cy.get('div[data-testid="followers-list-ts"]');
  }

  FollowingList() {
    return cy.get("section.NedHV");
  }
}

export default Profile;
