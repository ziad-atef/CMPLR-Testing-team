class Dashboard {
    textPostButton() {
        // return cy.get('button.re0m1[aria-label="Text"]');
        return cy.get('button.FOqaP[aria-label="Text"]');
    }
    quotePostButton() {
        // return cy.get('button.re0m1[aria-label="Quote"]');
        return cy.get('button.FOqaP[aria-label="Quote"]');
    }
    photoPostButton() {
        // return cy.get('button.re0m1[aria-label="Photo"]');
        return cy.get('button.FOqaP[aria-label="Photo"]');
    }

    accountButton() {
        // return cy.get('button.xBRdB.Ao99k[aria-label="Account"]');
        return cy.get('button.TRX6J.B1L2M[aria-label="Account"]');
    }

    accountUpperList() {
        // return cy.get('ul._3D_h.MbZNI').children('li');
        return cy.get('ul.noQqZ.rCo6i').children('li');
    }

    accountLowerList() {
        // return cy.get('ul.VsedS').children('li');
        return cy.get('ul.kbIQf').children('li');
    }

    DashboardPosts() {
        return cy.get('div.j8ha0').children().eq(1)
        .should('be.visible');
    }
}

export default Dashboard;