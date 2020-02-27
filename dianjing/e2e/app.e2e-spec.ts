import { MyngPage } from './app.po';

describe('myng App', function() {
  let page: MyngPage;

  beforeEach(() => {
    page = new MyngPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
