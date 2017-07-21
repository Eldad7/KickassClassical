import { FinalAppPage } from './app.po';

describe('final-app App', () => {
  let page: FinalAppPage;

  beforeEach(() => {
    page = new FinalAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
