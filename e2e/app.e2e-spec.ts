import { TurntupPage } from './app.po';

describe('turntup App', () => {
  let page: TurntupPage;

  beforeEach(() => {
    page = new TurntupPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
