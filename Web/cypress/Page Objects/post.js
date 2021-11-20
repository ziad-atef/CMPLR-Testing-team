const getIframeDocument = () => {
    // return cy.get('iframe.RXu2m').its('0.contentDocument').should('exist')
    return cy.get('iframe.vP3g8').its('0.contentDocument').should('exist')
}

const getIframeBody = () => {
    return getIframeDocument().its('body').should('not.be.undefined').then(cy.wrap)
}
class Postboard {

    postButton(classname) {
        return getIframeBody().find(classname);
    }

    postTitleDOM() {
        getIframeBody().contains('Title');
        return getIframeBody().find('div.editor.editor-plaintext[aria-label="Post title"]');
    }

    postBodyDOM() {
        getIframeBody().contains('Your text here');
        return getIframeBody().find('div.editor-richtext[aria-label="Post body"]');
    }

    postTagsDOM() {
        return getIframeBody().find('div.editor-plaintext[aria-label="Post tags"]');
    }

    quoteDOM() {
        getIframeBody().contains('“Quote”');
        return getIframeBody().find('div.editor.editor-plaintext[aria-label="Quote"]');
    }

    sourceDOM() {
        getIframeBody().contains('Source');
        return getIframeBody().find('div.editor.editor-richtext[aria-label="Source"]')
    }

    photoDOM() {
        // return getIframeBody().find('div.split-cell-inner');
        return getIframeBody().find('input[type="file"]').first();
    }

    videoSwitchDOM() {
        // return getIframeBody().find('div.split-cell-inner');
        return getIframeBody().find('input.confirm-tos--checkbox[type="checkbox"]');
    }
}

export default Postboard;