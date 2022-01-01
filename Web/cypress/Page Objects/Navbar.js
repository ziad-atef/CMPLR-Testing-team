class Navbar {
  accountButton() {
    return cy.get("div.link-popup").children().find("i.fas.fa-user");
  }

  accountUpperList() {
    return cy.get('div[data-testid="AccountPopupActions"]');
  }

//   accountLowerList() {
//     return cy.get("ul.kbIQf").children("li");
//   }

  blogButton() {
    return cy.get('a.account-popup-blog-head-text');
  }
  LogoutButton() {
    return cy.get('div[data-testid="LogOutButton"]');
  }
}

export default Navbar;
