import { SIGWEBPage } from './app.po';

describe('sig-web App', () => {
  let page: SIGWEBPage;

  beforeEach(() => {
    page = new SIGWEBPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
