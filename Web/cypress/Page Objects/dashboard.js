class Dashboard {
  textPostButton() {
    return cy.get('button[aria-label="Text"]').eq(0);
  }
  quotePostButton() {
    return cy.get('button[aria-label="Text"]').eq(2);
  }
  photoPostButton() {
    return cy.get('button[aria-label="Text"]').eq(1);
  }
  DashboardPosts() {
    return cy.get("section.normal-layout").children().eq(1);
  }

  PostLikeButton(index = 0) {
    return this.DashboardPosts()
      .children('div[data-testid="post-footer-cont-ts"]')
      .find('button[data-testid="love-icon-footer488"]');
  }
}

export default Dashboard;
