import { RegisterAppPage } from './app.po';

describe('register-app App', () => {
  let page: RegisterAppPage;

  beforeEach(() => {
    page = new RegisterAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
