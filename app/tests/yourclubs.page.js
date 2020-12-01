import { Selector } from 'testcafe';

class YourClubsPage {
  constructor() {
    this.pageId = '#list-my-clubs-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const yourClubsPage = new YourClubsPage();
