import Dashboard from "./dashboard";
const DashboardPOM = new Dashboard();
import { getIframeBody } from "../Utils/utils";
class Postboard {
  postButton() {
    return cy.get('button[data-testid="post-postBtn"]');
  }

  postTitleDOM() {
    return cy.get('div[data-testid="title-postInput"]');
  }

  postBodyDOM() {
    return cy.get('div[data-testid="content-postInput"]');
  }

  postTagsDOM() {
    return cy.get('input.editorDiv#tagsEditor[placeholder="#tags"]');
  }

  quoteDOM() {
    return cy.get('div[data-testid="title-postInput"]');
  }

  sourceDOM() {
    return cy.get('div[data-testid="content-postInput"]');
  }

  photoDOM() {
    return cy.get('div[data-testid="content-postInput"]');
  }
  photoIconDOM() {
    return cy.get('label[for="to-image-words"]');
  }

  videoSwitchDOM() {
    return cy.get('label[for="to-video-words"]');
  }

  PostOwnerDom(index) {
    return DashboardPOM.DashboardPosts()
      .children()
      .eq(index)
      .find('span[data-testid="post-heading-ts"]');
  }

  PostContentDom(index) {
    return DashboardPOM.DashboardPosts()
      .children()
      .eq(index)
      .find('div[data-testid="post-body-ts"]')
      .children();
  }

  PostTagsDom(index) {
    return DashboardPOM.DashboardPosts()
      .children()
      .eq(index)
      .find('div[data-testid="tags-cont-ts"]')
      .find("a");
  }

  reblogButtonDom(index) {
    return DashboardPOM.DashboardPosts()
      .children()
      .eq(index)
      .find('button[data-testid="reblog-icon-footer148"]');
    //   .find('a[aria-label="Reblog"]');
  }

  reblogReblogButtonDom() {
    return cy.get('button[data-testid="post-postBtn"]');
  }

  reblogCloseButtonDom() {
    return cy.get('button[data-testid="cancel-postBtn"]');
  }

  reblogBodyDom() {
    return cy.$$('div[data-testid="content-postInput"]');
  }

  reblogTagsDom() {
    return cy.get('input.editorDiv#tagsEditor[placeholder="#tags"]');
  }

  visitPostIframe(owner) {
    cy.get("iframe.vP3g8").within(($element) => {
      const src = $element.attr("src");
      const link = src.substring(src.indexOf("reblog/")).split("/");
      // cy.log(`https://www.tumblr.com/${link[0]+'/'+owner+'/'+link[1]+'/'+link[2]}`);
      cy.visit(
        `https://www.tumblr.com/${
          link[0] + "/" + owner + "/" + link[1] + "/" + link[2]
        }`,
        {
          failOnStatusCode: false,
        }
      );
    });
  }
}

export default Postboard;
