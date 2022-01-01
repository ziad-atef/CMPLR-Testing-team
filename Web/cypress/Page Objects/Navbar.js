class Navbar {
  accountButton() {
    return cy.get("div.link-popup").children().find("i.fas.fa-user");
  }

  accountUpperList() {
    return cy.get('div[data-testid="AccountPopupActions"]');
  }

  SearchInput() {
    return cy.get('input[placeholder="Search Tumblr"]');
  }
  SearchResults() {
    return cy.get('div.search-result');
  }
  SearchResultsBlogsSection() {
    return this.SearchResults().children().find('div.search-result-blog-section1');
  }

  blogButton() {
    return cy.get("a.account-popup-blog-head-text");
  }
  LogoutButton() {
    return cy.get('div[data-testid="LogOutButton"]');
  }
}

export default Navbar;
