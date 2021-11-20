describe('Basic', () => {
    beforeEach(() => {
        /*
            first you have to pass the url of the website, or the page you want
            to start your test with, you want to test
        */
        cy.visit('https://www.tumblr.com/');
    });
    it('when reload the page the background changes', () => {
        cy.get('img[loading="lazy"]').invoke('attr', 'srcset').then((prevBackground) => {
            cy.reload();
            cy.get('img[loading="lazy"]').invoke('attr', 'srcset').then(currBackground => {
                expect(currBackground).to.not.eq(prevBackground);
            });
        });

    })
});