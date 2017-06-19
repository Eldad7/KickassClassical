import { KickassClassicalPage } from './app.po';

describe('kickass-classical App', () => {
  let page: KickassClassicalPage;

  beforeEach(() => {
    page = new KickassClassicalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
