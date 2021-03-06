import { Selector } from 'testcafe';

class LandingPage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(60000); // wait 1 min before seeing if page exists
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const landingPage = new LandingPage();
