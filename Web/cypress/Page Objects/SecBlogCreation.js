class BlogCreation {
    emailField() {
        return cy.get('input[name="email"]');

    }
    passwordField() {
        return cy.get('input[name="password"]');
    }
    loginButtoninside() {
        return cy.get('button[data-testid="login"]');
    }
    accountMenu() {
        return cy.get('i[class="fas fa-user"]');
    }
    newBlog() {
        return cy.get('a[href="/blog/new"]');
    }
    titleField() {
        return cy.get('input[id="url-create-blog"]');
    }
    urlField() {
        return cy.get('input[id="title-create-blog"]');
    }
    createButton() {
        return cy.get('button[id="create-blog"]');
    }
    formContainer() {
        return cy.get('div[class="subcontainer2"]');
    }
    existingUrlError() {
        return cy.get('div[class="error-msg"] p');
    }
    existingURLMessage() {
        return "error creating blog";
    }
    blogField() {
        return cy.get('div[data-testid="AccountPopupBlog"]');
    }
    passwordCheckbox() {
        return cy.get('input[id="password_protected_checkbox"]');
    }
    blogPasswordField() {
        return cy.get('input[id="privacy-create-blog"]');
    }
}
export default BlogCreation;