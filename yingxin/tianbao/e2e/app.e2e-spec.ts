import { YgnPage } from './app.po';

describe('ygn App', function() {
  let page: YgnPage;

  beforeEach(() => {
    page = new YgnPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
