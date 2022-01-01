class BlogBlocking {
    emailField() {
        // return cy.get('input.o4KIk[name="email"]');
        return cy.get('input[name="email"]');

    }
    passwordField() {
        // return cy.get('input.o4KIk[name="password"]');
        return cy.get('input[name="password"]');
    }
    loginButtoninside() {
        return cy.get('button[data-testid="login"]');
        //return cy.get('a[data-testid="login"]');
    }
    //searching for blogs
    searchField() {
        return cy.get('input[class="search-input"]');
    }
    searchResult() {
        return cy.get('li[class="search-result-blog"]');
    }
    //open blogs
    moreOptions() {
        return cy.get('header button.TRX6J[aria-label="More options"]').first();
    }
    checkOutBlog() {
        return cy.get('div[class="dashboard-recommend-blogs undefined"]');
    }
    newReciversButton() {
        cy.get('button.TRX6J[aria-label="New Message"]').then(($cov) => {
            const items = $cov.toArray(); 
            return Cypress._.sample(items);
        }).click();
    }
    avatar() {
        return cy.get('i[class="fas fa-user"]').last();
    }
    block() {
        return cy.get('span').contains('Block');
    }
    settings() {
        return cy.get('div[class="action-title"]').contains('Settings');
    }
    blog() {
        return cy.get('li[class="list-item blog-item"]').first();
    }
}
export default BlogBlocking;