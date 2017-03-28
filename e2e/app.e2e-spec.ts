import { AngularCliNewPage } from './app.po';

describe('angular-cli-new App', () => {
  let page: AngularCliNewPage;

  beforeEach(() => {
    page = new AngularCliNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
