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
}

export default Dashboard;
