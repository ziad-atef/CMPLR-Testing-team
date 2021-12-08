const getIframeDocument = () => {
    return cy.get('iframe.vP3g8').its('0.contentDocument').should('exist')
}

const getIframeBody = () => {
    return getIframeDocument().its('body').should('not.be.undefined').then(cy.wrap)
}
class Postboard {
    postButton() {
        return getIframeBody().find("button.button-area").should('have.text', 'Post');
    }

    postTitleDOM() {
        return getIframeBody().find('div.editor.editor-plaintext[aria-label="Post title"]');
    }

    postBodyDOM() {
        return getIframeBody().find('div.editor-richtext[aria-label="Post body"]');
    }

    postTagsDOM() {
        return getIframeBody().find('div.editor-plaintext[aria-label="Post tags"]');
    }

    quoteDOM() {
        return getIframeBody().find('div.editor.editor-plaintext[aria-label="Quote"]');
    }

    sourceDOM() {
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