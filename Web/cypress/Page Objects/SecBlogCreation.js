const existingURLMessage = "Blog url is not available!";
class BlogCreation {
    emailField() {
        return cy.get('input[name="email"]');

    }
    passwordField() {
        return cy.get('input[name="password"]');
    }
    loginButtoninside() {
        return cy.get('button.TRX6J.CxLjL.qjTo7.CguuB.yC5pj[type="submit"]');
    }
    accountMenu() {
        return cy.get('button[aria-label="Account"]');
    }
    newBlog() {
        return cy.get('a.Oyvhq').contains('+ New');
    }
    titleField() {
        return cy.get('input[id="new_group_title"]');
    }
    urlField() {
        return cy.get('input[id="new_group_name"]');
    }
    createButton() {
        return cy.get('button[id="submit_button"]');
    }
    existingUrlError() {
        return cy.get('ul[id="errors"] li').contains(existingURLMessage);
    }
    blogField() {
        return cy.get('div.Ut4iZ.veU9u');
    }
    passwordCheckbox() {
        return cy.get('input[id="password_protected_checkbox"]');
    }
    blogPasswordField() {
        return cy.get('input[id="new_group_password_protected"]');
    }
}
export default BlogCreation;