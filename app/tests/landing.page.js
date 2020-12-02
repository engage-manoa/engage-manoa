import { Selector } from 'testcafe';

class LandingPage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    testController.wait(5000);
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const landingPage = new LandingPage();
