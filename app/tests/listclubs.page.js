import { Selector } from 'testcafe';

class ListClubsPage {
  constructor() {
    this.pageId = '#list-clubs-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page has table that is at least length 3 */
  async hasCards(testController) {
    const cardCount = Selector('#club-card').count;
    await testController.expect(cardCount).gte(3);
  }
}

export const listClubsPage = new ListClubsPage();
