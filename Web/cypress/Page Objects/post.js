import Dashboard from './dashboard';
const DashboardPOM = new Dashboard();
import {
    getIframeBody
} from '../Utils/utils';
class Postboard {
    postButton() {
        return getIframeBody('iframe.vP3g8').find("button.button-area").should('have.text', 'Post');
    }

    postTitleDOM() {
        return getIframeBody('iframe.vP3g8').find('div.editor.editor-plaintext[aria-label="Post title"]');
    }

    postBodyDOM() {
        return getIframeBody('iframe.vP3g8').find('div.editor-richtext[aria-label="Post body"]');
    }

    postTagsDOM() {
        return getIframeBody('iframe.vP3g8').find('div.editor-plaintext[aria-label="Post tags"]');
    }

    quoteDOM() {
        return getIframeBody('iframe.vP3g8').find('div.editor.editor-plaintext[aria-label="Quote"]');
    }

    sourceDOM() {
        return getIframeBody('iframe.vP3g8').find('div.editor.editor-richtext[aria-label="Source"]')
    }

    photoDOM() {
        return getIframeBody('iframe.vP3g8').find('input[type="file"]').first();
    }

    videoSwitchDOM() {
        return getIframeBody('iframe.vP3g8').find('input.confirm-tos--checkbox[type="checkbox"]');
    }

    PostOwnerDom(index) {
        return DashboardPOM.DashboardPosts().children().eq(index).find('a.BSUG4[role="link"]').eq(1);
    }

    PostContentDom(index) {
        return DashboardPOM.DashboardPosts().children().eq(index).find('div.GzjsW').children();
    }

    PostTagsDom(index) {
        return DashboardPOM.DashboardPosts().children().eq(index).find('div.hAFp3').find('a');
    }

    reblogButtonDom(index) {
        return DashboardPOM.DashboardPosts().children().eq(index).find('div.MCavR').find('a[aria-label="Reblog"]');
    }

    reblogReblogButtonDom() {
        return getIframeBody('iframe.vP3g8').find('button.button-area.create_post_button')
            .should('have.text', 'Reblog').and('be.visible').and('be.enabled');
    }

    reblogCloseButtonDom() {
        return getIframeBody('iframe.vP3g8').find('button.tx-button')
            .should('have.text', 'Close').and('be.visible').and('be.enabled');
    }

    reblogBodyDom() {
        return getIframeBody('iframe.vP3g8').find('div.editor[aria-label="Post body"]')
            .should('be.visible');
    }

    reblogTagsDom() {
        return getIframeBody('iframe.vP3g8').find('div.editor[aria-label="Post tags"]')
            .should('be.visible');
    }

    visitPostIframe(owner) {
        cy.get('iframe.vP3g8').within($element => {
            const src = $element.attr('src')
            const link = src.substring(src.indexOf('reblog/')).split('/')
            // cy.log(`https://www.tumblr.com/${link[0]+'/'+owner+'/'+link[1]+'/'+link[2]}`);
            cy.visit(`https://www.tumblr.com/${link[0]+'/'+owner+'/'+link[1]+'/'+link[2]}`, {
                failOnStatusCode: false
            })
        });
    }
}

export default Postboard;